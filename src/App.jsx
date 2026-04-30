import { BrowserRouter, Routes, Route } from "react-router-dom";
import CoursesPage from "./CoursesPage";
import CourseDetail from "./CourseDetail";
import HomePage from "./HomePage";
import ContactPage from "./ContactPage";
import AnnouncementPage from "./AnnouncementPage";

// Import โซน Components (ตรวจสอบ Path ตามรูปภาพของคุณ)
import Login from "./components/Login"; 
import Register from "./components/Register"; 
import ProfilePage from "./ProfilePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* บังคับให้หน้าแรกสุดเป็นหน้า Login */}
        <Route path="/" element={<Login />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* หน้าหลักและเมนูต่างๆ */}
        <Route path="/HomePage" element={<HomePage />} /> 
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/course/:courseId" element={<CourseDetail />} />
        <Route path="/ContactPage" element={<ContactPage />} />
        <Route path="/AnnouncementPage" element={<AnnouncementPage />} />
        
        {/* ✅ เพิ่ม Route สำหรับหน้าข้อมูลส่วนตัว */}
        <Route path="/profile" element={<ProfilePage />} /> 
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;