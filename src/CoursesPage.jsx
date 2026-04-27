// src/coursesPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { courses, categories, levels } from "./data/courses"; 
import Navbar from "./components/Navbar";

export default function CoursesPage() {
  const navigate = useNavigate(); 
  
  // ประกาศ State ไว้ที่นี่ที่เดียว (ห้ามมีซ้ำข้างล่าง)
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeLevel, setActiveLevel] = useState("all"); 
  const [hoveredId, setHoveredId] = useState(null);
  const [search, setSearch] = useState("");

  // ตรรกะการกรองข้อมูล
    const filtered = courses.filter((c) => {
  const matchCat = activeCategory === "all" || c.category === activeCategory;
  const matchLevel = activeLevel === "all" || c.level === activeLevel;
  
  // เพิ่มบรรทัดที่ตรวจสอบ subjectCode เข้าไปแบบนี้ครับ
  const matchSearch = (c.subject || "").toLowerCase().includes(search.toLowerCase()) || 
                      (c.teacher || "").toLowerCase().includes(search.toLowerCase()) ||
                      (c.subjectCode || "").toLowerCase().includes(search.toLowerCase()); // ✅ เพิ่มบรรทัดนี้
                      
  return matchCat && matchLevel && matchSearch;
    });

    return (
    <>
      <Navbar />

      {/* ── Hero ── */}
      <div className="lh-hero" style={{
        background: "linear-gradient(135deg,#1e3a8a 0%,#2563eb 55%,#7c3aed 100%)",
        padding: "80px 20px", textAlign: "center", color: "#fff",
        position: "relative", overflow: "hidden",
      }}>
        {/* Decorative Circles */}
        <div style={{ position: "absolute", top: -50, right: -50, width: 220, height: 220, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
        <div style={{ position: "absolute", bottom: -70, left: -30, width: 260, height: 260, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
        
        <div style={{ position: "relative", zIndex: 2, maxWidth: 800, margin: "0 auto" }}>
          <p style={{ fontSize: 11, letterSpacing: 3, opacity: 0.8, marginBottom: 10, textTransform: "uppercase" }}>Online Learning Center</p>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 700, lineHeight: 1.2, marginBottom: 15 }}>
            เรียนรู้ทุกวิชา <span style={{ color: "#bfdbfe" }}>กับครูผู้เชี่ยวชาญ</span>
          </h1>
          <p style={{ fontSize: "clamp(14px, 2vw, 16px)", opacity: 0.9, marginBottom: 30 }}>เลือกเรียนได้ตามความสนใจ เรียนได้ทุกที่ ทุกเวลา</p>

          {/* 🔍 Big Search Bar */}
          <div style={{ 
            maxWidth: 600, 
            margin: "0 auto", 
            position: "relative",
            filter: "drop-shadow(0 10px 15px rgba(0,0,0,0.1))"
          }}>
            <input 
              type="text"
              placeholder="ค้นหาชื่อวิชา, รหัสวิชา หรือชื่อผู้สอน..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                padding: "16px 25px",
                paddingLeft: "50px",
                borderRadius: "16px",
                border: "none",
                fontSize: "16px",
                outline: "none",
                color: "#1e293b",
                boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05)"
              }}
            />
            <span style={{ 
              position: "absolute", 
              left: 18, 
              top: "50%", 
              transform: "translateY(-50%)",
              fontSize: 20,
              opacity: 0.5
            }}>🔍</span>
            {search && (
              <button 
                onClick={() => setSearch("")}
                style={{
                  position: "absolute",
                  right: 15,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "#e2e8f0",
                  border: "none",
                  borderRadius: "50%",
                  width: 24,
                  height: 24,
                  cursor: "pointer",
                  color: "#64748b",
                  fontSize: 12,
                  fontWeight: "bold"
                }}
              >✕</button>
            )}
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="lh-layout" style={{ display: "flex", gap: 24, padding: "28px 32px", alignItems: "flex-start" }}>

        {/* Sidebar */}
        <aside className="lh-sidebar" style={{
          width: 240, flexShrink: 0, display: "flex", flexDirection: "column",
          background: "#fff", borderRadius: 16,
          border: "1px solid #e2e8f0", boxShadow: "0 1px 8px rgba(0,0,0,0.05)",
          padding: "16px 0", position: "sticky", top: 80,
        }}>
          <p className="lh-sidebar-title" style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", letterSpacing: 1.8, textTransform: "uppercase", padding: "0 20px", marginBottom: 10 }}>หมวดหมู่</p>
          {categories.map(cat => {
            const count = cat.id === "all" ? courses.length : courses.filter(c => c.category === cat.id).length;
            const isActive = activeCategory === cat.id;
            return (
              <button key={cat.id} className={`lh-cat-btn${isActive ? " active" : ""}`} onClick={() => setActiveCategory(cat.id)}>
                <span style={{ fontSize: 15 }}>{cat.icon}</span>
                <span style={{ flex: 1 }}>{cat.label}</span>
                <span style={{
                  background: isActive ? "#2563eb" : "#f1f5f9",
                  color: isActive ? "#fff" : "#94a3b8",
                  borderRadius: 10, padding: "1px 8px", fontSize: 11, fontWeight: 700, minWidth: 22, textAlign: "center"
                }}>{count}</span>
              </button>
            );
          })}
        </aside>

        {/* Course area */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* ⬇️ วางโค้ดปุ่มระดับชั้นตรงนี้ ⬇️ */}
  <div style={{ display: "flex", gap: "10px", marginBottom: "25px", flexWrap: "wrap" }}>
    {levels.map((lvl) => (
      <button
        key={lvl.id}
        onClick={() => setActiveLevel(lvl.id)}
        style={{
          padding: "8px 18px",
          borderRadius: "100px",
          border: "1px solid",
          borderColor: activeLevel === lvl.id ? "#2563eb" : "#e2e8f0",
          background: activeLevel === lvl.id ? "#2563eb" : "#fff",
          color: activeLevel === lvl.id ? "#fff" : "#64748b",
          fontSize: "13px",
          fontWeight: "600",
          cursor: "pointer",
          transition: "all 0.2s"
        }}
      >
        {lvl.label}
      </button>
    ))}
  </div>
  {/* ⬆️ จบส่วนปุ่มระดับชั้น ⬆️ */}
          <p style={{ color: "#64748b", fontSize: 13, marginBottom: 18 }}>
            พบ <strong style={{ color: "#1e293b" }}>{filtered.length}</strong> รายวิชา
            {search && <span style={{ color: "#2563eb" }}> · "{search}"</span>}
          </p>

          <div className="lh-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {filtered.map(course => {
              const hovered = hoveredId === course.id;
              return (
                <div key={course.id} className="lh-card"
                  onMouseEnter={() => setHoveredId(course.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div style={{ height: 5, background: `linear-gradient(90deg,${course.color},${course.color}88)` }} />

                  <div style={{ padding: "20px 16px 15px", textAlign: "center" }}>


  {/* ข้อมูลวิชา - เรียงจากบนลงล่างแบบกึ่งกลาง */}
  <div>
    <div style={{ 
      fontSize: 10, 
      fontWeight: 700, 
      color: "#94a3b8", 
      marginBottom: 4, 
      letterSpacing: "0.5px" 
    }}>
      {course.subjectCode}
    </div>

    <h3 style={{ 
      fontSize: 15, 
      fontWeight: 700, 
      color: "#1e293b", 
      lineHeight: 1.4, 
      marginBottom: 4,
      minHeight: "42px", // ล็อคความสูงไว้เพื่อให้ Card เท่ากัน
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      {course.subject}
    </h3>

    <p style={{ fontSize: 12, color: course.color, fontWeight: 600 }}>
      {course.teacher}
    </p>
  </div>
</div>
                  <div style={{ width: "100%", height: 160, overflow: "hidden", background: "#eee" }}>
                    <img src={course.image} alt={course.subject} style={{
                      width: "100%", height: "100%", objectFit: "cover",
                      transition: "transform 0.5s",
                      transform: hovered ? "scale(1.1)" : "scale(1)"
                    }} />
                  </div>

                  <div style={{ padding: "12px 16px 16px", flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
                    <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6, flex: 1 }}>{course.description}</p>
                    <button
                      onClick={() => navigate(`/course/${course.id}`)}
                      style={{
                        width: "100%", padding: "9px", borderRadius: 10, border: "none",
                        background: hovered ? course.color : `${course.color}18`,
                        color: hovered ? "#fff" : course.color,
                        fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all 0.2s"
                      }}
                    >
                      เข้าสู่ห้องเรียน →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <footer style={{ background: "#1e293b", color: "#94a3b8", textAlign: "center", padding: "20px 32px", fontSize: 13, marginTop: 40 }}>
        © 2026 LearnHub — ระบบจัดการเรียนรู้ออนไลน์
      </footer>
    </>
  );
}