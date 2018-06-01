import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Language, Information, Monument } from './../model/monument';
import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-monument-dialog',
  templateUrl: './monument-dialog.component.html',
  styleUrls: ['./monument-dialog.component.css']
})
export class MonumentDialogComponent implements OnInit {
  @Input() modalRef: BsModalRef;
  @Input() monument: Monument;
  
  activeLanguage:Language = Language.NL;
  monumentForm: FormGroup;
  constructor(private fb: FormBuilder) { 
    this.monumentForm = this.fb.group({
      information:this.fb.group({
        language:['', Validators.required ],
        name:['', Validators.required ],
        description:['', Validators.required ],
        question:this.fb.group({
          question:['', Validators.required ],
          answer:['', Validators.required ]
        })
      }),
    longitude:['', Validators.required ],
    latitude:['', Validators.required ],
    area:['', Validators.required ]
    });
    this.monumentForm.setValue(this.monument);
    console.log(this.monumentForm.value)
  }

  
  ngOnInit() {
    
  }
  getPosibleLanguages(){
    return Object.keys(Language)
  }

}
