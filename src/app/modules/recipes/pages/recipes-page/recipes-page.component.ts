import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Recipe } from 'src/app/shared/models/recipe.model';

@Component({
  selector: 'app-recipes-page',
  templateUrl: './recipes-page.component.html',
  styleUrls: ['./recipes-page.component.css']
})
export class RecipesPageComponent implements OnInit {
  public editRecipeForm: FormGroup;
  public recipe$: Observable<Recipe>;
  public edit$ = new BehaviorSubject(false);
  private readonly _recipesJSON = 'assets/recipes-mock.json';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    this.recipe$ = this.route.paramMap.pipe(
      map((rMap: ParamMap) => rMap.get('recipesName')),
      switchMap((recipesName: string) => {
        return this.http.get(this._recipesJSON).pipe(
          map((recipes: Recipe[]) => {
            return recipes.find((rec: Recipe) => rec.name === recipesName);
          }),
          tap((r: Recipe) => {
            this.editRecipeForm = new FormGroup({
              name: new FormControl(r.name, Validators.required)
            });
          })
        )
      })
    )
  }

  close(): void {
    console.log('Pressed close');
    this.router.navigateByUrl('/recipes');
  }

  edit(): void {
    console.log(`Want to edit`, this.editRecipeForm);
    this.edit$.next(true);
  }

  save() {
    console.log(`Want to save`);
    this.edit$.next(false);
  }
}
