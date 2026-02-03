// Dublin Core Metadata Helpers
// Utilities for generating, validating, and exporting Dublin Core records

import type { Speaker, ResourceType } from "./types";
import { DEFAULT_PUBLISHER, DEFAULT_LANGUAGE, DEFAULT_COVERAGE } from "./vocabularies";

/**
 * Generate a standardized identifier for a speaker/poster
 * Format: sp_YYYY_semester_lastname
 */
export function generateIdentifier(
  year: number,
  semester: string,
  name: string,
  index?: number
): string {
  const lastName = name.split(" ").pop()?.toLowerCase().replace(/[^a-z]/g, "") || "unknown";
  const sem = semester.toLowerCase().slice(0, 2); // "fa", "sp", "su"
  const suffix = index !== undefined ? `_${index}` : "";
  return `sp_${year}_${sem}_${lastName}${suffix}`;
}

/**
 * Validate ISO 8601 date format (YYYY-MM-DD)
 */
export function isValidISODate(date: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
  const parsed = new Date(date);
  return !isNaN(parsed.getTime());
}

/**
 * Convert display date to ISO format
 * e.g., "December 3, 1984" → "1984-12-03"
 */
export function parseDisplayDateToISO(displayDate: string): string | null {
  const months: Record<string, string> = {
    january: "01", february: "02", march: "03", april: "04",
    may: "05", june: "06", july: "07", august: "08",
    september: "09", october: "10", november: "11", december: "12"
  };

  // Try "Month Day, Year" format
  const match = displayDate.match(/(\w+)\s+(\d{1,2}),?\s+(\d{4})/i);
  if (match) {
    const month = months[match[1].toLowerCase()];
    const day = match[2].padStart(2, "0");
    const year = match[3];
    if (month) return `${year}-${month}-${day}`;
  }

  // Try "Season Year" format (return first of semester)
  const seasonMatch = displayDate.match(/(spring|fall|summer|winter)\s+(\d{4})/i);
  if (seasonMatch) {
    const season = seasonMatch[1].toLowerCase();
    const year = seasonMatch[2];
    const seasonMonths: Record<string, string> = {
      spring: "03", fall: "09", summer: "06", winter: "01"
    };
    return `${year}-${seasonMonths[season]}-01`;
  }

  return null;
}

/**
 * Dublin Core Record in simple key-value format
 * Suitable for JSON export or display
 */
export interface DublinCoreRecord {
  "dc:title": string;
  "dc:creator": string;
  "dc:subject": string[];
  "dc:description": string;
  "dc:publisher": string;
  "dc:contributor": string;
  "dc:date": string;
  "dc:type": ResourceType[];
  "dc:format": string;
  "dc:identifier": string;
  "dc:source"?: string;
  "dc:language": string;
  "dc:relation"?: string[];
  "dc:coverage": string;
  "dc:rights"?: string;
}

/**
 * Convert a Speaker record to Dublin Core format
 */
export function toDublinCoreRecord(speaker: Speaker): DublinCoreRecord {
  const subjects = [
    speaker.discipline,
    ...speaker.tags,
    ...speaker.communityTags
  ].filter(Boolean);

  const format = speaker.posterWidth && speaker.posterHeight
    ? `${speaker.posterWidth}" × ${speaker.posterHeight}" (${speaker.posterFormat || "image/webp"})`
    : speaker.posterFormat || "image/webp";

  const relations = speaker.relatedResources?.map(
    r => `${r.type}: ${r.label}${r.url ? ` (${r.url})` : ""}`
  );

  return {
    "dc:title": speaker.lectureTitle || `${speaker.name} Lecture`,
    "dc:creator": speaker.posterDesigner || "Unknown",
    "dc:subject": subjects,
    "dc:description": speaker.bio,
    "dc:publisher": speaker.publisher || DEFAULT_PUBLISHER,
    "dc:contributor": speaker.name,
    "dc:date": speaker.dateISO || speaker.date,
    "dc:type": speaker.resourceType || ["Image", "Event"],
    "dc:format": format,
    "dc:identifier": speaker.id,
    "dc:source": speaker.source,
    "dc:language": speaker.language || DEFAULT_LANGUAGE,
    "dc:relation": relations,
    "dc:coverage": speaker.coverage || DEFAULT_COVERAGE,
    "dc:rights": speaker.rights
  };
}

/**
 * Export collection to Dublin Core JSON-LD format
 * Suitable for interoperability with digital humanities tools
 */
export function toJSONLD(speaker: Speaker): object {
  const dc = toDublinCoreRecord(speaker);
  return {
    "@context": {
      "dc": "http://purl.org/dc/elements/1.1/",
      "dcterms": "http://purl.org/dc/terms/"
    },
    "@type": "CreativeWork",
    ...dc
  };
}

/**
 * Generate a CSV row for bulk data export
 */
