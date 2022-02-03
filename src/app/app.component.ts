import { Component, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { AlertController, IonRouterOutlet, MenuController, Platform, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  email: string;
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  @ViewChild(IonRouterOutlet, {static: false}) routerOutlet: IonRouterOutlet;

  public appPages = [
    {title: 'New Releases', url: '/home', icon: 'home'},
    {title: 'Search', url: '/search', icon: 'search'},
    {title: 'Map', url: '/map', icon: 'map'},
    {title: 'Favorites', url: '/favourites', icon: 'heart'},
    {title: 'Logout', url: '/login', icon: 'log-out'},
  ];

  constructor(private storage: Storage,
              private platform: Platform,
              private alert: AlertController,
              private router: Router,
              private menu: MenuController) {
    this.platform.backButton.subscribe(() => {
      if (this.router.url.includes('login')
        || this.router.url.includes('home')
        || this.router.url.includes('map')
        || this.router.url.includes('favourites')
        || this.router.url.includes('search')) {
        this.showAlert(this.router.url);
        // navigator['app'].exitApp();
      } else if (this.routerOutlet && this.routerOutlet.canGoBack()) {
        this.routerOutlet.pop();
      }
    });
  }

  async showAlert(url) {
    const alert = await this.alert.create({
      header: 'Exit',
      subHeader: 'Do you want to exit the app?',
      buttons: [{
        text: 'Yes',
        handler: () => {
          navigator['app'].exitApp();
        }
      }, {
        text: 'No',
        handler: () => {
          this.router.navigateByUrl(url);
          this.alert.dismiss();
        }
      }]
    });
    await alert.present();
  }

  async ngOnInit() {
    await this.storage.create();
    this.storage.get('loggedUserEmail').then(x => {
      this.email = x;
    });
    this.storage.get('loggedUser').then(val => {
      if (val === null || val === 0) {
        this.router.navigateByUrl('/login', {replaceUrl: true});
        this.menu.enable(false);
      } else {
        this.router.navigateByUrl('/home', {replaceUrl: true});
        this.menu.enable(true);
      }
    });
  }

  pages(page) {
    if (page === '/login') {
      this.storage.set('loggedUser', 0);
      this.storage.set('loggedUserEmail', '');
      this.router.navigate(['/login'], {replaceUrl: true});
      this.menu.enable(false);
    } else {
      this.router.navigate([page]);
    }
  }
}
