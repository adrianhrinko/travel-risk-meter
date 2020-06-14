import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  @Output() search: EventEmitter<string> = new EventEmitter();
  @Output() riskType: EventEmitter<string> = new EventEmitter();
  countryCode: any;
  options: any;

  constructor(private activatedRoute: ActivatedRoute,
    private location: Location, private dataService: DataService) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.countryCode = params?.code;
      this.countryCode = params.code as string;
    });

    this.dataService.getDisasterTypes().subscribe(result => {
     this.options = result;
    }, err => {
      console.log(err);
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

  onRiskTypeSelected(event) {
    this.riskType.emit(event.target.value);
  }

}
