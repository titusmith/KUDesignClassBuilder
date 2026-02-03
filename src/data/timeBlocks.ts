import type { TimeBlock } from "./schedulerTypes";

export const timeBlocks: TimeBlock[] = [
  // M/W Blocks
  { id: "tb-mw-1", dayPattern: "MW", start: "9:00", end: "11:50", label: "M/W 9:00–11:50" },
  { id: "tb-mw-2", dayPattern: "MW", start: "12:00", end: "2:50", label: "M/W 12:00–2:50" },
  { id: "tb-mw-3", dayPattern: "MW", start: "3:30", end: "5:50", label: "M/W 3:30–5:50" },
  // T/Th Blocks
  { id: "tb-tth-1", dayPattern: "TTh", start: "9:30", end: "12:15", label: "T/Th 9:30–12:15" },
  { id: "tb-tth-2", dayPattern: "TTh", start: "12:30", end: "3:15", label: "T/Th 12:30–3:15" },
  { id: "tb-tth-3", dayPattern: "TTh", start: "3:30", end: "5:45", label: "T/Th 3:30–5:45" },
  // Evening
  { id: "tb-eve-1", dayPattern: "Evening", start: "6:00", end: "8:00", label: "Evening 6:00 PM" },
];
