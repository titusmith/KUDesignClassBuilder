import type { Room } from "./schedulerTypes";

function createRoom(
  code: string,
  building: string,
  capacity: number,
  category: Room["category"]
): Room {
  return {
    id: `room-${code.replace(/\s+/g, "-").toLowerCase()}`,
    code,
    building,
    capacity,
    category,
  };
}

export const roomInventory: Room[] = [
  // Large (60+)
  createRoom("WES 3140", "WES", 272, "large"),
  createRoom("SUM 427", "SUM", 146, "large"),
  createRoom("MAR 216B", "MAR", 121, "large"),
  createRoom("LEEP2 G411", "LEEP2", 120, "large"),
  createRoom("KS-ST LAWR", "KS-ST", 60, "large"),
  // Studio/Lab (25–48)
  createRoom("CHAL 315", "CHAL", 48, "studio"),
  createRoom("CHAL 322", "CHAL", 45, "studio"),
  createRoom("SNOW 120", "SNOW", 40, "studio"),
  createRoom("MAR 216A", "MAR", 30, "studio"),
  createRoom("MAR 305", "MAR", 30, "studio"),
  createRoom("CHAL 313", "CHAL", 30, "studio"),
  createRoom("CHAL 316", "CHAL", 30, "studio"),
  createRoom("CHAL 317", "CHAL", 30, "studio"),
  createRoom("CHAL 350", "CHAL", 30, "studio"),
  createRoom("CHAL 321", "CHAL", 25, "studio"),
  createRoom("CHAL 324", "CHAL", 25, "studio"),
  // Small/Specialized (10–24)
  createRoom("CHAL 307", "CHAL", 24, "small"),
  createRoom("CHAL 308", "CHAL", 24, "small"),
  createRoom("CHAL 312", "CHAL", 24, "small"),
  createRoom("CHAL 340", "CHAL", 24, "small"),
  createRoom("CHAL 200A", "CHAL", 20, "small"),
  createRoom("CHAL 200C", "CHAL", 20, "small"),
  createRoom("CHAL 507", "CHAL", 20, "small"),
  createRoom("CHAL 511", "CHAL", 20, "small"),
  createRoom("CDR 150", "CDR", 20, "small"),
  createRoom("CHAL 509", "CHAL", 16, "small"),
  createRoom("WES 1016", "WES", 10, "small"),
];
