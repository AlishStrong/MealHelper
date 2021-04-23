import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { iif, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Recipe } from 'src/app/shared/models/recipe.model';

@Component({
  selector: 'app-search-recipe',
  templateUrl: './search-recipe.component.html',
  styleUrls: ['./search-recipe.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchRecipeComponent implements OnInit {
  private readonly _recipesJSON = 'assets/recipes-mock.json';
  recipes$: Observable<Recipe[]>;
  searchWord$ = new FormControl('');

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.recipes$ = this.searchWord$.valueChanges.pipe(
      switchMap((searchWord: string) => iif(
        () => !!searchWord.trim(),
        this.findRecipes(searchWord),
        of(new Array<Recipe>())
      )
      )
    );
  }

  selectRecipe(recipe: Recipe) {
    console.log(`You selected ${recipe.name}`);
    this.router.navigateByUrl(`recipes/${recipe.name}`);
  }

  private findRecipes(searchWord: string) {
    return this.http.get<Recipe[]>(this._recipesJSON).pipe(
      map(recipes => recipes.filter(
        (recipe: Recipe) => recipe.name.toLocaleLowerCase().includes(searchWord.toLocaleLowerCase())
      )
      )
    );
  }
}
