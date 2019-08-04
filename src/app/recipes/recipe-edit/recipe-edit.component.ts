import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from 'src/app/shared/service/recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  editRecipe: Recipe;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.id = +params.id;
        this.editMode = params.id != null;
        this.editRecipe = this.recipeService.getRecipeById(this.id);
        console.log(this.editRecipe);
      }
    );
    this.FromInit();
    // this.tempFormControl();
  }

  private FromInit() {
    let name = '';
    let description = '';
    let imagePath = '';
    const ingredients = new FormArray([]);
    if (this.editMode) {
      name = this.editRecipe.name;
      description = this.editRecipe.description;
      imagePath = this.editRecipe.imagePath;
      if (this.editRecipe.ingredients) {
        for (const iterator of this.editRecipe.ingredients) {
          ingredients.push(new FormGroup({
            name: new FormControl(iterator.name),
            amount: new FormControl(iterator.amount)
          }));
        }
      }
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(name, Validators.required),
      description: new FormControl(description, Validators.required),
      imagePath: new FormControl(imagePath, Validators.required),
      ingredients
    });
  }

  ingredientsControl() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  addIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).push(new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }));
  }

  deleteIngredient(index: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

  onSubmit() {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }
}
