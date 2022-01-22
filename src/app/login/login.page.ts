import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuController, ModalController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastService } from '../toast.service';
import { FirebaseService } from '../firebase.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private menuCtrl: MenuController,
              private storage: Storage,
              private authService: AuthService,
              private router: Router,
              private navCtrl: NavController,
              private modalController: ModalController,
              private fireService: FirebaseService,
              private toastService: ToastService) {
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
      this.loginForm.reset();
      this.menuCtrl.enable(true);
      this.router.navigate(['/home'], {replaceUrl: true});
      this.toastService.presentToast('Welcome back');
      this.storage.set('loggedUser', val.user.multiFactor.user.uid);
    }, err => {
      this.toastService.presentToast('Please enter a valid email and password');
    });
  }
}
