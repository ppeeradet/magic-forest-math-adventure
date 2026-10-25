# Cloud Save Contract

ฐานข้อมูลใช้ save schema v3 จาก `dist/data/save.js` เป็นสัญญากลางระหว่าง localStorage และ Cloud โดยต้องเรียก `normalize()` ก่อนอ่านหรือเขียนทุกครั้ง

## Adapter ที่เตรียมไว้

ไฟล์ `dist/data/cloud-save.js` แยกการ sync ออกจาก Firebase SDK และเปิดด้วยสถานะ `disabled` เสมอจนกว่าจะตั้งค่าโปรเจกต์จริง

- `disabled()` ไม่เรียก network และคืน local save เดิม
- `memory(seed)` เป็น mock สำหรับทดสอบ online/offline โดยไม่ส่งข้อมูลออกจากเครื่อง
- `synchronize(adapter, localSave, saveApi)` อ่าน cloud, merge ด้วย schema v3, เขียนผลลัพธ์กลับ และคืน `synced`, `disabled` หรือ `offline`
- เมื่อ provider ล้มเหลว ฟังก์ชันต้องคืน local save ที่ normalize แล้ว เพื่อให้เล่นต่อได้เสมอ

## กติกาเมื่อข้อมูลชนกัน

- `unlocked`, `crystals` และดาวรายด่านใช้ค่าสูงสุด เพื่อไม่ให้ความคืบหน้าถอยหลัง
- `items` รวมของสะสมทั้งสองฝั่ง ตัดรายการซ้ำ และจำกัด 100 ชิ้น
- `storySeen` เป็นจริงถ้าฝั่งใดฝั่งหนึ่งเคยดูเนื้อเรื่องแล้ว
- ชื่อ ตัวละคร และ sound toggle ใช้ชุดที่มี `updatedAt` ล่าสุด
- หากเวลาเท่ากันให้ local เป็นฝ่ายชนะ เพื่อให้ผลลัพธ์คาดเดาได้และเล่นออฟไลน์ต่อได้
- ข้อมูลทุกชุดผ่าน `normalize()` อีกครั้งหลัง merge ก่อนบันทึก

## ขอบเขต Firebase เฟสถัดไป

- ยังไม่ฝังคีย์หรือ config จริงใน repository จนกว่าจะกำหนด Firebase project
- ใช้ Anonymous Auth หรือบัญชีผู้ปกครอง โดยหนึ่งผู้ใช้เข้าถึงได้เฉพาะเอกสารเซฟของตนเอง
- Firestore document เก็บเฉพาะ save schema v3 และ server timestamp; ไม่เก็บข้อมูลส่วนบุคคลอื่นของเด็ก
- การเล่นต้องทำงานได้เต็มรูปแบบเมื่อออฟไลน์ และ sync แบบ background เมื่อเชื่อมต่อได้
- ต้องทดสอบ local ใหม่กว่า, cloud ใหม่กว่า, offline edit, JSON เสีย และบัญชีใหม่ ก่อนเปิดใช้จริง

## Checklist ก่อนเปิด Firebase จริง

1. ผู้ดูแลสร้าง Firebase project และ Web App แยกสำหรับเกมนี้
2. เปิด Authentication เฉพาะวิธีที่ตกลงกัน เช่น Anonymous Auth หรือบัญชีผู้ปกครอง
3. เปิด Firestore และตั้ง rules ให้ `request.auth.uid` อ่าน/เขียนได้เฉพาะ `users/{uid}/saves/main`
4. สร้าง provider ที่มีเฉพาะ `load()` และ `save(value)` แล้วส่งเข้า `synchronize()`; ห้ามแก้กติกา merge ซ้ำใน provider
5. ทดสอบใน Firebase Emulator ก่อนใช้ production: ผู้ใช้ใหม่, สองอุปกรณ์, ออฟไลน์, conflict และ logout/login
6. เพิ่มหน้าคำยินยอมผู้ปกครองและคำอธิบายข้อมูลก่อนเปิดปุ่ม cloud sync ใน UI
7. ใส่ public Firebase web config ผ่านไฟล์ config แยก; ห้าม commit service-account key หรือ admin credential
