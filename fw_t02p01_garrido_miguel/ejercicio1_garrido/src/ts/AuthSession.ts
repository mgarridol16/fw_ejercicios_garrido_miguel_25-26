console.log("Clase Auth Session");

class AuthSession {
  private userId: number;
  private name: string;
  private loginDate: Date;
  private cerrarSesion: boolean;

  constructor(
    userId: number,
    name: string,
    loginDate: Date,
    cerrarSesion: boolean,
  ) {
    this.userId = userId;
    this.name = name;
    this.loginDate = loginDate;
    this.cerrarSesion = cerrarSesion;
  }
}
