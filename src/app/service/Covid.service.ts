import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CovidService {

constructor(private http: HttpClient) { }

getSummary() {
  return this.http.get(`https://cors-anywhere.herokuapp.com/https://api.covid19api.com/summary`);
}

}