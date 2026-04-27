// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Megaphone, Calendar, Clock, ChevronRight, Bell } from 'lucide-react';
import Navbar from "./components/Navbar";

const AnnouncementPage = () => {
  // 1. ส่วนข้อมูลประกาศ (คุณสามารถมาเพิ่ม/ลบ/แก้ไข ตรงนี้ได้เลย)
  const [announcements] = useState([
    {
      id: 1,
      title: "ประกาศวันเปิดภาคเรียนที่ 1 ปีการศึกษา 2569",
      date: "15 พฤษภาคม 2569",
      time: "08:30 น.",
      category: "วิชาการ",
      type: "academic",
      content: "ขอให้นักเรียนนักศึกษาทุกคนเตรียมความพร้อมสำหรับการเปิดภาคเรียนใหม่ ตรวจสอบตารางเรียนได้ที่แผนกทะเบียน",
      isUrgent: true
    },
    {
      id: 2,
      title: "ตารางสอบกลางภาค ประจำปีการศึกษา 2568",
      date: "10 สิงหาคม 2568",
      time: "ตลอดทั้งสัปดาห์",
      category: "วิชาการ",
      type: "academic",
      content: "ประกาศตารางสอบกลางภาคสำหรับทุกสาขาวิชา กรุณาตรวจสอบห้องสอบและเลขที่นั่งสอบให้เรียบร้อย",
      isUrgent: false
    },
    {
      id: 3,
      title: "กิจกรรมเข้าค่ายลูกเสือ-เนตรนารี ประจำปี",
      date: "19 กุมภาพันธ์ 2569",
      time: "07:00 น. เป็นต้นไป",
      category: "กิจกรรม",
      type: "activity",
      content: "ดำเนินการจัดกิจกรรม ณ วิทยาลัยเทคโนโลยีวิชาชีพท่าบ่อ ขอให้นักเรียนที่เข้าร่วมเตรียมอุปกรณ์ให้พร้อม",
      isUrgent: false
    },
    {
      id: 4,
      title: "โครงการอบรมเทคโนโลยีดิจิทัลสำหรับอาชีพ",
      date: "25 มีนาคม 2569",
      time: "09:00 - 16:00 น.",
      category: "กิจกรรม",
      type: "activity",
      content: "ขอเชิญนักศึกษาสาขาคอมพิวเตอร์ธุรกิจเข้าร่วมอบรมการเขียนโปรแกรมสมัยใหม่ ณ ห้องปฏิบัติการคอมพิวเตอร์ 1",
      isUrgent: false
    },
    {
      id: 5,
      title: "ประกาศรับสมัครนักศึกษาใหม่ รอบโควตาพิเศษ",
      date: "1 เมษายน - 30 เมษายน 2569",
      time: "ในวันและเวลาราชการ",
      category: "ทั่วไป",
      type: "general",
      content: "เปิดรับสมัครนักเรียนจบ ม.3 และ ม.6 เข้าศึกษาต่อในระดับ ปวช. และ ปวส. พร้อมรับสิทธิพิเศษมากมาย",
      isUrgent: false
    }
  ]);

  const [filter, setFilter] = useState('all');

  // ฟังก์ชันกรองข้อมูลตามหมวดหมู่
  const filteredData = filter === 'all' 
    ? announcements 
    : announcements.filter(item => item.type === filter);

  // สีของ Badge ตามประเภท
  const getCategoryColor = (type) => {
    switch(type) {
      case 'academic': return 'bg-blue-100 text-blue-700';
      case 'activity': return 'bg-green-100 text-green-700';
      case 'general': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          
          {/* ส่วนหัว */}
          <div className="text-center mb-12">
            <p className="text-2xl font-bold text-indigo-600 tracking-wide">วิทยาลัยเทคโนโลยีวิชาชีพท่าบ่อ</p>
            <h1 className="mt-2 text-4xl font-extrabold text-gray-900 sm:text-5xl flex items-center justify-center gap-3">
              <Megaphone className="text-indigo-600 w-10 h-10" />
              ศูนย์ประกาศข่าวสาร
            </h1>
            <p className="mt-4 text-xl text-gray-600">ติดตามข่าวสาร วันเปิดเรียน วันสอบ และกิจกรรมต่าง ๆ ของวิทยาลัย</p>
          </div>

          {/* ปุ่ม Filter หมวดหมู่ */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <button 
              onClick={() => setFilter('all')}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${filter === 'all' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
            >
              ทั้งหมด
            </button>
            <button 
              onClick={() => setFilter('academic')}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${filter === 'academic' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
            >
              วิชาการ / สอบ
            </button>
            <button 
              onClick={() => setFilter('activity')}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${filter === 'activity' ? 'bg-green-600 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
            >
              กิจกรรม
            </button>
            <button 
              onClick={() => setFilter('general')}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${filter === 'general' ? 'bg-gray-600 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
            >
              ประกาศทั่วไป
            </button>
          </div>

          {/* รายการประกาศ */}
          <div className="space-y-6">
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <div 
                  key={item.id} 
                  className={`bg-white rounded-2xl p-6 shadow-sm border-l-8 transition-all hover:shadow-md ${item.isUrgent ? 'border-l-red-500' : 'border-l-indigo-500'}`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getCategoryColor(item.type)}`}>
                          {item.category}
                        </span>
                        {item.isUrgent && (
                          <span className="flex items-center gap-1 text-red-600 text-xs font-bold animate-pulse">
                            <Bell className="w-3 h-3" /> ด่วนที่สุด
                          </span>
                        )}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600 text-lg mb-4">{item.content}</p>
                      
                      <div className="flex flex-wrap gap-6 text-sm text-gray-500 font-medium">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-indigo-500" />
                          {item.date}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-indigo-500" />
                          {item.time}
                        </div>
                      </div>
                    </div>
                    
                    <button className="flex items-center gap-1 text-indigo-600 font-bold hover:text-indigo-800 transition-colors shrink-0">
                      รายละเอียดเพิ่มเติม <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
                <p className="text-gray-500 text-xl font-medium">ไม่พบข้อมูลประกาศในหมวดหมู่ที่เลือก</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
};

export default AnnouncementPage;