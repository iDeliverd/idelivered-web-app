import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-emoticon-rating',
  templateUrl: './emoticon-rating.component.html',
  styleUrls: ['./emoticon-rating.component.scss']
})
export class EmoticonRatingComponent implements OnInit {

  @Input() rating: number = 0;
  constructor() { }

  ngOnInit() {
  }

}
