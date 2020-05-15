import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from '../../models/user.model'
import { CrudService } from "../../services/crud/crud.service";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styles: []
})
export class RegisterPageComponent {

  constructor(
    private Router: Router, 
    private CrudService: CrudService
  ) { }

  private createUser = (user: UserModel ) => {
    delete user.confirmPassword;

    this.CrudService.createItem('register', user)
    .then( data => {
        this.Router.navigateByUrl('/')
    })
    .catch(console.error);
  };

}
