import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuController, ModalController, NavController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastService } from '../toast.service';
import { FirebaseService } from '../firebase.service';
import { Storage } from '@ionic/storage-angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  loginForm: FormGroup;
  subscription: Subscription;

  constructor(private fb: FormBuilder,
              private menuCtrl: MenuController,
              private storage: Storage,
              private authService: AuthService,
              private router: Router,
              private navCtrl: NavController,
              private modalController: ModalController,
              private fireService: FirebaseService,
              private platform: Platform,
              private toastService: ToastService) {
    this.subscription = this.platform.backButton.subscribe(() => {
      navigator['app'].exitApp();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.menuCtrl.enable(false);
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get loginFormControls() {
    return this.loginForm.controls;
  }

  login() {
    this.authService.signIn(this.loginFormControls.email.value, this.loginFormControls.password.value).then(val => {
      this.storage.set('loggedUserEmail', this.loginFormControls.email.value);
      this.loginForm.reset();
      this.menuCtrl.enable(true);
      this.router.navigate(['/home'], {replaceUrl: true});
      this.toastService.presentToast('Welcome!');
      this.storage.set('loggedUser', val.user.multiFactor.user.uid);
    }, err => {
      this.toastService.presentToast('Please enter a valid email and password');
    });
  }
}
