import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class TreeService {
  constructor(private http: HttpClient) {}

  getJson() {
    return this.http.get<any>("http://localhost:8080/api/v1/tree");
  }

}