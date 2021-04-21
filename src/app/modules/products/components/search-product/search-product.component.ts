import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, forkJoin, iif, Observable, of, Subject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchProductComponent implements OnInit {
  private readonly _productsJSON = 'assets/products-mock.json';
  products$: Observable<Product[]>;
  searchWord$ = new FormControl('');

  constructor(
    private http: HttpClient,
    private router: Router
    ) { }

  ngOnInit() {
    this.products$ = this.searchWord$.valueChanges.pipe(
      switchMap((searchWord: string) => iif(
          () => !!searchWord.trim(),
          this.findProducts(searchWord),
          of(new Array<Product>())
        )
      )
    );
  }

  selectProduct(product: Product): void {
    console.log(`You selected ${product.name}`);
    this.router.navigateByUrl(`products/${product.name}`);
  }

  private findProducts(searchWord: string) {
    return this.http.get<Product[]>(this._productsJSON).pipe(
      map(products => products.filter(
          (product: Product) => product.name.toLocaleLowerCase().includes(searchWord.toLocaleLowerCase())
        )
      )
    );
  }
}
