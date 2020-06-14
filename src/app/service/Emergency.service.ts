import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmergencyService {

constructor(private http: HttpClient) { }

getEmergencyInfoAboutCountry(countryCode: string) {
  return this.http.get(`https://emergencynumberapi.com/api/country/${countryCode}`);
}

}