import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { UserDto } from '../shared/dto/userDto.model';
import { UserLoginDto } from '../shared/dto/userLoginDto.model';
import { RegisterDto } from '../shared/dto/registerDto.model';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class AuthService {

  authenticatedChanged = new Subject<boolean>();
  authenticated = false;
  authenticatedSign = new Subject<boolean>();
  userName = new Subject<UserDto>();
  userNameDto: UserDto;
  pre: string;
  constructor(private http: HttpClient, private router: Router, private toastrService: ToastrService) {
    this.pre = environment.apiUrl;
  }


  authenticate() {

    const header = new HttpHeaders({});

    this.http.get(this.pre + '/api/user/user', {headers: header})
    .toPromise().then(response => {
      if (response && response['name']) {
          this.getUserDetail(response['name']);
          this.authenticated = true;
          this.authenticatedSign.next(true);
          this.authenticatedChanged.next(true);
      }
    },
    (error) => {
      this.authenticated = false;
      this.authenticatedChanged.next(false);
      this.authenticatedSign.next(false);
    });

  }

  getUserName() {
    return this.userNameDto;
  }

  async getUserDetail(email: string) {
    const header = new HttpHeaders({});
    this.userNameDto = await this.http
                    .get<UserDto>(this.pre + '/api/user/oneUser?email=' + email, {headers: header}).toPromise();
    this.userName.next(this.userNameDto);
  }

  async onLogout() {
    const header = new HttpHeaders({});
    this.authenticated = false;
    await this.http.post(this.pre + '/logout', {}, {headers: header}).toPromise();
    this.toastrService.warning('You have logged out!', '', {
      timeOut: 5000
    });
    this.authenticatedChanged.next(false);
    const emptyUser: UserDto = {
      id: null,
      fullName: null,
      role: null
    };
    this.userName.next(emptyUser);
    this.userNameDto = null;
    this.router.navigate(['/auth']);
  }

  onLogin(loginData: UserLoginDto): Observable<any> {
    const header = new HttpHeaders({});

    return this.http
      .post<any>(this.pre + '/api/user/login',
        {
          username: loginData.username,
          password: loginData.password
        },
        {headers: header}
      );
  }

  onRegister(registerData: RegisterDto): Observable<any> {
    const header = new HttpHeaders({});

    return this.http
      .post<any>(this.pre + '/api/user/register',
        {
          email: registerData.email,
          password: registerData.password,
          fullName: registerData.fullName
        },
        {headers: header}
      );
  }

}
