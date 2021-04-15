import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchProductComponent implements OnInit {
  dataset = ['MDB', 'Angular', 'Bootstrap', 'Framework', 'SPA', 'React', 'Vue'];
  searchItem: string;
  
  constructor() { }

  ngOnInit() {
  }

  selectProduct($event): void {
    console.log(`You selected ${$event}`);
  }
}
