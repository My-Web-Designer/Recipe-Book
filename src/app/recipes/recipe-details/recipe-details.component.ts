import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from 'src/app/shared/service/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit {
  recipe: Recipe;
  recipeIndex: number;

  constructor(
    private recipeService: RecipeService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    // Get RecipeDetails by index
    this.activatedRoute.params.subscribe(
      (params) => {
        this.recipeIndex = +params.id;
        this.recipe = this.recipeService.getRecipeById(this.recipeIndex);
      }
    );
  }

  // Manage button
  onMange(action: string) {
    if (action === 'shopping-list') {
      this.recipeService.onAddToShoppingList(this.recipe.ingredients);
    } else if (action === 'edit') {
      this.router.navigate(['edit'], { relativeTo: this.activatedRoute });
    } else if (action === 'delete') {
      this.recipeService.deleteRecipe(this.recipeIndex);
      this.router.navigate(['recipes']);
    }
  }
}
