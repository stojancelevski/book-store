import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{

  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Map', url: '/map', icon: 'map' },
    { title: 'Favorites', url: '/favourites', icon: 'heart' },
    { title: 'Logout', url: '/login', icon: 'log-out' },
  ];
  constructor(private storage: Storage, private router: Router, private menu: MenuController) {}

  pages(page) {
    if (page === 'Logout') {
      this.storage.set('loggedUser', 0);
      this.router.navigate(['/login'], {replaceUrl: true});
      this.menu.enable(false);
    }
  }

  async ngOnInit() {
    await this.storage.create();
    this.storage.get('loggedUser').then(val => {
      if (val === null || val === 0) {
        this.router.navigateByUrl('/login', {replaceUrl: true});
      } else {
        this.router.navigateByUrl('/home', {replaceUrl: true});
        this.menu.enable(true);
      }
    });
  }
}
