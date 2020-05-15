import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styles: []
})


export class LoginFormComponent implements OnInit {

  @Output() formSubmit = new EventEmitter();
  
  public formData: FormGroup;

  constructor(
    private FormBuilder: FormBuilder
  ) {}

  private resetForm = ()  => {
    this.formData = this.FormBuilder.group({
        email: [ null, Validators.required ],
        password: [ null, Validators.required ],
    });
  };

  ngOnInit() {
      this.resetForm();
  }
};
