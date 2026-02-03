// Controlled Vocabularies for Dublin Core Metadata
// These standardize values across the collection for consistency and searchability

import type { DesignerRole, ResourceType, SourceLocation } from "./types";

// === DCMI Type Vocabulary ===
// Based on Dublin Core Metadata Initiative Type Vocabulary
export const RESOURCE_TYPES: readonly ResourceType[] = [
  "Image",      // A visual representation (the poster itself)
  "Event",      // A non-persistent, time-based occurrence (the lecture)
  "Text",       // Related text materials
  "Collection"  // An aggregation of resources
] as const;

// === Poster Designer Roles ===
export const DESIGNER_ROLES: readonly DesignerRole[] = [
  "Student",       // KU design student
  "Faculty",       // KU faculty member
  "Staff",         // KU staff
  "Professional",  // External professional designer
  "Speaker",       // The speaker designed their own poster
  "Collaboration", // Multiple designers working together
  "Unknown"        // Role not yet determined
] as const;

// === Source Locations ===
// Where the physical or digital poster originated
export const SOURCE_LOCATIONS: readonly SourceLocation[] = [
  "Barry's Flat File",     // Barry Fitzgerald's personal collection
  "University Archives",   // Kenneth Spencer Research Library
  "Department Collection", // School of Architecture & Design
  "Private Collection",    // Other private collectors
  "Digital Scan",          // Born-digital or direct scan source
  "Unknown"                // Source not yet determined
] as const;

// === Rights Statements ===
export const RIGHTS_STATEMENTS = [
  "Courtesy of KU Design Department",
  "Courtesy of the artist",
  "Public Domain",
  "All Rights Reserved",
  "Educational Use Only",
  "Creative Commons Attribution (CC BY)",
  "Creative Commons Attribution-NonCommercial (CC BY-NC)"
] as const;

export type RightsStatement = typeof RIGHTS_STATEMENTS[number];

// === Standard Publisher ===
export const DEFAULT_PUBLISHER = "University of Kansas School of Architecture & Design";

// === Language Codes (ISO 639-1) ===
export const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "es", label: "Spanish" },
  { code: "fr", label: "French" },
  { code: "de", label: "German" }
] as const;

export const DEFAULT_LANGUAGE = "en";

// === Coverage/Location ===
export const DEFAULT_COVERAGE = "Lawrence, Kansas, USA";

// === Disciplines ===
// Primary disciplines for categorizing speakers
export const DISCIPLINES = [
  "Graphic Design",
  "Illustration",
  "Photography",
  "Typography",
  "Advertising",
  "Editorial Design",
  "Book Design",
  "Packaging Design",
  "Brand Identity",
  "Environmental Design",
  "Motion Graphics",
  "Digital Design",
  "Fine Art",
  "Architecture",
  "Industrial Design",
  "Writing",
  "Education",
  "Curatorial",
  "Multi-disciplinary"
] as const;

export type Discipline = typeof DISCIPLINES[number];

// === Poster Formats (MIME types) ===
export const POSTER_FORMATS = [
  "image/webp",
  "image/jpeg",
  "image/png",
  "image/tiff"
] as const;

// === Poster Mediums ===
// Physical production method of the original poster
export const POSTER_MEDIUMS = [
  "Offset lithograph",
  "Screen print",
  "Digital print",
  "Letterpress",
  "Risograph",
  "Mixed media",
  "Unknown"
] as const;

export type PosterMedium = typeof POSTER_MEDIUMS[number];
