import { Component, OnInit } from '@angular/core';
import { Monument} from '../../models/AppUser';
import { MonumentsService} from '../../services/monuments.service';
import {NavbarService} from '../../services/navbar.service';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment.prod';



@Component({
  selector: 'app-monumentpanel',
  templateUrl: './monumentpanel.component.html',
  styleUrls: ['./monumentpanel.component.css']
})
export class MonumentpanelComponent implements OnInit {
  title = 'Monument Management - Add/Edit Monuments';
  monuments: Monument[];
  monSearchText = '';
  baseUrl = environment.baseUrl;
  backEndUrl = environment.backendUrl;

  constructor(
    private monumentService: MonumentsService,
    public nav: NavbarService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.nav.show();
    this.monumentService.getMonuments().subscribe(
      data => this.monuments = data

    );
  }

  send(data) {
    this.monumentService.saveData(data);
    this.router.navigate(['/editmonument']);
  }

}

