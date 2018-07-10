import { Component, OnInit } from '@angular/core';
import {AppUser} from '../../models/AppUser';
import { UsersService} from '../../services/users.service';
import {NavbarService} from '../../services/navbar.service';
import {AuthService} from '../../services/auth.service';


declare let $;

@Component({
  selector: 'app-userpanel',
  templateUrl: './userpanel.component.html',
  styleUrls: ['./userpanel.component.css']
})
export class UserpanelComponent implements OnInit {
  title = 'User Management | Anonymize Users';
  searchText = '';
  users: AppUser[];
  errorMessage = '';

  constructor(
    private userService: UsersService,
    private nav: NavbarService,
  ) {}

  ngOnInit(): void {

    this.nav.show();
    this.findUsers();
  }

  findUsers() {
      this.userService.getUsers()
        .subscribe(
          data => this.users = data,
          error => this.errorMessage = <any>error
        );
  }



  forgetUser($event, userData) {
    this.userService.forgetUserById(userData);
    if(userData != null) {
      window.location.reload();
    }
  }
}
