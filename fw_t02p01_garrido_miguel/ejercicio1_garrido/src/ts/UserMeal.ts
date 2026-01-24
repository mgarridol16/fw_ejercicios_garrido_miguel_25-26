console.log("Interfaz UserMeal");

enum Status {
  QUIERO_HACERLA,
  LA_HE_HECHO,
}

interface UserMeal {
  userId: number;
  mealID: number; //*id debe coincidir exactamente con el idMeal de la API
  saveDate: Date;
  status: Status;
  notes?: string;
  rating?: number;
}
