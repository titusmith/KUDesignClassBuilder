import type { Course } from "./schedulerTypes";

function createCourse(
  prefix: string,
  number: string,
  options?: { name?: string; sections?: number; crossListedWith?: string }
): Course {
  const code = options?.crossListedWith
    ? `${prefix} ${number}/${options.crossListedWith}`
    : `${prefix} ${number}`;
  return {
    id: `course-${prefix.toLowerCase()}-${number}`,
    code,
    prefix,
    number,
    name: options?.name,
    sections: options?.sections ?? 1,
  };
}

function createCrossListedCourses(
  prefix: string,
  number1: string,
  number2: string,
  options?: { name?: string; sections?: number }
): Course[] {
  const code = `${prefix} ${number1}/${number2}`;
  return [
    {
      id: `course-${prefix.toLowerCase()}-${number1}`,
      code,
      prefix,
      number: number1,
      name: options?.name,
      sections: options?.sections ?? 1,
    },
    {
      id: `course-${prefix.toLowerCase()}-${number2}`,
      code,
      prefix,
      number: number2,
      name: options?.name,
      sections: options?.sections ?? 1,
    },
  ];
}

export const courseRegistry: Course[] = [
  // ADS
  createCourse("ADS", "320", { name: "KU Design Professional Lecture" }),
  createCourse("ADS", "345", { name: "History of Design II" }),
  createCourse("ADS", "346", { name: "History of Animation" }),
  createCourse("ADS", "348", { name: "History of Illustration" }),
  createCourse("ADS", "531", { name: "Internship Credit" }),
  createCourse("ADS", "560", { name: "Topics in Design" }),
  createCourse("ADS", "580", { name: "Special Problems in Design" }),
  createCourse("ADS", "710", { name: "Advanced Human Factors Interaction Design" }),
  createCourse("ADS", "740", { name: "Special Problems in Design" }),
  createCourse("ADS", "750", { name: "Design Management" }),
  createCourse("ADS", "765", { name: "Interaction Design" }),
  createCourse("ADS", "890", { name: "Thesis" }),
  createCourse("ADS", "861", { name: "Thesis Research Seminar" }),
  // ANIM
  createCourse("ANIM", "110", { name: "Animation I" }),
  createCourse("ANIM", "210", { name: "Visual Development for Animation" }),
  createCourse("ANIM", "215", { name: "Media in Motion" }),
  createCourse("ANIM", "310", { name: "Principles of Story" }),
  createCourse("ANIM", "410", { name: "Studio Pre-Production" }),
  createCourse("ANIM", "415", { name: "Action Analysis" }),
  // INDD
  createCourse("INDD", "101", { name: "Industrial Design Foundations" }),
  createCourse("INDD", "210", { name: "ID Second-Year Studio I" }),
  createCourse("INDD", "214", { name: "Drawing Industrial Design II" }),
  createCourse("INDD", "310", { name: "ID Third-Year Studio I" }),
  createCourse("INDD", "315", { name: "Human Factors and Ergonomics" }),
  createCourse("INDD", "320", { name: "Directed Readings in INDD" }),
  createCourse("INDD", "378", { name: "Problems in Industrial Design" }),
  createCourse("INDD", "382", { name: "Digital Guitar Workshop" }),
  createCourse("INDD", "430", { name: "Industrial Design Portfolio" }),
  createCourse("INDD", "580", { name: "Senior Industrial Design Studio" }),
  // ILLU
  createCourse("ILLU", "110", { name: "Illustration I" }),
  createCourse("ILLU", "205", { name: "Drawing Media Illustration I" }),
  createCourse("ILLU", "215", { name: "Illustration 2nd-Year Studio I" }),
  createCourse("ILLU", "310", { name: "Drawing Media for Illustration 2" }),
  createCourse("ILLU", "320", { name: "Concept Art I" }),
  createCourse("ILLU", "330", { name: "Third-Year Studio I" }),
  createCourse("ILLU", "410", { name: "Fundamentals of Animation" }),
  createCourse("ILLU", "455", { name: "Promo & Marketing for Illustration 1" }),
  createCourse("ILLU", "510", { name: "Advanced Animation" }),
  // IXD
  createCourse("IXD", "402", { name: "Interaction Design 2" }),
  createCourse("IXD", "404", { name: "Dataviz and Digital Storytelling" }),
  createCourse("IXD", "415", { name: "Emerging Technologies 1" }),
  createCourse("IXD", "432", { name: "Interaction Design 4" }),
  // VISC - Cross-listed courses
  ...createCrossListedCourses("VISC", "310", "710", { name: "Letterpress" }),
  ...createCrossListedCourses("VISC", "440", "740", { name: "Bookmaking" }),
  // VISC - Regular courses
  createCourse("VISC", "202", { name: "Typography I" }),
  createCourse("VISC", "204", { name: "Second-Year Studio I" }),
  createCourse("VISC", "405", { name: "Third-Year Studio I" }),
  createCourse("VISC", "415", { name: "Motion Design" }),
  createCourse("VISC", "426", { name: "Experiential Design" }),
  createCourse("VISC", "520", { name: "Designing for Change" }),
  // BDS
  createCourse("BDS", "101", { name: "Design Thinking and Making", sections: 4 }),
  createCourse("BDS", "103", { name: "Drawing for Design" }),
];
