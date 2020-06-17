import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmergencyService {

constructor(private http: HttpClient) { }

getEmergencyCalls(ISO2CountryCode: string) {
  return this.http.get(`https://cors-anywhere.herokuapp.com/http://emergencynumberapi.com/api/country/${ISO2CountryCode}`);
}

}