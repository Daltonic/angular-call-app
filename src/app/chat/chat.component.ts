import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { CometChat } from '@cometchat-pro/chat';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  user: Object = null;

  constructor(private auth: AngularFireAuth, private route: Router) {}

  ngOnInit(): void {
    CometChat.getLoggedinUser()
      .then((user: any) => this.user = user)
      .catch((error) => console.log('error getting details:', { error }));
  }

  public logOut(): void {
    this.auth
      .signOut()
      .then(() => this.route.navigate(['login']))
      .catch((error) => console.log(error.message));
  }
}
