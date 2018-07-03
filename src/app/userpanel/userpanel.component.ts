import { Component, OnInit, HostListener } from '@angular/core';
import {AppUser} from '../../models/AppUser';
import { UsersService} from '../../services/users.service';
import {NavbarService} from '../../services/navbar.service';


declare let $;

@Component({
  selector: 'app-userpanel',
  templateUrl: './userpanel.component.html',
  styleUrls: ['./userpanel.component.css']
})
export class UserpanelComponent implements OnInit {
  title = 'User Management | Anonymize Users';
  listFilter = '';
  users: AppUser[];
  errorMessage = '';

  constructor(
    private userService: UsersService,
    private nav: NavbarService,
  ) { }

  ngOnInit(): void {
    this.nav.show();
    this.userService.getUsers()
      .subscribe(
        data => this.users = data,
        error => this.errorMessage = <any>error
        );
    console.log('Users = ' + this.users);
  }

  forgetUser($event, userData) {
    this.userService.forgetUserById(userData);
    if(userData != null) {
      window.location.reload();
    }
  }
}
