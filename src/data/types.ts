// Core data types for the Symposium Legacy Project
// Aligned with Dublin Core Metadata Element Set (DCMES)

export interface Memory {
  id: string;
  author: string;
  date: string;
  content: string;
}

export interface RelatedResource {
  type: string;       // e.g., "semester", "series", "exhibition"
  label: string;      // e.g., "Fall 1984 Overview"
  url?: string;       // Optional link
}

export interface Speaker {
  // === EXISTING FIELDS (mapped to Dublin Core) ===
  id: string;                    // DC: Identifier
  name: string;                  // DC: Contributor (speaker/presenter)
  aliases?: string[];            // Alternative names for search (e.g., co-presenters)
  date: string;                  // DC: Date (display format, e.g., "December 3, 1984")
  semester: string;              // Derived from date
  year: number;                  // Derived from date
  discipline: string;            // DC: Subject (primary discipline - kept for backward compatibility)
  disciplines?: string[];        // DC: Subject (all disciplines - supports multi-discipline speakers)
  title: string;                 // Speaker's professional title
  bio: string;                   // DC: Description
  posterUrl: string;             // URL to poster image
  detailPosterUrl?: string;      // High-res version for zoom/detail views
  posterWidth?: number;          // Width in inches - DC: Format (partial)
  posterHeight?: number;         // Height in inches - DC: Format (partial)
  tags: string[];                // DC: Subject (additional keywords)
  memories: Memory[];
  communityTags: string[];

  // === DUBLIN CORE METADATA FIELDS ===

  // DC: Title - The lecture/event title (distinct from speaker name)
  lectureTitle?: string;         // e.g., "Visions of an Illustrator"

  // DC: Creator - The poster designer(s)
  posterDesigner?: string;       // e.g., "Barry Fitzgerald"
  posterDesignerRole?: DesignerRole; // e.g., "Student", "Faculty"

  // DC: Date - Standardized ISO 8601 format
  dateISO?: string;              // e.g., "1984-12-03"

  // DC: Type - DCMI Type Vocabulary
  resourceType?: ResourceType[]; // e.g., ["Image", "Event"]

  // DC: Format - MIME type and physical dimensions
  posterFormat?: string;         // e.g., "image/webp"
  posterMedium?: string;         // e.g., "offset lithograph", "digital print"

  // DC: Source - Provenance tracking
  source?: string;               // e.g., "Barry's Flat File", "University Archives"
  sourceNotes?: string;          // Additional provenance notes

  // DC: Rights - Copyright and usage information
  rights?: string;               // e.g., "Courtesy of KU Design Department"
  rightsHolder?: string;         // e.g., "University of Kansas"

  // DC: Relation - Links to related resources
  relatedResources?: RelatedResource[];

  // DC: Publisher
  publisher?: string;            // e.g., "University of Kansas School of Architecture & Design"

  // DC: Language
  language?: string;             // e.g., "en"

  // DC: Coverage - Geographic/temporal scope
  coverage?: string;             // e.g., "Lawrence, Kansas"
}

// Type aliases for controlled vocabularies
export type DesignerRole = 
  | "Student"
  | "Faculty"
  | "Staff"
  | "Professional"
  | "Speaker"
  | "Collaboration"
  | "Unknown";

export type ResourceType = 
  | "Image"
  | "Event"
  | "Text"
  | "Collection";

export type SourceLocation =
  | "Barry's Flat File"
  | "University Archives"
  | "Department Collection"
  | "Private Collection"
  | "Digital Scan"
  | "Unknown";
