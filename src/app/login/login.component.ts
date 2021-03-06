import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { CometChat } from '@cometchat-pro/chat';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loading: boolean = false;
  constructor(private auth: AngularFireAuth, private route: Router) {}

  public submit(form): void {
    this.loading = true;
    const email = form.email;
    const password = form.password;

    this.auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => this.loginCometChat(res.user))
      .catch((error) => {
        console.log(error);
        alert(error.message);
        this.loading = false;
      });
  }

  private loginCometChat(user: any) {
    const authKey = environment.AUTH_KEY;

    CometChat.login(user.uid, authKey)
      .then(() => this.route.navigate(['']))
      .catch((error) => {
        console.log(error);
        this.loading = false;
      });
  }
}
