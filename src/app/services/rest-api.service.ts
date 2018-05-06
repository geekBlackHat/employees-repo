import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class RestApiService {

  constructor(protected http: Http) {
  }

  getAllItems(url: string): Observable<any> {
    return this.http.get(url).map((response: any) => {
      return response.json();
    }).catch(this.handleError);
  }

  postData(url: string, data: any ) {
    return this.http.post(url, data)
      .map((response: Response) => {
        return response.json();
      }).catch(this.handleError);
  }

  getItemById(url:string, id): Observable<any> {
    return this.http.get(url).map((response: any) => {
      console.log(response.json());
      response = response.json();
      let empArray = response.data;
      
      for (let i = 0; i < empArray.length; i++) {
        let element = empArray[i];
        if (element.id == id) {
          return element;
        }
      }
      return {};
    }).catch(this.handleError);
  }

  //This Method is used for error handling from API
  private handleError(error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.log("REST API Error : " + error);
    return Observable.throw('Internal server error');
  }

}
