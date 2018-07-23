import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Monument} from '../../../../models/AppUser';
import { MonumentsService } from '../../../../services/monuments.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-commonform',
  templateUrl: './commonform.component.html',
  styleUrls: ['./commonform.component.css']
})
export class CommonformComponent implements OnInit {

  @Input() id: string;
  @Output() commonFormReady = new EventEmitter<FormGroup>();
  currentMonument: Monument;
  monumentFound = false;
  areas: String[] = [];

  commonForm = new FormGroup ({
    latitude: new FormControl(''),
    longitude: new FormControl(''),
    area: new FormControl(''),
    id: new FormControl('')
  });

  constructor(
    private _route: ActivatedRoute,
    private monumentService: MonumentsService,
    private fb: FormBuilder,
    ) {

  }

  ngOnInit() {
    this.inputId(this.id);
    this.getAllAreas();
  }


  inputId(id) {
    if (id !== 'addmonument') {
      this.monumentFound = true;
      this.monumentService.getMonumentById(id).subscribe(res => {
        this.currentMonument = res;
        this.fillCommonForm(this.currentMonument);
      });
    } else {
      this.monumentFound = false;
      this.initializeCommonForm();
    }
  }

  fillCommonForm(common) {
    console.log('monument: ', common);
    this.commonForm.patchValue({
      latitude: common.latitude,
      longitude: common.longitude,
      area: this.areas,
      id: common.id
    });
    this.commonFormReady.emit(this.commonForm);
  }


  getAllAreas() {
    this.monumentService.getAreas().subscribe(data => {
      for (let i = 0; i <= (data.length - 1); i++) {
        this.areas.push(data[i]);
        // console.log(data[i] + ' has been added.');
      }
    });
  }

  addArea() {
    this.areas.push((<HTMLInputElement>document.getElementById('areaInput')).value);
    document.getElementById('closeBtn').click();
  }


  initializeCommonForm() {
    this.commonForm = this.fb.group({
      latitude: new FormControl(''),
      longitude: new FormControl(''),
      area: this.areas,
      id: new FormControl('')
    });
    this.commonFormReady.emit(this.commonForm);
  }

}
