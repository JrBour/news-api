import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ObservablesService } from "../observable/observable.service";
import { environment } from '../../../environments/environment';

@Injectable()
export class CrudService {

  constructor( private HttpClient: HttpClient, private ObservablesService: ObservablesService ){};

  private handleError = (apiError: any) => Promise.reject(apiError.error);

  public readOneItem(endpoint: String, param: String): Promise<any>{
    return this.HttpClient.get(`${environment.apiUrl}${endpoint}/${param}`)
    .toPromise().then(data => this.getData(endpoint, data)).catch(this.handleError);
  };

  public readAllItems(endpoint: String): Promise<any>{
    return this.HttpClient.get(`${environment.apiUrl}${endpoint}`)
    .toPromise().then(data => this.getData(endpoint, data)).catch(this.handleError);
  };

  public createItem(endpoint: String, data: any): Promise<any>{
    let myHeader = new HttpHeaders();
    myHeader.append('Content-Type', 'application/json');

    return this.HttpClient.post(`${environment.apiUrl}${endpoint}`, data, { headers: myHeader })
    .toPromise().then(data => this.getData(endpoint, data)).catch(this.handleError);
  };

  public updateItem(endpoint: String, _id: String, data: any): Promise<any>{
    let myHeader = new HttpHeaders();
    myHeader.append('Content-Type', 'application/json');
    
    return this.HttpClient.put(`${environment.apiUrl}${endpoint}/${_id}`, data, { headers: myHeader })
    .toPromise().then(data => this.getData(endpoint, data)).catch(this.handleError);
    };

  public deleteItem(endpoint: String, _id: String, data): Promise<any>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: data
    };

    return this.HttpClient.delete(`${environment.apiUrl}${endpoint}/${_id}`, httpOptions)
    .toPromise().then(data => this.getData(endpoint, data)).catch(this.handleError);
  };

  private getData = (endpoint, apiResponse: any) => {  
    switch(endpoint) {
      case 'login':
        this.ObservablesService.setObservableData('user', apiResponse.data.user)
        this.ObservablesService.setObservableData('token', apiResponse.data.token)
        return apiResponse
      break;
      default:
        return apiResponse || {};
      break;
    }
  };
};