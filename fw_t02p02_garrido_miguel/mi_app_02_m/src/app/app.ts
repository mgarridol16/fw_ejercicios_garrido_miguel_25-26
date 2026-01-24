import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('mi_app_02_m');
  public isServerRunning = false;
  public characters = [
    { id: 0, name: 'Miguel' },
    { id: 1, name: 'Angel' },
    { id: 2, name: 'Phoebe' },
    { id: 3, name: 'Ross' },
    { id: 4, name: 'Chandler' },
    { id: 5, name: 'Joey' },
  ];
}
