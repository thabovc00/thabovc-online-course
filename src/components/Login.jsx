/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // ✅ เพิ่ม State สำหรับจัดการการโหลด
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // ✅ เริ่มต้นโหลด ให้ปุ่มเปลี่ยนสถานะ
    setIsLoading(true);
    
    const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwAq86PGKnwuXt3JwqSZ8Vz4VIDs8fq5Ean5TiZfnHg0FaYn0QHVQnv_7Yd1I1ZZsVRoQ/exec"; 

    try {
      const response = await fetch(WEB_APP_URL, {
        method: 'POST',
        body: JSON.stringify({ action: "login", username, password }),
      });
      
      const result = await response.json();

      if (result.status === "success") {
        // บันทึกข้อมูลลงเครื่องให้ตรงกับที่ Navbar เรียกใช้
        localStorage.setItem('userName', result.data.username); 
        localStorage.setItem('userMajor', result.data.category);
        localStorage.setItem('userLevel', result.data.level);
        
        navigate('/courses');
      } else {
        alert("ชื่อหรือรหัสผ่านไม่ถูกต้อง");
      }
    } catch (error) {
      alert("การเชื่อมต่อขัดข้อง กรุณาลองใหม่");
    } finally {
      // ✅ ไม่ว่าจะล็อกอินสำเร็จหรือล้มเหลว ก็ให้เลิกโหลด (ปุ่มกลับมาเป็นปกติ)
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>เข้าสู่ระบบนักเรียน</h2>
        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>ชื่อจริง (ภาษาอังกฤษ) <span style={styles.note}>*พิมพ์ให้ตรงกับที่สมัคร</span></label>
            <input 
              type="text" 
              placeholder="Firstname" 
              style={styles.input}
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>เลขบัตรประชาชน</label>
            <input 
              type="password" 
              placeholder="รหัสผ่านของคุณ" 
              style={styles.input}
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>

          {/* ✅ เปลี่ยนปุ่มให้ตอบสนองตาม State การโหลด */}
          <button 
            type="submit" 
            style={{
              ...styles.loginBtn,
              background: isLoading ? '#9ca3af' : '#4A90E2', // สีเทาตอนโหลด, สีฟ้าตอนปกติ
              cursor: isLoading ? 'wait' : 'pointer' // เปลี่ยน Cursor เป็นรูปรอ
            }}
            disabled={isLoading} // ป้องกันการกดปุ่มรัวๆ
          >
            {isLoading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
          </button>
          
          <div style={styles.divider}>หรือ</div>
          
          <button 
            type="button" 
            onClick={() => navigate('/register')}
            style={styles.regBtn}
            disabled={isLoading} // ปิดปุ่มสมัครสมาชิกตอนที่กำลังโหลดด้วย
          >
            สมัครสมาชิกใหม่
          </button>
        </form>
      </div>
    </div>
  );
};

// สไตล์ CSS-in-JS แบบโมเดิร์น
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    fontFamily: "'Kanit', sans-serif",
  },
  card: {
    background: '#fff',
    padding: '40px',
    borderRadius: '15px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  title: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '30px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '14px',
    fontWeight: '500',
  },
  note: {
    color: '#ff4d4d',
    fontSize: '11px',
    fontWeight: 'normal',
  },
  input: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    boxSizing: 'border-box',
    fontSize: '16px',
  },
  loginBtn: {
    color: '#fff',
    padding: '12px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'background 0.3s',
  },
  regBtn: {
    background: '#fff',
    color: '#4A90E2',
    padding: '10px',
    border: '2px solid #4A90E2',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
  },
  divider: {
    textAlign: 'center',
    margin: '20px 0',
    color: '#888',
    fontSize: '12px',
  }
};

export default Login;