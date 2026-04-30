/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    phone: '',
    password: '',
    confirmPassword: '',
    level: 'ปวช.1',
    category: 'ช่างยนต์'
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // username: ตัวเลขเท่านั้น ไม่เกิน 13 หลัก
    if (name === 'username') {
      if (!/^\d*$/.test(value) || value.length > 13) return;
    }

    // phone: ตัวเลขเท่านั้น ไม่เกิน 10 หลัก
    if (name === 'phone') {
      if (!/^\d*$/.test(value) || value.length > 10) return;
    }

    // ชื่อ/นามสกุล: ภาษาไทยเท่านั้น
    if (name === 'firstName' || name === 'lastName') {
      if (value !== '' && !/^[ก-๙\s]+$/.test(value)) return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // ตรวจสอบ username ครบ 13 หลัก
    if (formData.username.length !== 13) {
      Swal.fire({ icon: 'warning', title: 'เลขบัตรประชาชนไม่ถูกต้อง', text: 'กรุณากรอกเลขบัตรประชาชนให้ครบ 13 หลัก', confirmButtonColor: '#1a73e8', width: '350px' });
      return;
    }

    // ตรวจสอบเบอร์โทร 10 หลัก
    if (formData.phone.length !== 10) {
      Swal.fire({ icon: 'warning', title: 'เบอร์โทรศัพท์ไม่ถูกต้อง', text: 'กรุณากรอกเบอร์โทรศัพท์ให้ครบ 10 หลัก', confirmButtonColor: '#1a73e8', width: '350px' });
      return;
    }

    // ตรวจสอบรหัสผ่าน: ขั้นต่ำ 8 ตัว มีตัวอังกฤษและตัวเลขอย่างน้อย 1 ตัว
    const passwordValid = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/.test(formData.password);
    if (!passwordValid) {
      Swal.fire({ icon: 'warning', title: 'รหัสผ่านไม่ถูกต้อง', html: 'รหัสผ่านต้องมี<b>อย่างน้อย 8 ตัวอักษร</b><br>และต้องมี<b>ตัวอังกฤษ</b>และ<b>ตัวเลข</b>ผสมกัน', confirmButtonColor: '#1a73e8', width: '350px' });
      return;
    }

    // ตรวจสอบรหัสผ่านตรงกัน
    if (formData.password !== formData.confirmPassword) {
      Swal.fire({ icon: 'warning', title: 'รหัสผ่านไม่ตรงกัน', text: 'รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน', confirmButtonColor: '#1a73e8', width: '350px' });
      return;
    }

    setIsLoading(true);

    // 👈 1. เพิ่มป๊อปอัพโหลดตรงนี้
    Swal.fire({ 
      title: 'กำลังบันทึกข้อมูล...', 
      allowOutsideClick: false, 
      showConfirmButton: false, 
      padding: '2em', 
      width: 'auto', 
      backdrop: 'rgba(0,0,0,0.4)', 
      didOpen: () => { Swal.showLoading(); } 
    });

    const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwAq86PGKnwuXt3JwqSZ8Vz4VIDs8fq5Ean5TiZfnHg0FaYn0QHVQnv_7Yd1I1ZZsVRoQ/exec";

    try {
      const response = await fetch(WEB_APP_URL, {
        method: 'POST',
        // ลบ mode: 'no-cors' ออก
        headers: { 'Content-Type': 'text/plain;charset=utf-8' }, // ใช้ text/plain แบบเดียวกับหน้า Login เพื่อเลี่ยงปัญหา CORS
        body: JSON.stringify({
          action: "register",
          username: "'" + formData.username,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: "'" + formData.phone,
          password: formData.password,
          category: formData.category,
          level: formData.level
        }),
      });

      // อ่านค่าตอบกลับจาก Google Apps Script
      const dataText = await response.text();
      let result = JSON.parse(dataText);

      if (result.status === "success") {
        Swal.fire({
          icon: 'success',
          title: 'สมัครสมาชิกสำเร็จ!',
          text: 'ระบบกำลังพากลับไปหน้าเข้าสู่ระบบ',
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
          width: '350px',
          padding: '1.5em',
          backdrop: 'rgba(0,0,0,0.4)'
        }).then(() => navigate('/'));
      } else {
        // กรณีเซิร์ฟเวอร์ตอบกลับมาว่าซ้ำ หรือมี error อื่นๆ
        Swal.fire({ 
          icon: 'error', 
          title: 'สมัครไม่สำเร็จ', 
          text: result.message || 'เกิดข้อผิดพลาดบางอย่าง', 
          confirmButtonColor: '#d33', 
          width: '350px' 
        });
      }

    } catch (error) {
      Swal.fire({ icon: 'error', title: 'เกิดข้อผิดพลาด', text: 'ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้ กรุณาลองใหม่', confirmButtonColor: '#d33', width: '350px' });
    } finally {
      setIsLoading(false);
    }
};
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>สมัครสมาชิกใหม่</h2>
        <form onSubmit={handleRegister} style={styles.form}>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
            <div style={{ flex: 1 }}>
              <label style={styles.label}>ชื่อจริง <span style={styles.note}>*ภาษาไทยเท่านั้น</span></label>
              <input name="firstName" type="text" placeholder="ชื่อ" style={styles.input} value={formData.firstName} onChange={handleChange} required />
            </div>
            <div style={{ flex: 1 }}>
              <label style={styles.label}>นามสกุล <span style={styles.note}>*ภาษาไทยเท่านั้น</span></label>
              <input name="lastName" type="text" placeholder="นามสกุล" style={styles.input} value={formData.lastName} onChange={handleChange} required />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>เลขบัตรประชาชน <span style={styles.note}>*13 หลักเท่านั้น</span></label>
            <input name="username" type="text" inputMode="numeric" placeholder="x-xxxx-xxxxx-xx-x" style={{ ...styles.input, letterSpacing: '2px' }} value={formData.username} onChange={handleChange} required />
            <div style={{ fontSize: '11px', color: formData.username.length === 13 ? '#16a34a' : '#94a3b8', marginTop: '4px' }}>
              {formData.username.length}/13 หลัก {formData.username.length === 13 && '✓'}
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>เบอร์โทรศัพท์ <span style={styles.note}>*10 หลักเท่านั้น</span></label>
            <input name="phone" type="text" inputMode="numeric" placeholder="08xxxxxxxx" style={styles.input} value={formData.phone} onChange={handleChange} required />
            <div style={{ fontSize: '11px', color: formData.phone.length === 10 ? '#16a34a' : '#94a3b8', marginTop: '4px' }}>
              {formData.phone.length}/10 หลัก {formData.phone.length === 10 && '✓'}
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>รหัสผ่าน <span style={styles.note}>*ตัวอังกฤษ+ตัวเลข ขั้นต่ำ 8 ตัว</span></label>
            <input name="password" type="password" placeholder="Password" style={styles.input} onChange={handleChange} required />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>ยืนยันรหัสผ่าน</label>
            <input name="confirmPassword" type="password" placeholder="Confirm Password" style={styles.input} onChange={handleChange} required />
          </div>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
            <div style={{ flex: 1 }}>
              <label style={styles.label}>ชั้นปี</label>
              <select name="level" onChange={handleChange} value={formData.level} style={styles.select}>
                <option value="ปวช.1">ปวช.1</option>
                <option value="ปวช.2">ปวช.2</option>
                <option value="ปวช.3">ปวช.3</option>
                <option value="ปวส.1">ปวส.1</option>
                <option value="ปวส.2">ปวส.2</option>
              </select>
            </div>
            <div style={{ flex: 2 }}>
              <label style={styles.label}>สาขาวิชา</label>
              <select name="category" style={styles.select} onChange={handleChange} value={formData.category}>
                <option value="ช่างยนต์">สาขาช่างยนต์</option>
                <option value="ช่างไฟฟ้า">สาขาช่างไฟฟ้า</option>
                <option value="ช่างอิเล็กทรอนิกส์">สาขาช่างอิเล็กทรอนิกส์</option>
                <option value="เทคโนโลยีธุรกิจดิจิทัล">สาขาเทคโนโลยีธุรกิจดิจิทัล</option>
                <option value="ธุรกิจสถานพยาบาล">สาขาธุรกิจสถานพยาบาล</option>
                <option value="การท่องเที่ยว">สาขาการท่องเที่ยว</option>
                <option value="การโรงแรม">สาขาการโรงแรม</option>
                <option value="การตลาด">สาขาการตลาด</option>
                <option value="บัญชี">สาขาบัญชี</option>
                <option value="อาหารและโภชนาการ">สาขาอาหารและโภชนาการ</option>
                <option value="สถาปัตยกรรม">สาขาสถาปัตยกรรม</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            style={{ ...styles.regBtn, background: isLoading ? '#9ca3af' : '#1a73e8', cursor: isLoading ? 'not-allowed' : 'pointer' }}
            disabled={isLoading}
          >
            {isLoading ? 'กำลังประมวลผล...' : 'ยืนยันการสมัคร'}
          </button>

          <button type="button" onClick={() => navigate('/')} style={styles.backBtn} disabled={isLoading}>ยกเลิก</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f0f2f5', fontFamily: "'Kanit', sans-serif" },
  card: { background: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 8px 20px rgba(0,0,0,0.1)', width: '100%', maxWidth: '450px' },
  title: { textAlign: 'center', color: '#1a73e8', marginBottom: '20px' },
  form: { display: 'flex', flexDirection: 'column' },
  inputGroup: { marginBottom: '15px' },
  label: { display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: '500' },
  note: { color: '#ef4444', fontSize: '11px', fontWeight: 'normal' },
  input: { width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box', outline: 'none', fontFamily: "'Kanit', sans-serif" },
  select: { width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', background: '#fff', outline: 'none', fontFamily: "'Kanit', sans-serif" },
  regBtn: { color: '#fff', padding: '12px', border: 'none', borderRadius: '6px', fontWeight: 'bold', marginTop: '10px', transition: '0.3s', fontFamily: "'Kanit', sans-serif" },
  backBtn: { background: 'none', color: '#666', padding: '10px', border: 'none', cursor: 'pointer', fontSize: '14px', marginTop: '5px', fontFamily: "'Kanit', sans-serif" }
};

export default Register;