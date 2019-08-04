import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../ingredient.model';
import { Subject } from 'rxjs';

@Injectable(
  // {providedIn: 'root'}
  )
export class ShoppingListService {
  private ingredients: Ingredient[] = [
    {
      name: 'Tomato',
      amount: 5
    },
    {
      name: 'Onion',
      amount: 10
    }
  ];

  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  constructor() { }

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  onItemAdd(event: Ingredient) {
    console.log(event);
    this.ingredients.push(event);
    this.ingredientsChanged.next(this.ingredients.slice());
    console.log(this.ingredients);
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  updateIngredient(index: number, updatedIngredient: Ingredient) {
    this.ingredients[index] = updatedIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
