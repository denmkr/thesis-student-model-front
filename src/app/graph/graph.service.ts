import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class GraphService {
  constructor(private http: HttpClient) {}

  getNodesJson() {
    return this.http.get<any>("http://localhost:8080/api/v1/graph/nodes");
  }

  getLinksJson() {
    return this.http.get<any>("http://localhost:8080/api/v1/graph/links");
  }

}