export function toCSVRow(speaker: Speaker): string[] {
  return [
    speaker.id,
    speaker.name,
    speaker.lectureTitle || "",
    speaker.posterDesigner || "",
    speaker.posterDesignerRole || "",
    speaker.dateISO || speaker.date,
    speaker.discipline,
    speaker.tags.join("; "),
    speaker.source || "",
    speaker.rights || "",
    speaker.posterWidth?.toString() || "",
    speaker.posterHeight?.toString() || ""
  ];
}

/**
 * CSV header row for export
 */
export const CSV_HEADERS = [
  "Identifier",
  "Contributor (Speaker)",
  "Title (Lecture)",
  "Creator (Designer)",
  "Designer Role",
  "Date",
  "Discipline",
  "Subjects/Tags",
  "Source",
  "Rights",
  "Width (in)",
  "Height (in)"
];

/**
 * Core Dublin Core fields (research-dependent, primary tracking)
 */
export const CORE_DC_FIELDS = [
  { key: "lectureTitle", label: "Lecture Title", dc: "dc:title" },
  { key: "posterDesigner", label: "Poster Designer", dc: "dc:creator" },
  { key: "posterDesignerRole", label: "Designer Role", dc: "dc:creator (role)" },
  { key: "dateISO", label: "ISO Date", dc: "dc:date" },
  { key: "source", label: "Source", dc: "dc:source" },
  { key: "rights", label: "Rights", dc: "dc:rights" }
] as const;

/**
 * Extended Dublin Core fields (often defaulted or less critical)
 */
export const EXTENDED_DC_FIELDS = [
  { key: "posterFormat", label: "Poster Format", dc: "dc:format" },
  { key: "posterMedium", label: "Poster Medium", dc: "dc:format (medium)" },
  { key: "resourceType", label: "Resource Type", dc: "dc:type" },
  { key: "publisher", label: "Publisher", dc: "dc:publisher" },
  { key: "language", label: "Language", dc: "dc:language" },
  { key: "coverage", label: "Coverage", dc: "dc:coverage" },
  { key: "relatedResources", label: "Related Resources", dc: "dc:relation" },
  { key: "posterWidth", label: "Poster Width", dc: "dc:format (dimensions)" },
  { key: "posterHeight", label: "Poster Height", dc: "dc:format (dimensions)" }
] as const;

/**
 * Get completion status for Dublin Core metadata
 * Returns percentage of fields filled for core and extended fields
 */
export function getMetadataCompleteness(speaker: Speaker): {
  percentage: number;
  missing: string[];
  corePercentage: number;
  coreMissing: string[];
  extendedPercentage: number;
  extendedMissing: string[];
} {
  const checkFields = (fields: readonly { key: string; label: string; dc: string }[]) => {
    const missing: string[] = [];
    let filled = 0;

    for (const field of fields) {
      const value = speaker[field.key as keyof Speaker];
      // Check for truthy value, non-empty arrays, and non-Unknown strings
      const hasValue = Array.isArray(value) 
        ? value.length > 0 
        : value && value !== "Unknown";
      
      if (hasValue) {
        filled++;
      } else {
        missing.push(field.label);
      }
    }

    return {
      percentage: Math.round((filled / fields.length) * 100),
      missing
    };
  };

  const coreResult = checkFields(CORE_DC_FIELDS);
  const extendedResult = checkFields(EXTENDED_DC_FIELDS);

  // Overall percentage is weighted: core fields count more
  const totalFields = CORE_DC_FIELDS.length + EXTENDED_DC_FIELDS.length;
  const coreWeight = CORE_DC_FIELDS.length / totalFields;
  const extendedWeight = EXTENDED_DC_FIELDS.length / totalFields;
  const overallPercentage = Math.round(
    coreResult.percentage * coreWeight + extendedResult.percentage * extendedWeight
  );

  return {
    percentage: overallPercentage,
    missing: [...coreResult.missing, ...extendedResult.missing],
    corePercentage: coreResult.percentage,
    coreMissing: coreResult.missing,
    extendedPercentage: extendedResult.percentage,
    extendedMissing: extendedResult.missing
  };
}

/**
 * Get collection-wide metadata statistics
 */
export function getCollectionStats(speakers: Speaker[]): {
  totalPosters: number;
  withDesigner: number;
  withSource: number;
  withRights: number;
  averageCompleteness: number;
} {
  const stats = {
    totalPosters: speakers.length,
    withDesigner: 0,
    withSource: 0,
    withRights: 0,
    averageCompleteness: 0
  };

  let totalCompleteness = 0;

  for (const speaker of speakers) {
    if (speaker.posterDesigner && speaker.posterDesigner !== "Unknown") {
      stats.withDesigner++;
    }
    if (speaker.source) {
      stats.withSource++;
    }
    if (speaker.rights) {
      stats.withRights++;
    }
    totalCompleteness += getMetadataCompleteness(speaker).percentage;
  }

  stats.averageCompleteness = Math.round(totalCompleteness / speakers.length);

  return stats;
}
