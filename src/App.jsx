import { BrowserRouter, Routes, Route } from "react-router-dom";
import CoursesPage from "./CoursesPage";
import CourseDetail from "./CourseDetail";
import HomePage from "./HomePage";
import ContactPage from "./ContactPage";
import AnnouncementPage from "./AnnouncementPage";
// 1. เพิ่มการ Import หน้า Login (ตรวจสอบ path ไฟล์ให้ถูกต้องนะครับ)
import Login from "./components/Login"; 
import Register from "./components/Register"; // Import ไฟล์สมัครสมาชิกมา
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 2. ปรับให้หน้าแรกสุดเป็นหน้า Login เพื่อบังคับให้เด็กล็อกอินก่อน */}
        <Route path="/" element={<Login />} /> 
        
        {/* หรือถ้าอยากให้หน้าแรกเป็น HomePage เหมือนเดิม ให้ใช้ path="/login" แทน */}
        <Route path="/login" element={<Login />} />

        {/* Route เดิมของคุณ */}
        <Route path="/HomePage" element={<HomePage />} /> {/* เปลี่ยน path ของ HomePage หนีจาก / */}
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/course/:courseId" element={<CourseDetail />} />
        <Route path="/ContactPage" element={<ContactPage />} />
        <Route path="/AnnouncementPage" element={<AnnouncementPage />} />
        <Route path="/register" element={<Register />} /> {/* Route สำหรับหน้า Register */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;