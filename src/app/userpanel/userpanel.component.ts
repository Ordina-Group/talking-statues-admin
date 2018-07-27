import { Component, OnInit } from '@angular/core';
import { AppUser} from '../../models/AppUser';
import { UsersService} from '../../services/users.service';
import { NavbarService} from '../../services/navbar.service';
import { TranslateService } from '../../../node_modules/@ngx-translate/core';



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
    public translate: TranslateService,
    private userService: UsersService,
    private nav: NavbarService,
  ) {
    translate.addLangs(['en', 'fr', 'nl', 'de']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr|nl|de/) ? browserLang : 'en');
  }

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
