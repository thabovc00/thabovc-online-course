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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      // ❌ อะเลิทแจ้งเตือนรหัสผ่านไม่ตรงกัน (สวยและชัดเจน)
      Swal.fire({
        icon: 'warning',
        title: 'ข้อมูลไม่ถูกต้อง',
        text: 'รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน',
        confirmButtonColor: '#1a73e8',
        confirmButtonText: 'ตกลง',
        width: '350px',
        padding: '1.5em',
        background: '#fff',
        backdrop: 'rgba(0,0,0,0.4)'
      });
      return;
    }

    // ⏳ อะเลิท Loading Screen (มินิมอล กลางจอ)
    Swal.fire({
      title: 'กำลังบันทึกข้อมูล',
      html: '<span style="font-size: 14px; color: #666;">กรุณารอสักครู่...</span>',
      allowOutsideClick: false,
      showConfirmButton: false,
      width: '300px',
      padding: '2em',
      background: '#fff',
      backdrop: 'rgba(255,255,255,0.8)', // แบล็คดรอปสีขาวโปร่งแสงดูละมุนตา
      didOpen: () => {
        Swal.showLoading();
      }
    });

    setIsLoading(true);
    const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwAq86PGKnwuXt3JwqSZ8Vz4VIDs8fq5Ean5TiZfnHg0FaYn0QHVQnv_7Yd1I1ZZsVRoQ/exec";

    try {
      await fetch(WEB_APP_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: "register",
          username: formData.username,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          password: formData.password,
          category: formData.category,
          level: formData.level
        }),
      });

      // ✅ อะเลิท สำเร็จ! (มีหลอดเวลาวิ่ง เร็วและสมูท)
      Swal.fire({
        icon: 'success',
        title: 'สมัครสมาชิกสำเร็จ!',
        text: 'ระบบกำลังพากลับไปหน้าเข้าสู่ระบบ',
        timer: 1500, // ลดเวลาลงให้เร็วขึ้น
        timerProgressBar: true,
        showConfirmButton: false,
        width: '350px',
        padding: '1.5em',
        background: '#fff',
        backdrop: 'rgba(0,0,0,0.4)'
      }).then(() => {
        // ใช้ .then() ของ Swal เพื่อให้ชัวร์ว่าแอนิเมชันจบแล้วค่อยเปลี่ยนหน้า
        navigate('/');
      });

    } catch (error) {
      // ❌ อะเลิท Error กรณีเชื่อมต่อเซิร์ฟเวอร์ไม่ได้
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: 'ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้ กรุณาลองใหม่',
        confirmButtonColor: '#d33',
        confirmButtonText: 'ปิดหน้าต่าง',
        width: '350px',
        padding: '1.5em'
      });
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
              <label style={styles.label}>ชื่อจริง (ภาษาไทย)</label>
              <input name="firstName" type="text" placeholder="ชื่อ" style={styles.input} onChange={handleChange} required />
            </div>
            <div style={{ flex: 1 }}>
              <label style={styles.label}>นามสกุล (ภาษาไทย)</label>
              <input name="lastName" type="text" placeholder="นามสกุล" style={styles.input} onChange={handleChange} required />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>ชื่อล็อกอิน (ภาษาอังกฤษเท่านั้น)</label>
            <input name="username" type="text" placeholder="Firstname (English)" style={styles.input} onChange={handleChange} required />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>เบอร์โทรศัพท์</label>
            <input name="phone" type="text" placeholder="08x-xxxxxxx" style={styles.input} onChange={handleChange} required />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>รหัสผ่าน (เลขบัตรประชาชน)</label>
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
            style={{
              ...styles.regBtn, 
              background: isLoading ? '#9ca3af' : '#1a73e8',
              cursor: isLoading ? 'not-allowed' : 'pointer'
            }} 
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
  input: { width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box', outline: 'none' },
  select: { width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', background: '#fff', outline: 'none' },
  regBtn: { color: '#fff', padding: '12px', border: 'none', borderRadius: '6px', fontWeight: 'bold', marginTop: '10px', transition: '0.3s' },
  backBtn: { background: 'none', color: '#666', padding: '10px', border: 'none', cursor: 'pointer', fontSize: '14px', marginTop: '5px' }
};

export default Register;