import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MonumentsService } from '../../../services/monuments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Monument } from '../../../models/AppUser';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { TranslatorService } from '../../shared/services/translator.service';
import { TranslateService } from '../../../../node_modules/@ngx-translate/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-monumentmanagement',
  templateUrl: './monumentmanagement.component.html',
  styleUrls: ['./monumentmanagement.component.css']
})
export class MonumentmanagementComponent implements OnInit {

  monumentID: string;
  monumentFound = false;
  areas: String[] = [];
  monument: Monument;
  backEndUrl = environment.backendUrl;
  selectedFile: File = null;
  img;

  monumentForm: FormGroup;

  constructor(
    public translate: TranslatorService,
    private fb: FormBuilder,
    private _monumentService: MonumentsService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _http: HttpClient,
    private cd: ChangeDetectorRef,
    private _translate: TranslateService
  ) {
    this.monumentForm = this.fb.group({
      information: this.fb.array([])
    });
  }

  ngOnInit() {
    this._translate.get('MONUMENT_ADD_DETAIL');
    this._route.params.subscribe(params => {
          this.monumentID = params['id'];
      });
    this.initializeMonumentForm();
    this.getAllAreas();
    this.inputId(this.monumentID);
    this.translate.initTranslate();
  }

  getAllAreas() {
    this._monumentService.getAreas().subscribe(data => {
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

  inputId(id) {
    if (id !== 'addmonument') {
      this.monumentFound = true;
      this._monumentService.getMonumentById(id).subscribe(res => {
        this.monument = res;

        this.fillForm(this.monument);
      });
    } else {
      this.monumentFound = false;
      this.initializeMonumentForm();
    }
  }

  fillForm(monument) {
    console.log('monument data: ', monument);
    console.log('monument id: ', monument.id);
    this.monumentForm = this.fb.group({
      id: [monument ? monument.id : ''],
      latitude: [monument ? monument.latitude : ''],
      longitude: [monument ? monument.longitude : ''],
      area: [monument ? monument.area : ''],
      picture: [monument ? monument.picture : ''],
      information: this.fb.array([])
    });
    this.setLanguages();
  }

  initializeMonumentForm() {
    this.monumentForm = this.fb.group({
      id: [''],
      latitude: [''],
      longitude: [''],
      area: this.areas,
      picture: [''],
      information: this.fb.array([])
    });
  }

  onFileSelected(selectedImg) {
    console.log('selected image: ', selectedImg);

    this.selectedFile = <File>selectedImg.target.files[0];

    this.img = selectedImg.target.files[0].name;
    const reader = new FileReader();
    console.log(selectedImg.target.files[0].name);
    reader.onload = (e: any) => {
      this.img = e.target.result;
      this.monumentForm.patchValue({
        picture: this.selectedFile
      });
    };
    reader.readAsDataURL(selectedImg.target.files[0]);
  }



  addNewLanguage() {
    const control = <FormArray>this.monumentForm.controls.information;
    control.push(
      this.fb.group({
        language: [''],
        name: [''],
        description: [''],
        conversations: this.fb.array([])
      })
    );
  }

  deleteLanguage(index) {
    const control = <FormArray>this.monumentForm.controls.information;
    control.removeAt(index);
  }

  addnewQuestion(control) {
    control.push(
      this.fb.group({
        question: [''],
        answer: ['']
      }));
  }

  deleteQuestion(control, index) {
    control.removeAt(index);
  }

  setLanguages() {
    const control = <FormArray>this.monumentForm.controls.information;
    this.monument.information.forEach(x => {
      control.push(this.fb.group({
        language: x.language,
        name: x.name,
        description: x.description,
        conversations: this.setQuestions(x) }));
    });
  }

  setQuestions(x) {
    const arr = new FormArray([]);
    x.conversations.forEach(y => {
      arr.push(this.fb.group({
        question: y.question ,
        answer: y.answer
      }));
    });
    return arr;
  }

  // method needed to keep focus in current changing input field. a bug in case if you work with arrays.
  trackByFn(index: any, item: any) {
    return index;
  }

  submitForm() {
    if (this.monumentForm.get('area').touched) {
      console.log('saved Data: ', this.monumentForm.value);

      if (this.monumentForm.get('id').value !== '') {
        this._monumentService.editMonument(this.monumentForm.value).subscribe( _ => {
          console.log('Making call to endpoint editMonument');
        });
      } else {
        this._monumentService.addMonument(this.monumentForm.value).subscribe( __ => {
          console.log('Making call to endpoint addMonument');
        });
      }
      this._router.navigate(['/monuments']);
    }
  }

  // Om error te omzeilen in template
  getFormData() {
    return <FormArray>this.monumentForm.get('information');
  }
}
