import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { MatDialog } from '@angular/material/dialog';
import { LoginHelpComponent } from './login-help/login-help.component';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from '../helpers/validationform';
import { HttpErrorResponse } from '@angular/common/http';
import { MainService } from '../services/DataService/main.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
   //variables needed
   username: string = '';
   password: string = '';
   visablePassword: boolean = false;
   hide = false;
   isLoading:boolean = false

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private mainService: MainService,
    private toast: NgToastService,
    private userStore: UserStoreService,
    private dialog: MatDialog 
  ) {}


    //login form 
    loginForm: FormGroup = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })

  ngOnInit() { }

  //password visibility
  PasswordVisibility(){
    this.visablePassword = !this.visablePassword;
  }

  // LoginUser() {
  //   if (this.loginForm.valid) {
  //     console.log(this.loginForm.value);
  //     this.auth.signIn(this.loginForm.value).subscribe({
  //       next: (res) => {
  //         console.log(res.message);
  //         this.loginForm.reset();
  //         this.auth.storeToken(res.accessToken);
  //         this.auth.storeRefreshToken(res.refreshToken);
  //         const tokenPayload = this.auth.decodedToken();
  //         this.userStore.setFullNameForStore(tokenPayload.name);
  //         this.userStore.setRoleForStore(tokenPayload.role);
  //         this.toast.success({detail:"SUCCESS", summary:res.message, duration: 5000});
  //         this.router.navigate(['tabs1'])
  //       },
  //       error: (err) => {
  //         this.toast.error({detail:"ERROR", summary:"Something when wrong, please sign up", duration: 5000});
  //         console.log(err);
  //       },
  //     });
  //   } else {
  //     ValidateForm.validateAllFormFields(this.loginForm);
  //   }
  // }
  
  LoginUser() {
    if (this.loginForm.valid) {
      this.isLoading = true;

      this.mainService.LoginUser(this.loginForm.value).subscribe(result => {
        localStorage.setItem('User', JSON.stringify(result));
        console.log('User added');
        this.loginForm.reset();
        this.router.navigate(['./home']).then((navigated: boolean) => {
          if (navigated) {
            this.toast.success({detail:"SUCCESS", duration: 5000});
          }
        });
      }, (response: HttpErrorResponse) => {
        this.isLoading = false;
        if (response.status === 404 || response.status === 500) {
          this.toast.error({detail:"ERROR", summary:"Something went wrong, please sign up", duration: 5000});
        }
      });
    }

    console.log(this.loginForm.valid);
  }

  // Alternative login method
  async login() {
    try {
      const loginData = {
        username: this.username,
        password: this.password,
      };

      // Send a POST request to your server to authenticate the user
      const response = await this.mainService.login(loginData);
      console.log('Login response:', response);

      // Assuming your server returns an access token
      const accessToken = response;

      if (response.accessToken) {
        // Successful login
        localStorage.setItem('access_token', response.accessToken);
        this.router.navigate(['/tabs1']);
        this.toast.success({detail:"SUCCESS", summary:"Login successful", duration: 5000});
      } else {
        // Handle specific error messages from the API
          this.toast.error({detail:"ERROR", summary:"Username or password is incorrect. Please try again.", duration: 5000});
      }
    } catch (error) {
      // Handle other unexpected errors
      console.error('Login error:', error);
      this.toast.error({detail:"ERROR", summary:"Username or password is incorrect. Please try again.", duration: 5000});
    }
  }
  
  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }

  openHelpModal(field: string): void {
    const dialogRef = this.dialog.open(LoginHelpComponent, {
      width: '500px',
      data: { field } 
    });
  
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
