// src/data/courses/index.js
import { appliedProgrammingData } from "./applied-programming";
import { thaiCommunicationData } from "./thai-communication";
import { englishCommunicationData } from "./english-communication"; // 1. import มาเพิ่มตรงนี้
import { healthSafetyData } from "./health-safety"; // 1. import เพิ่ม
import { sustainableDevelopmentData } from "./sustainable-development"; // 1. import เพิ่ม
import { basicBusinessData } from "./basic-business"; // 1. import เพิ่มตรงนี้
import { computerOSData } from "./computer-os"; // 1. import เพิ่มตรงนี้
import { wordProcessingData } from "./word-processing"; // 1. import เพิ่มตรงนี้
import { computerMaintenanceData } from "./computer-maintenance"; // 1. import เพิ่มตรงนี้
import { industrialMaterialsData } from "./industrial-materials"; // 1. import เพิ่ม
export const courses = [
  appliedProgrammingData,
  thaiCommunicationData,
  englishCommunicationData, // 2. ใส่ลงใน array นี้ด้วย
  healthSafetyData,
  sustainableDevelopmentData,
  basicBusinessData,
  computerOSData,
  wordProcessingData,
  computerMaintenanceData,
  industrialMaterialsData,
];

export const categories = [
  { id: "all",        label: "ทั้งหมด",       icon: "⊞" },
  { id: "tech",       label: "เทคโนโลยีธุรกิจดิจิทัล",     icon: "💻" },
  { id: "accounting", label: "บัญชี", icon: "📊" },
  { id: "english",    label: "ภาษาต่างประเทศ",   icon: "🌐" },
  { id: "marketing",  label: "การตลาด",       icon: "📣" },
  { id: "technical",  label: "ช่างยนต์",   icon: "🛠️" },
  { id: "general",      label: "วิชาสามัญ",           icon: "📚" },
];
export const levels = [
    { id: "all", label: "ทุกระดับชั้น" },
    { id: "pvc1", label: "ปวช. 1" },
    { id: "pvc2", label: "ปวช. 2" },
    { id: "pvc3", label: "ปวช. 3" },
    { id: "pvs1", label: "ปวส. 1" },
    { id: "pvs2", label: "ปวส. 2" },
  ];