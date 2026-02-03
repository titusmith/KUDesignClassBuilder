import type { Faculty } from "./schedulerTypes";

function getLastName(name: string): string {
  const parts = name.trim().split(/\s+/);
  return parts[parts.length - 1] ?? "";
}

function sortInstructorsByLastName(instructors: Faculty[]): Faculty[] {
  return [...instructors].sort((a, b) =>
    getLastName(a.name).localeCompare(getLastName(b.name))
  );
}

// maxWorkload: 3 = most faculty, 2 = some faculty (customize as needed)
const facultyRosterRaw: Faculty[] = [
  { id: "fac-1", name: "Matthew Cook", maxWorkload: 3 },
  { id: "fac-2", name: "Prakash Shukla", maxWorkload: 3 },
  { id: "fac-3", name: "Bona Bones", maxWorkload: 3 },
  { id: "fac-4", name: "Betsy Barnhart", maxWorkload: 3 },
  { id: "fac-5", name: "Andrea Herstowski", maxWorkload: 3 },
  { id: "fac-6", name: "Tim Hossler", maxWorkload: 3 },
  { id: "fac-7", name: "Tom Huang", maxWorkload: 3 },
  { id: "fac-8", name: "Hannah Park", maxWorkload: 3 },
  { id: "fac-9", name: "May Tveit", maxWorkload: 3 },
  { id: "fac-10", name: "Michael Eckersley", maxWorkload: 3 },
  { id: "fac-11", name: "Barry Fitzgerald", maxWorkload: 3 },
  { id: "fac-12", name: "Lance Rake", maxWorkload: 3 },
  { id: "fac-13", name: "Jeremy Shellhorn", maxWorkload: 3 },
  { id: "fac-14", name: "Greg Thomas", maxWorkload: 3 },
  { id: "fac-15", name: "Alex Anderson", maxWorkload: 3 },
  { id: "fac-16", name: "Kent Smith", maxWorkload: 3 },
  { id: "fac-17", name: "Ann Alcasabas", maxWorkload: 3 },
  { id: "fac-18", name: "David Starr", maxWorkload: 3 },
  { id: "fac-19", name: "Sam Yates Meier", maxWorkload: 3 },
  { id: "fac-20", name: "Titus Smith", maxWorkload: 3 },
  { id: "fac-21", name: "Linda Talleur", maxWorkload: 3 },
  { id: "fac-22", name: "Haylee Hedge", maxWorkload: 3 },
  { id: "fac-23", name: "Matthew Lord", maxWorkload: 3 },
  { id: "fac-24", name: "Matt Kirkland", maxWorkload: 3 },
  { id: "fac-25", name: "Stephen Hassard", maxWorkload: 3 },
  { id: "fac-26", name: "Emily Bryson", maxWorkload: 3 },
  { id: "fac-27", name: "Sean Stumpf", maxWorkload: 3 },
  { id: "fac-28", name: "Stephen Johnson", maxWorkload: 3 },
];

/** Instructors sorted alphabetically by last name, displayed as "First Last" */
export const facultyRoster: Faculty[] = sortInstructorsByLastName(facultyRosterRaw);
