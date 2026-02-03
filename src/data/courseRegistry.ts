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
  createCourse("ADS", "320"),
  createCourse("ADS", "345"),
  createCourse("ADS", "346"),
  createCourse("ADS", "348"),
  createCourse("ADS", "531"),
  createCourse("ADS", "560"),
  createCourse("ADS", "580"),
  createCourse("ADS", "710"),
  createCourse("ADS", "740"),
  createCourse("ADS", "750"),
  createCourse("ADS", "765"),
  createCourse("ADS", "890"),
  createCourse("ADS", "861"),
  // ANIM
  createCourse("ANIM", "110"),
  createCourse("ANIM", "210"),
  createCourse("ANIM", "215"),
  createCourse("ANIM", "310"),
  createCourse("ANIM", "410"),
  createCourse("ANIM", "415"),
  // INDD
  createCourse("INDD", "101"),
  createCourse("INDD", "210"),
  createCourse("INDD", "214"),
  createCourse("INDD", "310"),
  createCourse("INDD", "315"),
  createCourse("INDD", "320"),
  createCourse("INDD", "378"),
  createCourse("INDD", "382"),
  createCourse("INDD", "430"),
  createCourse("INDD", "580"),
  // ILLU
  createCourse("ILLU", "110"),
  createCourse("ILLU", "205"),
  createCourse("ILLU", "215"),
  createCourse("ILLU", "310"),
  createCourse("ILLU", "320"),
  createCourse("ILLU", "330"),
  createCourse("ILLU", "410"),
  createCourse("ILLU", "455"),
  createCourse("ILLU", "510"),
  // IXD
  createCourse("IXD", "402"),
  createCourse("IXD", "404", { name: "Dataviz and Digital Storytelling" }),
  createCourse("IXD", "415"),
  createCourse("IXD", "432"),
  // VISC
  createCourse("VISC", "202"),
  createCourse("VISC", "204"),
  createCourse("VISC", "310"),
  createCourse("VISC", "405"),
  createCourse("VISC", "415"),
  createCourse("VISC", "426"),
  createCourse("VISC", "440"),
  createCourse("VISC", "520"),
  createCourse("VISC", "710"),
  createCourse("VISC", "740"),
  // BDS
  createCourse("BDS", "101", { sections: 4 }),
  createCourse("BDS", "103"),
];
