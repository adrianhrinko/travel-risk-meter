import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map, reduce, filter } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataService {
private BASIC_AUTH = 'Basic ' + btoa(environment.cloudant_username + ':' + environment.cloudant_password);

private httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.BASIC_AUTH
  })
};

constructor(private http: HttpClient) {}

getAll(db: string) {
  const url = `${environment.cloudant_url}/${db}/_all_docs?include_docs=true`;
  return this.http.get<any>(url, this.httpOptions).pipe(map(x => x.rows.map(y => y.doc)));

}

getDisasterTypes() {
  const url = `${environment.cloudant_url}/disasters_summary/_find`;
  const querry = {
    "selector": {},
    "fields": [
       "disasterGroup"
    ],
    "sort": [
       {
          "disasterGroup": "asc"
       }
    ]};

  return this.http.post<any>(url, querry, this.httpOptions).pipe(map(x => x.docs.map(y => y.disasterGroup).reduce((uniq, x) => uniq.includes(x) ? uniq : [...uniq, x], [])));
}

getDisasterGroup(group: string) {
  const url = `${environment.cloudant_url}/disasters_summary/_find`;
  const querry = {
    "selector": {
       "disasterGroup": group
    },
    "sort": [
       {
          "totalAffected": "asc"
       }
    ]
 };

  return this.http.post<any>(url, querry, this.httpOptions).pipe(map(x => x.docs));
}

}
