import { Ingredient } from '../../shared/ingredient.model';
// import { ADD_INGREDIENT } from './shopping-list.actions';
import * as ShoppingListActions from './shopping-list.actions';

const initialState = {
  ingredients: [new Ingredient('Apple', 5), new Ingredient('Tomatoes', 10)],
};
export function shoppingListReducer(
  state = initialState,
  // action: ShoppingListActions.AddIngredient
  action: ShoppingListActions.ShoppingListActions
) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };

    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload],
      };

    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[action.payload.index];
      const updatedIngredient = {
        ...ingredient,
        ...action.payload.ingredient,
      };

      const updatedIngredients = [...state.ingredients];
      updatedIngredient[action.payload.index] = updatedIngredient;

      return {
        ...state,
        ingredients: updatedIngredients,
      };
    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter(
          (ig, igIndex) => igIndex !== action.payload
        ),
      };
    default:
      return state;
  }
}
