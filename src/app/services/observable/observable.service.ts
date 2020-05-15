import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ObservablesService {

  protected token: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  protected user: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  protected bookmarks: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor() {}

  public getToken(): Observable<any> { return this.token };
  public getUser(): Observable<any> { return this.user };
  public getBookmarks(): Observable<any> { return this.bookmarks };

  public setObservableData = (type: string, data: any) => {
    switch(type){ 
      case 'token':
        this.token.next(data);
      break;
      case 'user':
        this.user.next(data);
      break;
      case 'bookmarks':
        this.bookmarks.next(data);
      break;
  
      default:
      break;
    };
  };

}
