// eslint-disable-next-line no-unused-vars
import React from 'react';

import { Mail, Phone, MapPin } from 'lucide-react';
import Navbar from "./components/Navbar";
const ContactPage = () => {
  // ข้อมูลสมมุติบุคลากร 15 ท่าน พร้อมรูปภาพ
  const staffMembers = [
    // ท่านแรกเป็นชื่อตามตัวอย่าง "อาจารย์เทพาธิป ใจยั่งยืน"
    { id: 1, name: "อาจารย์เทพาธิป ใจยั่งยืน", role: "ฝ่ายวิชาการ", dept: "ผู้บริหาร", email: "tepatip.j@college.ac.th", phone: "081-234-5678" },
    { id: 2, name: "อาจารย์วิภาวี มีความรู้", role: "รองคณบดี ฝ่ายวิชาการ", dept: "บริหารธุรกิจ", email: "wipawee.m@college.ac.th", phone: "081-234-5679" },
    { id: 3, name: "อาจารย์มานะ ขยันเขียน", role: "รองคณบดี ฝ่ายวิจัย", dept: "การบัญชี", email: "mana.k@college.ac.th", phone: "081-234-5680" },
    { id: 4, name: "คุณครูใจดี รักเรียน", role: "ผู้ช่วยคณบดี", dept: "ช่างยนต์", email: "jaidee.r@college.ac.th", phone: "082-345-6789" },
    { id: 5, name: "คุณครูเก่งกาจ สถาบัน", role: "ผู้ช่วยคณบดี", dept: "วิชาสามัญ", email: "keng.s@college.ac.th", phone: "082-345-6790" },
    { id: 6, name: "อาจารย์นารี รุ่งเรือง", role: "หัวหน้าภาควิชา", dept: "เทคโนโลยีสารสนเทศ", email: "naree.r@college.ac.th", phone: "082-345-6791" },
    { id: 7, name: "อาจารย์ประหยัด อดออม", role: "หัวหน้าภาควิชา", dept: "บริหารธุรกิจ", email: "prayad.o@college.ac.th", phone: "083-456-7890" },
    { id: 8, name: "อาจารย์มณี มีทรัพย์", role: "หัวหน้าภาควิชา", dept: "การบัญชี", email: "manee.m@college.ac.th", phone: "083-456-7891" },
    { id: 9, name: "คุณครูโชคดี ร่ำรวย", role: "หัวหน้าภาควิชา", dept: "ช่างยนต์", email: "chokdee.r@college.ac.th", phone: "083-456-7892" },
    { id: 10, name: "คุณครูอาทิตย์ สดใส", role: "หัวหน้าภาควิชา", dept: "วิชาสามัญ", email: "arthit.s@college.ac.th", phone: "084-567-8901" },
    { id: 11, name: "อาจารย์จันทรา ส่องแสง", role: "อาจารย์ประจำ", dept: "เทคโนโลยีสารสนเทศ", email: "chantra.s@college.ac.th", phone: "084-567-8902" },
    { id: 12, name: "อาจารย์ดาวเรือง เรืองรอง", role: "อาจารย์ประจำ", dept: "บริหารธุรกิจ", email: "daorueng.r@college.ac.th", phone: "084-567-8903" },
    { id: 13, name: "คุณครูสมพร สอนดี", role: "ครูประจำการ", dept: "การบัญชี", email: "somporn.s@college.ac.th", phone: "085-678-9012" },
    { id: 14, name: "คุณครูปัญญา เลิศล้ำ", role: "ครูประจำการ", dept: "ช่างยนต์", email: "panya.l@college.ac.th", phone: "085-678-9013" },
    { id: 15, name: "คุณครูรัตนา มั่นคง", role: "ครูประจำการ", dept: "วิชาสามัญ", email: "rattana.m@college.ac.th", phone: "085-678-9014" },
  ];
    
    return (
    <>
      {/* เรียกใช้งาน Navbar ตรงนี้ครับ จะได้อยู่บนสุดของหน้า */}
      <Navbar />
      
      <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-16">
            <p className="text-2xl font-bold text-indigo-600 tracking-wide">วิทยาลัยเทคโนโลยีวิชาชีพท่าบ่อ</p>
            <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">ทำความรู้จักกับบุคลากรของเรา</h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              วิทยาลัยเทคโนโลยีแห่งนี้ประกอบด้วยทีมงานผู้เชี่ยวชาญที่พร้อมให้ความช่วยเหลือและคำปรึกษาแก่นักเรียนทุกคนอย่างเต็มความสามารถ
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {staffMembers.map((teacher) => (
              <div key={teacher.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transform hover:-translate-y-1 transition-all duration-300">
                <div className="relative aspect-square">
                  <img 
                    src={`https://i.pravatar.cc/400?img=${teacher.id + 10}`} 
                    alt={teacher.name} 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 
                    className="text-xl font-bold text-gray-900 tracking-tight whitespace-nowrap" 
                    title={teacher.name}
                  >
                    {teacher.name}
                  </h3>
                  <p className="text-lg font-medium text-indigo-600 mb-5">{teacher.role}</p>
                  
                  <div className="space-y-3 text-gray-700 text-base">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-gray-400 shrink-0" />
                      <span className="truncate">{teacher.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-gray-400 shrink-0" />
                      <span>{teacher.phone}</span>
                    </div>
                     <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-gray-400 shrink-0" />
                      <span className="truncate">แผนก: {teacher.dept}</span>
                    </div>
                  </div>
                </div>
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
                  <button className="text-base text-indigo-600 font-semibold hover:text-indigo-800 transition-colors">
                    ดูโปรไฟล์เพิ่มเติม →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;