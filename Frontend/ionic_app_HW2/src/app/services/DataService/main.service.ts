import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import{ map} from 'rxjs/operators';
import { Login } from 'src/app/models/Login';
import { SignUp } from 'src/app/models/sign-up';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  private notificationSubject = new Subject<string>();
  public notification$ = this.notificationSubject.asObservable()
  
  

  //linking to backend
  apiUrl = 'https://localhost:49991/api/'

  httpOptions ={
    headers: new HttpHeaders({
      ContentType: 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }
  
  signUp(signUpData: SignUp): Observable<any> {
    // Send a POST request to the sign-up endpoint with the sign-up data
    return this.httpClient.post(`${this.apiUrl}xxx/SignUp`, signUpData,{responseType: 'text'}).pipe(
      map((response: string) =>{
        return response;
      })
    );
  }

  async login(credentials: { username: string; password: string }) {
    const url = `${this.apiUrl}xxx/xxx`;

    // Send a POST request to your server with the user's credentials
    return this.httpClient.post<any>(url, credentials).toPromise();
  }


//login user
LoginUser(loginUser: Login){
    let user = new UserCredentials
    return this.httpClient.post<User>(`${this.apiUrl}xxx/Login`, loginUser, this.httpOptions)
  }
}

//user credentials class
class UserCredentials{
    EmailAddress:string = 'Addyouremailaddresshere';
    Password:string = 'Addyourpasswordhere'
  }
  