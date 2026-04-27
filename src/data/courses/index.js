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
import { basicMachineToolsData } from "./basic-machine-tools"; // 1. import เพิ่มตรงนี้
import { weldingSheetMetalData } from "./welding-and-sheet-metal"; // 1. import เพิ่มตรงนี้
import { fuelsLubricantsData } from "./fuels-and-lubricants"; // 1. import เพิ่มตรงนี้
import { smallEnginesData } from "./small-engines"; // 1. import เพิ่มตรงนี้
import { carServiceData } from "./car-service"; // 1. import เพิ่ม
import { motorcycleMechanicData } from "./motorcycle-mechanic"; // 1. import เพิ่มตรงนี้
import { digitalTechForCareerData } from "./digital-tech-for-career"; // 1. import เพิ่มตรงนี้
import { basicTechnicalDrawingData } from "./basic-technical-drawing"; // 1. import เพิ่มตรงนี้
import { basicElectricalData } from "./basic-electrical-electronics"; // 1. import เพิ่มตรงนี้
import { dcCircuitsData } from "./dc-circuits"; // 1. import เพิ่มตรงนี้
import { buildingElectricalInstallationData } from "./building-electrical-installation"; // 1. import เพิ่มตรงนี้
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
  basicMachineToolsData,
  weldingSheetMetalData,
  fuelsLubricantsData,
  smallEnginesData,
  carServiceData,
  motorcycleMechanicData,
  digitalTechForCareerData,
  basicTechnicalDrawingData,
  basicElectricalData, // 2. ใส่ลงใน array นี้ด้วย
  dcCircuitsData, // 2. ใส่ลงใน array นี้ด้วย
  buildingElectricalInstallationData, // 2. ใส่ลงใน array นี้ด้วย
];

export const categories = [
  { id: "all",        label: "ทั้งหมด",       icon: "⊞" },
  { id: "tech",       label: "เทคโนโลยีธุรกิจดิจิทัล",     icon: "💻" },
  { id: "accounting", label: "บัญชี", icon: "📊" },
  { id: "english",    label: "ภาษาต่างประเทศ",   icon: "🌐" },
  { id: "marketing",  label: "การตลาด",       icon: "📣" },
  { id: "technical",  label: "ช่างยนต์",   icon: "🛠️" },
  { id: "electrical",  label: "ช่างไฟฟ้า",   icon: "⚡" },
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