import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Recipe } from 'src/app/shared/models/recipe.model';

@Component({
  selector: 'app-recipes-page',
  templateUrl: './recipes-page.component.html',
  styleUrls: ['./recipes-page.component.css']
})
export class RecipesPageComponent implements OnInit {
  public recipe$: Observable<Recipe>;
  private readonly _recipesJSON = 'assets/recipes-mock.json';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.recipe$ = this.route.paramMap.pipe(
      map((rMap: ParamMap) => rMap.get('recipesName')),
      switchMap((recipesName: string) => {
        return this.http.get(this._recipesJSON).pipe(
          map((recipes: Recipe[]) => {
            return recipes.find((rec: Recipe) => rec.name === recipesName);
          })
        )
      })
    )
  }

}
