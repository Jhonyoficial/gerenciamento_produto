import { Component } from '@angular/core';
import {MatButtonModule} from  '@angular/material/button' ;
import {MatSidenavModule} from  '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatSidenavModule, MatButtonModule, MatToolbarModule, RouterOutlet, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent {
  opened = true;

  toggleSidenav() {
    this.opened = !this.opened;
  }

}
