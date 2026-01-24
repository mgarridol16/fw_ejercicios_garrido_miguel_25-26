console.log("Interfaz Usuario")

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  favoriteCategory?: string
}
