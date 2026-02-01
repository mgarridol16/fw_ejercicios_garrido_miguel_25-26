import { WeeklyPlanDay } from "./WeeklyPlanDay.js";

console.log("Interfaz WeeklyPlan");

export interface WeeklyPlan {
  id: string;
  userId: number;
  days: WeeklyPlanDay[];
}
