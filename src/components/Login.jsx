/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    const val = e.target.value;
    if (/^\d*$/.test(val) && val.length <= 13) setUsername(val);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (username.length !== 13) {
      Swal.fire({ icon: 'warning', title: 'เลขบัตรประชาชนไม่ถูกต้อง', text: 'กรุณากรอกเลขบัตรประชาชนให้ครบ 13 หลัก', confirmButtonColor: '#4A90E2', width: '350px' });
      return;
    }

    setIsLoading(true);
   Swal.fire({ title: 'กำลังตรวจสอบข้อมูล...', allowOutsideClick: 
    false, showConfirmButton: false, padding: '2em', width: 'auto', 
    backdrop: 'rgba(0,0,0,0.4)', didOpen: () => { Swal.showLoading(); } });

    const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwAq86PGKnwuXt3JwqSZ8Vz4VIDs8fq5Ean5TiZfnHg0FaYn0QHVQnv_7Yd1I1ZZsVRoQ/exec";

    try {
      const response = await fetch(WEB_APP_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: "login", username, password }),
      });

      const dataText = await response.text();
      let result;
      try {
        result = JSON.parse(dataText);
      } catch {
        throw new Error("รูปแบบข้อมูลจากเซิร์ฟเวอร์ไม่ถูกต้อง");
      }

      if (result.status === "success") {
        Swal.fire({
          icon: 'success',
          title: 'เข้าสู่ระบบสำเร็จ!',
          html: `ยินดีต้อนรับ <b>${result.data.firstName}</b>`,
          showConfirmButton: false, timer: 1000, timerProgressBar: true, backdrop: 'rgba(0,0,0,0.4)',
        }).then(() => {
          localStorage.setItem('userToken', 'true');
          localStorage.setItem('userName', result.data.username);
          localStorage.setItem('userFirstName', result.data.firstName);
          localStorage.setItem('userLastName', result.data.lastName);
          localStorage.setItem('userPhone', result.data.phone);
          localStorage.setItem('userMajor', result.data.category);
          localStorage.setItem('userLevel', result.data.level);
          navigate('/HomePage');
        });
      } else {
        Swal.fire({ icon: 'error', title: 'ล็อกอินไม่สำเร็จ', text: result.message || 'เลขบัตรประชาชนหรือรหัสผ่านไม่ถูกต้อง', confirmButtonColor: '#ef4444', confirmButtonText: 'ลองใหม่อีกครั้ง', backdrop: 'rgba(0,0,0,0.4)' });
      }
    } catch (error) {
      Swal.fire({ icon: 'warning', title: 'การเชื่อมต่อมีปัญหา', text: 'ไม่สามารถติดต่อเซิร์ฟเวอร์ได้ กรุณาลองใหม่อีกครั้ง', confirmButtonColor: '#f59e0b', confirmButtonText: 'รับทราบ', backdrop: 'rgba(0,0,0,0.4)' });
    } finally {
      setIsLoading(false);
    }
  };

  const lineUrl = "https://line.me/ti/p/~LINE_ID_HERE";

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        <div style={styles.header}>
          <div style={styles.logoBox}>
  <img src="/images/logo.png" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '10px' }} />
