/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    level: 'ปวช.1',
    category: 'ช่างยนต์' // หรือถ้าต้องการให้เป็น default ตาม option ที่มี
  });
  
  // ✅ เพิ่ม Loading State
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("รหัสผ่านไม่ตรงกัน");
      return;
    }

    // ✅ เริ่มโหลดเมื่อกดสมัคร
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
          password: formData.password,
          category: formData.category,
          level: formData.level
        }),
      });

      // เนื่องจากใช้ no-cors เราจะอ่านผลลัพธ์ไม่ได้ แต่ถ้าไม่มี error แปลว่าส่งออกไปแล้ว
      alert("สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ");
      navigate('/'); // กลับหน้า Login

    } catch (error) {
      alert("เกิดข้อผิดพลาดในการเชื่อมต่อ");
    } finally {
      // ✅ ยกเลิก Loading ไม่ว่าจะสำเร็จหรือพัง
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>สมัครสมาชิกใหม่</h2>
        <form onSubmit={handleRegister} style={styles.form}>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>ชื่อจริง (ภาษาอังกฤษเท่านั้น) <span style={styles.note}>*ใช้ล็อกอิน</span></label>
            <input 
              name="username"
              type="text" 
              placeholder="เช่น Somchai" 
              style={styles.input}
              onChange={handleChange}
              required 
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>เลขบัตรประชาชน (รหัสผ่าน)</label>
            <input 
              name="password"
              type="password" 
              placeholder="ตัวเลข 13 หลัก" 
              style={styles.input}
              onChange={handleChange}
              required 
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>ยืนยันเลขบัตรประชาชนอีกครั้ง</label>
            <input 
              name="confirmPassword"
              type="password" 
              placeholder="กรอกรหัสผ่านซ้ำอีกครั้ง" 
              style={styles.input}
              onChange={handleChange}
              required 
            />
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ ...styles.inputGroup, flex: 1 }}>
              <label style={styles.label}>ชั้นปี</label>
              <select name="level" style={styles.select} onChange={handleChange}>
                <option>ปวช.1</option>
                <option>ปวช.2</option>
                <option>ปวช.3</option>
                <option>ปวส.1</option>
                <option>ปวส.2</option>
              </select>
            </div>

            <div style={{ ...styles.inputGroup, flex: 2 }}>
              <label style={styles.label}>สาขาวิชา</label>
              <select name="category" style={styles.select} onChange={handleChange}>
                <option value="automotive">สาขาช่างยนต์</option>
                <option value="electrical">สาขาช่างไฟฟ้า</option>
                <option value="electronics">สาขาช่างอิเล็กทรอนิกส์</option>
                <option value="digital-business">สาขาเทคโนโลยีธุรกิจดิจิทัล</option>
                <option value="hospital-business">สาขาธุรกิจสถานพยาบาล</option>
                <option value="tourism">สาขาการท่องเที่ยว</option>
                <option value="hotel">สาขาการโรงแรม</option>
                <option value="marketing">สาขาการตลาด</option>
                <option value="accounting">สาขาการบัญชี</option>
                <option value="food-nutrition">สาขาอาหารและโภชนาการ</option>
                <option value="architecture">สาขาสถาปัตยกรรม</option>
              </select>
            </div>
          </div>

          {/* ✅ ปรับปุ่มสมัครสมาชิกให้แสดงสถานะ Loading */}
          <button 
            type="submit" 
            style={{
              ...styles.regBtn,
              background: isLoading ? '#9ca3af' : '#1a73e8', // สีเทาเมื่อโหลด
              cursor: isLoading ? 'wait' : 'pointer',
            }}
            disabled={isLoading} // ปิดปุ่มระหว่างรอ
          >
            {isLoading ? 'กำลังส่งข้อมูล...' : 'ยืนยันการสมัคร'}
          </button>
          
          <button 
            type="button" 
            onClick={() => navigate('/')} 
            style={styles.backBtn}
            disabled={isLoading} // ปิดปุ่มยกเลิกระหว่างรอเช่นกัน
          >
            ยกเลิก
          </button>
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
  note: { color: '#666', fontSize: '11px' },
  input: { width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' },
  select: { width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', background: '#fff' },
  regBtn: { color: '#fff', padding: '12px', border: 'none', borderRadius: '6px', fontWeight: 'bold', marginTop: '10px', transition: '0.3s' },
  backBtn: { background: 'none', color: '#666', padding: '10px', border: 'none', cursor: 'pointer', fontSize: '14px', marginTop: '5px' }
};

export default Register;