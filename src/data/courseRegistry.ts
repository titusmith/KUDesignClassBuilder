import type { Course } from "./schedulerTypes";

function createCourse(
  prefix: string,
  number: string,
  options?: { name?: string; sections?: number }
): Course {
  const code = `${prefix} ${number}`;
  return {
    id: `course-${prefix.toLowerCase()}-${number}`,
    code,
    prefix,
    number,
    name: options?.name,
    sections: options?.sections ?? 1,
  };
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
  createCourse("ADS", "710"),
  createCourse("ADS", "740"),
  createCourse("ADS", "750"),
  createCourse("ADS", "765"),
  createCourse("ADS", "890"),
  createCourse("ADS", "861"),
  // ANIM
  createCourse("ANIM", "110"),
  createCourse("ANIM", "210", { name: "Visual Development Animation" }),
  createCourse("ANIM", "215", { name: "Second-Year Studio I" }),
  createCourse("ANIM", "310"),
  createCourse("ANIM", "410"),
  createCourse("ANIM", "415"),
  // INDD
  createCourse("INDD", "101"),
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
  createCourse("ILLU", "110"),
  createCourse("ILLU", "205", { name: "Drawing Media Illustration I" }),
  createCourse("ILLU", "215", { name: "Illustration 2nd-Year Studio I" }),
  createCourse("ILLU", "310"),
  createCourse("ILLU", "320", { name: "Concept Art I" }),
  createCourse("ILLU", "330", { name: "Third-Year Studio I" }),
  createCourse("ILLU", "410"),
  createCourse("ILLU", "455"),
  createCourse("ILLU", "510", { name: "Advanced Animation" }),
  // IXD
  createCourse("IXD", "402", { name: "Interaction Design 2" }),
  createCourse("IXD", "404", { name: "Dataviz and Digital Storytelling" }),
  createCourse("IXD", "415", { name: "Emerging Technologies 1" }),
  createCourse("IXD", "432", { name: "Interaction Design 4" }),
  // VISC
  createCourse("VISC", "202", { name: "Typography I" }),
  createCourse("VISC", "204", { name: "Viscom Second-Year Studio I" }),
  createCourse("VISC", "310", { name: "Letterpress" }),
  createCourse("VISC", "405", { name: "Viscom Third-Year Studio I" }),
  createCourse("VISC", "415", { name: "Motion Design" }),
  createCourse("VISC", "426", { name: "Experiential Design" }),
  createCourse("VISC", "440", { name: "Bookmaking" }),
  createCourse("VISC", "520", { name: "Designing for Change" }),
  createCourse("VISC", "710"),
  createCourse("VISC", "740"),
  // BDS
  createCourse("BDS", "101", { name: "Design Thinking and Making", sections: 4 }),
  createCourse("BDS", "103", { name: "Drawing for Design" }),
];