</div>
          <h2 style={styles.title}>วิทยาลัยเทคโนโลยีวิชาชีพท่าบ่อ</h2>
          <p style={styles.subtitle}>ระบบจัดการเรียนรู้ออนไลน์</p>
        </div>

        <form onSubmit={handleLogin} style={styles.form}>

          <div style={styles.inputGroup}>
            <label style={styles.label}>เลขบัตรประชาชน</label>
            <div style={styles.inputWrapper}>
              <span style={styles.inputIcon}>🪪</span>
              <input
                type="text"
                inputMode="numeric"
                placeholder="กรอกเลข 13 หลัก"
                style={styles.input}
                value={username}
                onChange={handleUsernameChange}
                required
              />
            </div>
            <div style={{ fontSize: '11px', marginTop: '5px', color: username.length === 13 ? '#16a34a' : '#94a3b8' }}>
              {username.length}/13 หลัก {username.length === 13 ? '✓ ครบแล้ว' : ''}
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>รหัสผ่าน</label>
            <div style={styles.inputWrapper}>
              <span style={styles.inputIcon}>🔒</span>
              <input
                type="password"
                placeholder="กรอกรหัสผ่าน"
                style={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            style={{ ...styles.loginBtn, opacity: isLoading ? 0.7 : 1, cursor: isLoading ? 'wait' : 'pointer' }}
            disabled={isLoading}
          >
            {isLoading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
          </button>

          <div style={styles.divider}>
            <span>หรือ</span>
          </div>

          <button
            type="button"
            onClick={() => navigate('/register')}
            style={styles.regBtn}
            disabled={isLoading}
          >
            สมัครสมาชิกใหม่
          </button>

        </form>

        <div style={styles.noteBox}>
          <p style={styles.noteTitle}>🔑 ลืมรหัสผ่าน?</p>
          <p style={styles.noteText}>ติดต่อครูผู้จัดการระบบได้เลยครับ</p>
          <button
            type="button"
            onClick={() => window.open(lineUrl, '_blank')}
            style={styles.lineBtn}
          >
            <span style={{ fontSize: '16px' }}>💬</span>
            ติดต่อผ่าน LINE
          </button>
        </div>

      </div>

      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', marginTop: '20px' }}>
        © 2026 LearnHub · วิทยาลัยเทคโนโลยีวิชาชีพท่าบ่อ
      </p>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
    minHeight: '100vh', padding: '20px',
    background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #7c3aed 100%)',
    fontFamily: "'Kanit', sans-serif"
  },
  card: {
    background: '#fff', borderRadius: '20px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
    width: '100%', maxWidth: '420px', overflow: 'hidden'
  },
  header: {
    background: 'linear-gradient(135deg, #1e3a8a, #2563eb)',
    padding: '32px 40px 28px', textAlign: 'center'
  },
  logoBox: {
    width: 52, height: 52, borderRadius: 14, margin: '0 auto 12px',
    background: 'rgba(255,255,255,0.2)', border: '2px solid rgba(255,255,255,0.4)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 24, fontWeight: 700, color: '#fff'
  },
  title: { margin: 0, fontSize: '22px', fontWeight: 700, color: '#fff' },
  subtitle: { margin: '4px 0 0', fontSize: '13px', opacity: 0.8, color: '#bfdbfe' },
  form: { display: 'flex', flexDirection: 'column', padding: '28px 32px 20px' },
  inputGroup: { marginBottom: '18px' },
  label: { display: 'block', marginBottom: '7px', fontSize: '13px', fontWeight: '600', color: '#374151' },
  inputWrapper: {
    display: 'flex', alignItems: 'center',
    border: '1.5px solid #e2e8f0', borderRadius: '10px',
    overflow: 'hidden', background: '#f8fafc'
  },
  inputIcon: {
    padding: '12px', fontSize: '16px',
    background: '#f1f5f9', borderRight: '1px solid #e2e8f0'
  },
  input: {
    flex: 1, padding: '12px', border: 'none', outline: 'none',
    fontSize: '15px', background: 'transparent',
    fontFamily: "'Kanit', sans-serif", color: '#1e293b'
  },
  loginBtn: {
    background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
    color: '#fff', padding: '13px', border: 'none', borderRadius: '10px',
    fontSize: '15px', fontWeight: '600', fontFamily: "'Kanit', sans-serif", marginTop: '4px'
  },
  divider: {
    textAlign: 'center', margin: '16px 0', color: '#cbd5e1', fontSize: '12px'
  },
  regBtn: {
    background: '#fff', color: '#2563eb', padding: '11px',
    border: '1.5px solid #2563eb', borderRadius: '10px',
    cursor: 'pointer', fontSize: '14px', fontWeight: '600',
    fontFamily: "'Kanit', sans-serif"
  },
  noteBox: {
    margin: '0 32px 28px', padding: '14px 16px',
    background: '#fffbeb', border: '1px solid #fde68a',
    borderRadius: '12px', textAlign: 'center'
  },
  noteTitle: { margin: '0 0 4px', fontSize: '13px', fontWeight: '700', color: '#92400e' },
  noteText: { margin: '0 0 10px', fontSize: '12px', color: '#78716c' },
  lineBtn: {
    display: 'inline-flex', alignItems: 'center', gap: '7px',
    background: '#06c755', color: '#fff', padding: '8px 20px',
    borderRadius: '20px', fontSize: '13px', fontWeight: '600',
    border: 'none', cursor: 'pointer', fontFamily: "'Kanit', sans-serif"
  }
};

export default Login;