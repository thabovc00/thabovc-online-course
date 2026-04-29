/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // 1. แจ้งเตือนตอนกำลังเริ่มตรวจสอบ (มินิมอล สบายตา)
    Swal.fire({
      title: 'กำลังตรวจสอบข้อมูล...',
      allowOutsideClick: false,
      showConfirmButton: false,
      padding: '2em',
      width: 'auto',
      backdrop: 'rgba(0,0,0,0.4)', // ให้ฉากหลังโปร่งแสงนิดๆ กำลังสวย
      didOpen: () => {
        Swal.showLoading();
      }
    });

    const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwAq86PGKnwuXt3JwqSZ8Vz4VIDs8fq5Ean5TiZfnHg0FaYn0QHVQnv_7Yd1I1ZZsVRoQ/exec"; 

    try {
      const response = await fetch(WEB_APP_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: "login", username, password }),
      });
      
      const result = await response.json();

      if (result.status === "success") {
        
        // ✅ 2. แจ้งเตือนเมื่อสำเร็จ (กลางจอ เร็วๆ และมีหลอดเวลาบอก)
        Swal.fire({
          icon: 'success',
          title: 'เข้าสู่ระบบสำเร็จ!',
          html: `ยินดีต้อนรับ <b>${result.data.firstName}</b>`,
          showConfirmButton: false,
          timer: 1000, // ปิดอัตโนมัติใน 1 วินาที (เร็วทันใจ)
          timerProgressBar: true, // มีหลอดโหลดด้านล่างเพิ่มความสวยงาม
          backdrop: 'rgba(0,0,0,0.4)',
        }).then(() => {
          // เก็บข้อมูลและเปลี่ยนหน้าหลังจากป๊อปอัปปิดลง
          localStorage.setItem('userToken', 'true');
          localStorage.setItem('userName', result.data.username); 
            localStorage.setItem('userMajor', result.data.category);
          localStorage.setItem('userLevel', result.data.level);
                    navigate('/HomePage');
        });

      } else {
        // ❌ 3. แจ้งเตือนเมื่อรหัสผิด (ชัดเจน สีปุ่มสวยงาม)
        Swal.fire({
          icon: 'error',
          title: 'ล็อกอินไม่สำเร็จ',
          text: result.message || 'ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง',
          confirmButtonColor: '#ef4444',
          confirmButtonText: 'ลองใหม่อีกครั้ง',
          backdrop: 'rgba(0,0,0,0.4)',
        });
      }
    } catch (error) {
      // ❌ 4. แจ้งเตือนเมื่อระบบขัดข้อง
      Swal.fire({
        icon: 'warning',
        title: 'การเชื่อมต่อมีปัญหา',
        text: 'ไม่สามารถติดต่อเซิร์ฟเวอร์ได้ กรุณาลองใหม่อีกครั้ง',
        confirmButtonColor: '#f59e0b',
        confirmButtonText: 'รับทราบ',
        backdrop: 'rgba(0,0,0,0.4)',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>เข้าสู่ระบบนักเรียน</h2>
        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>ชื่อล็อกอิน (ภาษาอังกฤษ) <span style={styles.note}>*พิมพ์ให้ตรงกับที่สมัคร</span></label>
            <input 
              type="text" 
              placeholder="Username" 
              style={styles.input}
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>รหัสผ่าน (เลขบัตรประชาชน)</label>
            <input 
              type="password" 
              placeholder="Password" 
              style={styles.input}
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>

          <button 
            type="submit" 
            style={{
              ...styles.loginBtn,
              background: isLoading ? '#9ca3af' : '#4A90E2',
              cursor: isLoading ? 'wait' : 'pointer'
            }}
            disabled={isLoading}
          >
            {isLoading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
          </button>
          
          <div style={styles.divider}>หรือ</div>
          
          <button 
            type="button" 
            onClick={() => navigate('/register')}
            style={styles.regBtn}
            disabled={isLoading}
          >
            สมัครสมาชิกใหม่
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', fontFamily: "'Kanit', sans-serif" },
  card: { background: '#fff', padding: '40px', borderRadius: '15px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' },
  title: { textAlign: 'center', color: '#333', marginBottom: '30px' },
  form: { display: 'flex', flexDirection: 'column' },
  inputGroup: { marginBottom: '20px' },
  label: { display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' },
  note: { color: '#ff4d4d', fontSize: '11px', fontWeight: 'normal' },
  input: { width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box', fontSize: '16px', outline: 'none' },
  loginBtn: { color: '#fff', padding: '12px', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '600', transition: 'background 0.3s' },
  regBtn: { background: '#fff', color: '#4A90E2', padding: '10px', border: '2px solid #4A90E2', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600', transition: 'background 0.3s' },
  divider: { textAlign: 'center', margin: '20px 0', color: '#888', fontSize: '12px' }
};

export default Login;