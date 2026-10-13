param(
  [string]$Source = 'source-materials\ผจญภัยในป่าเวทมนตร์ edit.docx',
  [string]$Output = 'dist\data\question-bank.json'
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.IO.Compression.FileSystem

$zip = [IO.Compression.ZipFile]::OpenRead((Resolve-Path -LiteralPath $Source))
try {
  $entry = $zip.GetEntry('word/document.xml')
  $reader = [IO.StreamReader]::new($entry.Open())
  try { [xml]$xml = $reader.ReadToEnd() } finally { $reader.Dispose() }
} finally { $zip.Dispose() }

$ns = [Xml.XmlNamespaceManager]::new($xml.NameTable)
$ns.AddNamespace('w', 'http://schemas.openxmlformats.org/wordprocessingml/2006/main')
$paragraphs = @($xml.SelectNodes('//w:p', $ns) | ForEach-Object {
  (($_.SelectNodes('.//w:t', $ns) | ForEach-Object InnerText) -join '').Trim()
} | Where-Object { $_ })

$bank = [Collections.Generic.List[object]]::new()
$chapter = ''
for ($i = 0; $i -lt $paragraphs.Count; $i++) {
  $text = $paragraphs[$i]
  if ($text -match '^บทที่\s+\d+:\s*(.+)$') { $chapter = $Matches[1] -replace '^ด่านที่\s*\d+:\s*', '' }
  if ($text -notmatch '^ด่านที่\s*(\d+):\s*(.+)$') { continue }

  $id = [int]$Matches[1]
  $question = $Matches[2].Trim()
  $choices = @()
  for ($j = $i + 1; $j -lt $paragraphs.Count -and $choices.Count -lt 4; $j++) {
    if ($paragraphs[$j] -match '^\d+$') { $choices += [int]$paragraphs[$j] }
    elseif ($paragraphs[$j] -match '^(ด่านที่|บทที่)') { break }
  }

  $numbers = @([regex]::Matches($question, '\d+') | ForEach-Object { [int]$_.Value })
  $operation = if ($question -match 'เหลือ.+หลังสร้าง' -and $numbers.Count -ge 3) { 'mixed' }
    elseif ($question -match 'แต่ละ|ต่อสัตว์|ต่อดวง|ต่อหนึ่ง|ต่อ 1') { 'multiplication' }
    elseif ($question -match 'รวมมี|ทั้งหมดกี่(?!.*เหลือ)|รวมทั้งหมด') { 'addition' }
    else { 'subtraction' }

  $answer = switch ($operation) {
    'addition' { $numbers[0] + $numbers[1] }
    'subtraction' { $numbers[0] - $numbers[1] }
    'multiplication' {
      $products = for ($a = 0; $a -lt $numbers.Count; $a++) {
        for ($b = $a + 1; $b -lt $numbers.Count; $b++) { $numbers[$a] * $numbers[$b] }
      }
      @($products | Where-Object { $_ -in $choices })[0]
    }
    'mixed' { $numbers[2] - ($numbers[0] * $numbers[1]) }
  }

  $bank.Add([ordered]@{
    id = $id
    title = $chapter
    question = $question
    choices = $choices
    answer = $answer
    operation = $operation
    source = 'ผจญภัยในป่าเวทมนตร์ edit.docx'
  })
}

if ($bank.Count -ne 100) { throw "Expected 100 questions, found $($bank.Count)" }
$invalid = @($bank | Where-Object { $_.choices.Count -ne 4 -or $_.answer -notin $_.choices })
if ($invalid.Count) {
  throw "Could not verify answers for levels: $((@($invalid.id) -join ', '))"
}

$json = $bank | ConvertTo-Json -Depth 5
[IO.File]::WriteAllText((Join-Path (Resolve-Path '.').Path $Output), $json, [Text.UTF8Encoding]::new($false))
Write-Host "Extracted and verified $($bank.Count) questions to $Output"
