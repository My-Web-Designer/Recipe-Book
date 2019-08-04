import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from 'src/app/shared/service/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {
  // @Output() itemAdded = new EventEmitter<Ingredient>();
  // @ViewChild('name') nameInput: ElementRef;
  // @ViewChild('amount') amount: ElementRef;
  @ViewChild('fd', { static: false }) shoppingListForm: NgForm;
  ingredients: any[] = [];
  ingredient: any = {};
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.shoppingListService.startedEditing.subscribe((index: number) => {
      this.editMode = true;
      this.editedItemIndex = index;
      this.editedItem = this.shoppingListService.getIngredient(index);
      this.shoppingListForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      });
    });
  }

  onSubmit(formData: NgForm) {
    this.ingredient = new Object(formData.value);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, this.shoppingListForm.form.value);
    } else {
      this.shoppingListService.onItemAdd(this.ingredient);
    }
    this.shoppingListForm.reset();
    this.editMode = false;
  }

  onFormAction(action: string) {
    if (action === 'clear') {
      this.editMode = false;
      this.shoppingListForm.reset();
    } else if (action === 'delete') {
      this.editMode = false;
      this.shoppingListForm.reset();
      this.shoppingListService.deleteIngredient(this.editedItemIndex);
    }
  }
}
