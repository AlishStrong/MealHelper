import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipes-page',
  templateUrl: './recipes-page.component.html',
  styleUrls: ['./recipes-page.component.css']
})
export class RecipesPageComponent implements OnInit {
  public recipesName$: Observable<string>;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.recipesName$ = this.route.paramMap.pipe(
      map((rMap: ParamMap) => rMap.get('recipesName'))
    )
  }

}
