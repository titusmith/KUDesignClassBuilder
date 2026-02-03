// Maps room code to paired room codes (e.g., ILLU 205 uses 507/509, VISC 204 uses 307/315)
// Key: primary room code, Value: array of paired room codes
export const linkedRooms: Record<string, string[]> = {
  "CHAL 507": ["CHAL 509"],
  "CHAL 509": ["CHAL 507"],
  "CHAL 307": ["CHAL 315"],
  "CHAL 315": ["CHAL 307"],
};
