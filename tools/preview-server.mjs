import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve('dist');
const port=Number(process.env.PORT||4318);
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.png':'image/png'};
http.createServer((req,res)=>{const pathname=new URL(req.url,'http://127.0.0.1').pathname,rel=pathname==='/'?'index.html':decodeURIComponent(pathname.slice(1));const file=path.resolve(root,rel);if(!file.startsWith(root)){res.writeHead(403).end();return}fs.readFile(file,(error,data)=>{if(error){res.writeHead(404).end('Not found');return}res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});res.end(data)})}).listen(port,'127.0.0.1',()=>console.log(`Magic Forest ready at http://127.0.0.1:${port}`));
