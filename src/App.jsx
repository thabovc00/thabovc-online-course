import { BrowserRouter, Routes, Route } from "react-router-dom";
import CoursesPage from "./CoursesPage";
import CourseDetail from "./CourseDetail";
import HomePage from "./HomePage";
import ContactPage from "./ContactPage";
import AnnouncementPage from "./AnnouncementPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/course/:courseId" element={<CourseDetail />} />
        
        {/* รวม Route ทั้งหมดไว้ในแท็ก Routes เดียวกัน */}
        <Route path="/ContactPage" element={<ContactPage />} />
        <Route path="/AnnouncementPage" element={<AnnouncementPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;