import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ObservablesService } from '../../services/observable/observable.service';
import { CrudService } from "../../services/crud/crud.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: []
})
export class LoginPageComponent {

  constructor(
    private CrudService: CrudService,
    private ObservablesService: ObservablesService,
    private Router: Router
  ) { }

  private getUserInfo = (user: Object ) => {

    this.CrudService.createItem('login', user).then(({ data }) => {
      localStorage.setItem('token', data.token);

      this.CrudService.createItem('me', { token: data.token })
        .then(({ data: { bookmark } }) => {
          this.ObservablesService.setObservableData('bookmarks', bookmark)
          this.Router.navigateByUrl('/');
        })
        .catch(console.error)
    }).catch(error => console.error(error));
  };

}
