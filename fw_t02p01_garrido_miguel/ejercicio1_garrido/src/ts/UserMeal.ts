console.log("Interfaz UserMeal");

enum Status {
  QUIERO_HACERLA = "QUIERO_HACERLA",
  LA_HE_HECHO = "LA_HE_HECHO",
}

export interface UserMeal {
  userId: number;
  idMeal: number; //*id debe coincidir exactamente con el idMeal de la API
  saveDate: string;
  status: Status;
  notes?: string;
  rating?: number;
}
