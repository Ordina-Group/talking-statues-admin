import { Component, OnInit } from '@angular/core';
import { AppUser} from '../../models/AppUser';
import { UsersService} from '../../services/users.service';
import { NavbarService} from '../../services/navbar.service';
import { TranslatorService } from '../shared/services/translator.service';



declare let $;

@Component({
  selector: 'app-userpanel',
  templateUrl: './userpanel.component.html',
  styleUrls: ['./userpanel.component.css']
})
export class UserpanelComponent implements OnInit {
  searchText = '';
  users: AppUser[];
  errorMessage = '';

  constructor(
    private userService: UsersService,
    private nav: NavbarService,
    private _translate: TranslatorService
  ) {
  }

  ngOnInit(): void {

    this.nav.show();
    this.findUsers();
    this._translate.initTranslate();
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
