import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  countryCode: string;

  constructor(private activatedRoute: ActivatedRoute,
              private location: Location) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.countryCode = params.code as string;
    });
  }

  cancel() {
    this.location.back();
  }

}
