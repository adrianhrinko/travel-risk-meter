import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  @Output() search: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onSearchChange(searchValue: string) {
    this.search.emit(searchValue);
  }

}
