import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchProductComponent implements OnInit {
  dataset = ['MDB', 'Angular', 'Bootstrap', 'Framework', 'SPA', 'React', 'Vue'];
  searchItem: string;
  
  reactiveSearch = new FormControl('');
  reactiveDataset = new Subject<string[]>();
  constructor() { }

  ngOnInit() {
    this.reactiveSearch.valueChanges.subscribe(this.imitateServerRequest());
  }

  selectProduct($event): void {
    console.log(`You selected ${$event}`);
  }

  private imitateServerRequest(): (value: any) => void {
    return (toFind: string) => {
      console.log(`Requesting for ${toFind}`);
      this.reactiveDataset.next(toFind ? this.dataset.filter((item: string) => item.toLocaleLowerCase().includes(toFind.toLocaleLowerCase())) : []);
    };
  }
}
