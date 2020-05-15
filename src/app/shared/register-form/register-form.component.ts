import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styles: []
})


export class RegisterFormComponent implements OnInit {

  @Output() formSubmit = new EventEmitter();
  
  public formData: FormGroup;

  constructor(
    private FormBuilder: FormBuilder
  ) {}

  private checkPasswords = (group: FormGroup) => {
    const pass = group.get('password').value;
    const confirmPass = group.get('confirmPassword').value;

    return pass === confirmPass ? null : { notSame: true }     
  }

  private resetForm = ()  => {
    this.formData = this.FormBuilder.group({
        firstname: [ null, Validators.required ],
        lastname: [ null, Validators.required ],  
        email: [ null, Validators.required ],
        password: [ null, Validators.required ],
        confirmPassword: [ null ],
    }, { validator: this.checkPasswords });
  };

  ngOnInit() {
      this.resetForm();
  }
};
