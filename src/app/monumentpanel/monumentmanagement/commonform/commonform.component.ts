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
  @Input() commonGroup: FormGroup;
  @Output() commonFormReady = new EventEmitter<FormGroup>();
  @Output() currentMonument: Monument;
  monumentFound = false;
  areas: String[] = [];

  constructor(
    private _route: ActivatedRoute,
    private monumentService: MonumentsService,
    private fb: FormBuilder,
    ) {

  }

  ngOnInit() {
    this.inputId(this.id);
    this.getAllAreas();
    this.commonGroup  = this.fb.group({
      id: [''],
      latitude: [''],
      longitude: [''],
      area: [''],
    });
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
    // console.log('monument: ', common);
    this.commonGroup.patchValue({
      latitude: common.latitude,
      longitude: common.longitude,
      area: this.areas,
      id: common.id
    });
    // this.commonFormReady.emit(this.commonGroup);
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
    this.commonGroup = this.fb.group({
      id: [''],
      latitude: [''],
      longitude: [''],
      area: [''],
    });
    // this.commonFormReady.emit(this.commonGroup);
  }

}
