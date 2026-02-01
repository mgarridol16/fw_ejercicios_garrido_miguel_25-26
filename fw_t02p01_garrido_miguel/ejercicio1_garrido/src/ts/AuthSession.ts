console.log("Clase Auth Session");

export class AuthSession {
  private userId: number;
  private name: string;
  private loginDate: string;
  private cerrarSesion: boolean;

  constructor(
    userId: number,
    name: string,
    loginDate: string,
    cerrarSesion: boolean,
  ) {
    this.userId = userId;
    this.name = name;
    this.loginDate = loginDate;
    this.cerrarSesion = cerrarSesion;
  }
}
