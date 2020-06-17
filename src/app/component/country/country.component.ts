import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CountryService } from 'src/app/service/Country.service';
import { DataService } from 'src/app/service/data.service';
import { EmergencyService } from 'src/app/service/Emergency.service';
import { CovidService } from 'src/app/service/Covid.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  countryCode: string;
  model: any;
  emergencyCalls: any;
  covid: any;
  topDisasters: any;
  topAttacks: any;

  constructor(private activatedRoute: ActivatedRoute,
              private location: Location,
              private countryService: CountryService,
              private dataService: DataService,
              private covidService : CovidService,
              private emergencyService: EmergencyService) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.countryCode = params.code as string;
      this.countryService.getInfoAboutCountry(this.countryCode).subscribe(data => {
        this.model = data;
        this.model.currencies = this.model.currencies.map(x => x.name).join(', ');
        this.model.languages = this.model.languages.map(x => x.name).join(', ');

        this.covidService.getSummary().subscribe(data => {
          this.covid = data;
          this.covid = this.covid.Countries;
          this.covid.actual = this.getEmptyCovidData();
          console.log(this.covid);
          this.covid.forEach(element => { 
            if (element.CountryCode == this.model.alpha2Code) {
              console.log(element);
              this.covid.actual = element;
            }
          });
        });

        this.emergencyService.getEmergencyCalls(this.model.alpha2Code).subscribe(data => {
          this.emergencyCalls = data;
          this.emergencyCalls.ambulance = this.emergencyCalls.data.ambulance.all.map(x => x).join(', ');
          this.emergencyCalls.fire = this.emergencyCalls.data.fire.all.map(x => x).join(', ');
          this.emergencyCalls.police = this.emergencyCalls.data.police.all.map(x => x).join(', ');
          this.emergencyCalls.dispatch = this.emergencyCalls.data.dispatch.all.map(x => x).join(', ');
        })
      })
    });

    this.dataService.getTopDisastersForCountry(this.countryCode).subscribe(result => {
      this.topDisasters = result;
      console.log(this.topDisasters);
    }, err => {
      console.log(err);
    })

    this.dataService.getTopAttacksForCountry(this.countryCode).subscribe(result => {
      this.topAttacks = result;
      console.log(this.topDisasters);
    }, err => {
      console.log(err);
    })

  }

  cancel() {
    this.location.back();
  }

  getEmptyCovidData() {
    return {
            NewConfirmed: 0,
            TotalConfirmed: 0,
            NewDeaths: 0,
            TotalDeaths: 0,
            NewRecovered: 0,
            TotalRecovered: 0
    };
  }

}
