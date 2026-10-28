# แผนพัฒนาแบบ Sprint

- Sprint 1–3 (2–3 วัน): ทำ World 1 ให้สมบูรณ์ทั้ง UX, บทสนทนา, animation, audio และ playtest
- Sprint 4–7 (2–3 สัปดาห์): ✅ Core game ขยายเป็น World 1–3 รวม 15 ด่านและฉากจบ โดยใช้คลังโจทย์ 100 ด่านเป็นต้นฉบับ · โปรไฟล์ชาย/หญิงและชื่อกำหนดเอง, save/progress, รางวัล, accessibility, touch target ≥44px และ responsive desktop/mobile/iPad ผ่านการทดสอบ · World 3 เชื่อมจากประตูเห็ดยักษ์ไปสู่นครเห็ด ป่าหมอก หุบเขาดอกไม้ ทะเลสาบเอลฟ์ และป่าต้นไม้นับพัน พร้อมปลายทางสู่นครลอยฟ้า
- Sprint 8–10 (2–4 วัน): 🔄 ฐานระบบบันทึกพร้อมแล้วด้วย save schema v3, migration/repair, timestamp, deterministic conflict merge และ cloud-save adapter ที่ปิดใช้งานโดยค่าเริ่มต้นพร้อม mock online/offline · เพิ่มมุมผู้ปกครองสำหรับสรุปการเรียนรู้และส่งออก/นำเข้าไฟล์สำรองแล้ว · ขั้นถัดไปกำหนด Firebase project/config และ consent flow แล้วจึงเชื่อม cloud save จริง
- Platform readiness: ✅ เพิ่ม PWA manifest, install metadata, ปุ่มติดตั้ง, คู่มือ Add to Home Screen สำหรับ iPhone/iPad, offline asset cache, สถานะออนไลน์/ออฟไลน์ และข้อความแจ้งอัปเดตเวอร์ชันใหม่แล้ว
- World 3 polish: 🔄 ด่าน 11–15 มีกลไกเฉพาะครบและผ่าน automated playtest ทั้งผลลัพธ์ 42, 643, 644, 24, 852; เพิ่มโหมด playtest แบบ session-only ที่ปลดล็อก World 3 โดยไม่แตะเซฟจริง เพื่อใช้ทดสอบการกดครบเส้นทางบนเบราว์เซอร์และอุปกรณ์สัมผัส · เป้าหมายถัดไปบันทึกผล full interaction playtest และแก้จุดสะดุดที่พบ
- Sprint 11–14 (3–5 วัน): AR prototype และคอลเลกชันสัตว์สามมิติ

แต่ละ Sprint ต้องจบด้วยเกมที่เปิดได้ ไม่มี JavaScript error รองรับ 390×844 และ desktop และมี commit แยกชัดเจน
