// Core data types for Fall 2026 KU Design Class Scheduler

export type DayPattern = "MW" | "TTh" | "Evening";

export interface TimeBlock {
  id: string;
  dayPattern: DayPattern;
  start: string;
  end: string;
  label: string;
}

export type RoomCategory = "large" | "studio" | "small";

export interface Room {
  id: string;
  code: string;
  building: string;
  capacity: number;
  category: RoomCategory;
}

export interface Faculty {
  id: string;
  name: string;
  email?: string;
  /** Workload requirement: courses they need to teach (2 or 3, default 3) */
  maxWorkload?: number;
}

export interface Course {
  id: string;
  code: string; // e.g., "ADS 320", "ILLU 205"
  prefix: string; // e.g., "ADS", "ILLU"
  number: string; // e.g., "320", "205"
  name?: string;
  instructorId?: string;
  isApptOrOnline?: boolean; // APPT/Online-only sections
  /** Number of sections (default 1) - e.g. BDS 101 has 4 sections */
  sections?: number;
}

export interface ScheduleAssignment {
  id: string;
  courseId: string;
  roomId: string;
  timeBlockId: string;
  instructorId: string;
  linkedRoomId?: string; // for shadow tiles
  isShadow?: boolean; // true if this is a paired-room shadow
}

export type ConflictType = "room" | "time" | "both" | "instructor";

export interface Conflict {
  type: ConflictType;
  room: Room;
  timeBlock: TimeBlock;
  existingAssignment?: ScheduleAssignment;
  existingCourse?: Course;
  existingInstructor?: Faculty;
  proposedCourse: Course;
  proposedInstructor?: Faculty;
  /** When instructor conflict from a move, ID of the assignment being moved */
  movingAssignmentId?: string;
}
