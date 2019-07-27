import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  showMenu: boolean = false;
  public screenHeight: any;
  public screenWidth: any;
  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    if (this.screenWidth >= 560) {
      this.showMenu = true;
    }
  }

  constructor() {
    this.onResize();
  }

  ngOnInit() {}

  toggleMenu() {
    console.log('check');
    this.showMenu ? (this.showMenu = false) : (this.showMenu = true);
  }
}
