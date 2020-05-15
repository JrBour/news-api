import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ObservablesService } from '../../services/observable/observable.service';
import { CrudService } from '../../services/crud/crud.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent {

  private isLogged : Boolean = false;

  constructor(
    private Router: Router,
    private ObservablesService: ObservablesService,
    private CrudService: CrudService
  ) {
    if (localStorage.getItem('token') !== null) {
      this.ObservablesService.setObservableData('token', localStorage.getItem('token'))

      this.CrudService.createItem('me', { token: localStorage.getItem('token') })
      .then(({ data }) => {
        this.ObservablesService.setObservableData('user', data.user)
        this.ObservablesService.setObservableData('bookmarks', data.bookmark)
      })
      .catch(console.error)  
    }
    
    this.ObservablesService.getToken().subscribe(token => {
      this.isLogged = token !== null
      if (token !== null) {
        localStorage.setItem('token', token);
      }
    })
  }

  public logout = () =>  {
    localStorage.removeItem('token');
    this.ObservablesService.setObservableData('token', null)
    this.ObservablesService.setObservableData('user', null)
    this.ObservablesService.setObservableData('bookmarks', null)
    this.Router.navigateByUrl('/');
  }

}
