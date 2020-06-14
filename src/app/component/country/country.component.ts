import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CountryService } from 'src/app/service/Country.service';
import { EmergencyService } from 'src/app/service/Emergency.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  countryCode: string;
  countryCodeISO2: string = 'SK';
  model: any;

  constructor(private activatedRoute: ActivatedRoute,
              private location: Location,
              private countryService: CountryService,
              private emergencyService: EmergencyService) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.countryCode = params.code as string;
      this.countryService.getInfoAboutCountry(this.countryCode).subscribe(data => {
        this.model = data;
        this.model.currencies = this.model.currencies.map(x => x.name).join(', ');
        this.model.languages = this.model.languages.map(x => x.name).join(', ');
      })
      this.emergencyService.getEmergencyInfoAboutCountry(this.countryCodeISO2).subscribe(data => {
        this.model.emergencyInfo = data;
      })
    });
  }

  cancel() {
    this.location.back();
  }

}
