import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CountryService } from 'src/app/service/Country.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  countryCode: string;
  model: any;
  topDisasters: any;
  topAttacks: any;

  constructor(private activatedRoute: ActivatedRoute,
              private location: Location,
              private countryService: CountryService,
              private dataService: DataService) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.countryCode = params.code as string;
      this.countryService.getInfoAboutCountry(this.countryCode).subscribe(data => {
        this.model = data;
        this.model.currencies = this.model.currencies.map(x => x.name).join(', ');
        this.model.languages = this.model.languages.map(x => x.name).join(', ');
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

}
