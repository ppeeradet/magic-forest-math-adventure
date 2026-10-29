# แผนพัฒนาแบบ Sprint

- Sprint 1–3 (2–3 วัน): ทำ World 1 ให้สมบูรณ์ทั้ง UX, บทสนทนา, animation, audio และ playtest
- Sprint 4–7 (2–3 สัปดาห์): ✅ Core game ขยายเป็น World 1–3 รวม 15 ด่านและฉากจบ โดยใช้คลังโจทย์ 100 ด่านเป็นต้นฉบับ · โปรไฟล์ชาย/หญิงและชื่อกำหนดเอง, save/progress, รางวัล, accessibility, touch target ≥44px และ responsive desktop/mobile/iPad ผ่านการทดสอบ · World 3 เชื่อมจากประตูเห็ดยักษ์ไปสู่นครเห็ด ป่าหมอก หุบเขาดอกไม้ ทะเลสาบเอลฟ์ และป่าต้นไม้นับพัน พร้อมปลายทางสู่นครลอยฟ้า
- Sprint 8–10 (2–4 วัน): 🔄 ฐานระบบบันทึกพร้อมแล้วด้วย save schema v3, migration/repair, timestamp, deterministic conflict merge และ cloud-save adapter ที่ปิดใช้งานโดยค่าเริ่มต้นพร้อม mock online/offline · เพิ่มมุมผู้ปกครองสำหรับสรุปการเรียนรู้และส่งออก/นำเข้าไฟล์สำรองแล้ว · ขั้นถัดไปกำหนด Firebase project/config และ consent flow แล้วจึงเชื่อม cloud save จริง
- Platform readiness: ✅ เพิ่ม PWA manifest, install metadata, ปุ่มติดตั้ง, คู่มือ Add to Home Screen สำหรับ iPhone/iPad, offline asset cache, สถานะออนไลน์/ออฟไลน์ และข้อความแจ้งอัปเดตเวอร์ชันใหม่แล้ว
- World 3 polish: ✅ ด่าน 11–15 ผ่าน full interaction playtest ครบเส้นทาง แก้ปุ่ม “ข้ามเรื่องราว” แล้ว และยืนยันรางวัล ฉากจบ responsive 390×844 / 820×1180 และ console error = 0; ผลทดสอบอยู่ใน `planning/PLAYTEST-WORLD3.md` · เป้าหมายถัดไปทดสอบ reset, keyboard และ reduced motion
- World 4: 🔄 ตรวจต้นฉบับ Word และ Question Bank ด่าน 16–20 แล้ว; ด่าน 16–17 เล่นได้จริง โดยด่าน 17 ใช้โล่รับคาถา 5 ระลอก × 9 = 45 พร้อม reset, keyboard, reward และ responsive ผ่าน · รายละเอียดอยู่ใน `planning/WORLD4.md` · เป้าหมายถัดไปสร้างด่าน 18 แม่น้ำแห่งเสียงเพลง
- Sprint 11–14 (3–5 วัน): AR prototype และคอลเลกชันสัตว์สามมิติ

แต่ละ Sprint ต้องจบด้วยเกมที่เปิดได้ ไม่มี JavaScript error รองรับ 390×844 และ desktop และมี commit แยกชัดเจน
