import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AppHeader } from '@core/components/app-header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, AppHeader],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
