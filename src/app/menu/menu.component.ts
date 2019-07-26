import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  showMenu: boolean = false;
  constructor() {}

  ngOnInit() {}

  toggleMenu() {
    console.log('check');
    this.showMenu ? (this.showMenu = false) : (this.showMenu = true);
  }
}
