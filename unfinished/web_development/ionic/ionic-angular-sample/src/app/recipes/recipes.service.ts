import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  private recipes: Recipe[] = [{
    id: 'r1',
    title: 'Sandwitch',
    imageUrl: 'https://images.unsplash.com/photo-1524081684693-1519036f3449?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    ingredients: ['Tomato', 'Avocado', 'Spinach']
  },
  {
    id: 'r2',
    title: 'Pasta Primavera',
    imageUrl: 'https://images.unsplash.com/photo-1536096119648-4cbab718f351?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    ingredients: ['Pasta', 'Olive Oil', 'Spinach']
  },];

  constructor() { }

  getAllRecipes() {
    return [...this.recipes];
  }
  getRecipe(recipeId: string) {
    return {
      ...this.recipes.find(recipe => {
        return recipe.id == recipeId;
      })
    };
  }
  deleteRecipe(recipeId: string) {
    this.recipes = this.recipes.filter(recipe =>{
      return recipe.id !== recipeId;
    })
  }
}
