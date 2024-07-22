import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { MainService } from '../services/DataService/main.service';
import { SignUp } from '../models/sign-up';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signUpForm!: FormGroup;
  showSuccessMessage = false;
  showErrorMessage = false;
  signUpData: SignUp = new SignUp();
  eyeIcon: string = "fa-eye-slash";
  type: string = 'password';
  isText: boolean = false;



  constructor(private formBuilder: FormBuilder, 
    private mainService: MainService,
    private alertController: AlertController,
    private router: Router) { 
      this.signUpForm = this.formBuilder.group({
        username: ['', Validators.required],
        email_address: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
      });
    }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

    hideShowPass(){
      this.isText = !this.isText;
      this.isText ? this.eyeIcon = 'fa-eye' : this.eyeIcon = 'fa-eye-slash'
      this.isText ? this.type = 'text' : this.type = 'password'
    }


    signUpUser():void{
      // console.log('Request Data', this.signUpData)
      // this.mainService.signUp(this.signUpData).subscribe(
      //   response => {
      //     // Handle success
      //     this.presentSuccessAlert('Sign-Up successful!');
      //     this.router.navigate(['/login']);
          
      //     console.log('Sign-up successful:', response);
      //     // You can show a success message or navigate to a different page
      //   },
      //   (error) => {
      //     // Handle error
      //     this.presentErrorAlert('Email does not exist');
      //     console.error('Sign-up error:', error);
      //     // You can display an error message to the user
      //   }
      // );
    }
  

  resetMessage(){
    this.showSuccessMessage = false;
    this.showErrorMessage = false;
  }

  //if sign up was successful
  async presentSuccessAlert(message: string) {

    this.showSuccessMessage = true;
    const alert = await this.alertController.create({
      header: 'Success',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  //if the email does not exist
  async presentErrorAlert(message: string) {

    this.showErrorMessage = true;
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK'],
      
    });

    await alert.present();
  }
}