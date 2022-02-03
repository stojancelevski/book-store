import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuController, ModalController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FirebaseService } from '../firebase.service';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;

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
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get loginFormControls() {
    return this.registerForm.controls;
  }

  register() {
    this.authService.signUp(this.loginFormControls.email.value, this.loginFormControls.password.value).then(val => {
      this.registerForm.reset();
      this.menuCtrl.enable(true);
      this.router.navigate(['/login'], {replaceUrl: true});
      this.toastService.presentToast('Succesfully, please log in!');
    }, err => {
      this.toastService.presentToast('Please enter a valid email and password');
    });
  }
}
