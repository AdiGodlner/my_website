import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DesktopComponent } from './components/desktop/desktop.component';
import { IconComponent } from './components/icon/icon.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DesktopComponent, IconComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'last_human_coder';
}
