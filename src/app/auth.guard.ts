import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { CrudService } from "./services/crud/crud.service";

@Injectable({ providedIn: 'root' })

export class AuthGuard implements CanActivate {
	constructor( 
			private CrudService: CrudService,
			private Router: Router,
	){}
    
	// Check if the user is not logged
	canActivate(): Promise<any> {
		return new Promise( (resolve, reject) => {
			this.CrudService.createItem('me', { token: localStorage.getItem('token') })
			.then(apiResponse =>  {  
				if (apiResponse.data) {
					return resolve(true)    
				} else {
					this.Router.navigateByUrl('/')
				};
			})
			.catch(apiResponse => this.Router.navigateByUrl('/'))
		})
	}
}