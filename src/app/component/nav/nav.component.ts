import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  @Output() search: EventEmitter<string> = new EventEmitter();
  countryCode: any;

  constructor(private activatedRoute: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.countryCode = params?.code;
      this.countryCode = params.code as string;
    });
  }

  isCountryVisible() {
    return !!this.countryCode;
  }

  cancel() {
    this.countryCode = null;
    this.location.back();
  }

  onSearchChange(searchValue: string) {
    this.search.emit(searchValue);
  }

}
