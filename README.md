# ผจญภัยในป่าเวทมนตร์ — Playable MVP

[![Deploy Magic Forest to GitHub Pages](https://github.com/ppeeradet/magic-forest-math-adventure/actions/workflows/pages.yml/badge.svg)](https://github.com/ppeeradet/magic-forest-math-adventure/actions/workflows/pages.yml)

เกมเว็บภาษาไทยสำหรับเด็ก สร้างจากโครงเรื่องและคลังโจทย์ใน “ผจญภัยในป่าเวทมนตร์ edit.docx” โดยเปลี่ยนโจทย์แบบเลือกตอบให้เป็น game layer แบบสำรวจ ลากวาง เรียงตัวเลข หมุนวงล้อ และสะสมไอเท็ม

## สิ่งที่มีใน MVP

- World 1 จำนวน 5 ด่าน: ดอกไม้ 345+218, หิน 876−324, เห็ด 457+186, น้ำค้าง 732−289 และปีกผีเสื้อ 9×2
- ตัวละคร แบมแบม (BamBam), ชิป และฟลัฟฟี่
- คะแนนดาว รางวัล ไอเท็ม ผลึก และปลดล็อกด่าน
- เซฟอัตโนมัติด้วย localStorage
- รองรับเมาส์ สัมผัส คีย์บอร์ด เดสก์ท็อป มือถือ และ iPad
- เสียงตอบสนองเปิด/ปิดได้ และรองรับ prefers-reduced-motion
- ปุ่ม AR เป็น interface สำหรับเฟสถัดไป

## วิธีเปิดเล่นในเครื่อง

เปิด `dist/index.html` ด้วยเบราว์เซอร์ได้ทันที หรือรัน `node tools/preview-server.mjs` แล้วเปิด `http://127.0.0.1:4318`

## การเผยแพร่

GitHub Actions จะนำโฟลเดอร์ `dist` ขึ้น GitHub Pages อัตโนมัติเมื่อมีการ push ไปที่ branch `main`

## การขยายไป 100 ด่าน

ข้อมูลแต่ละด่านอยู่ในอาร์เรย์ `LEVELS` ภายใน `dist/app.js` แยก `story`, `prompt`, `type`, `answer`, `reward` และ `item` ไว้ชัดเจน จึงย้ายเป็น JSON/ฐานข้อมูลภายหลังได้โดยไม่เปลี่ยนระบบแผนที่ เซฟ รางวัล และการปลดล็อก

เฟสถัดไปควรแยก renderer ของ puzzle ตาม `type`, เพิ่ม question-bank JSON ครบ 100 ด่าน, บัญชีผู้ปกครอง/คลาวด์เซฟ และ WebXR/Quick Look สำหรับไอเท็ม AR
