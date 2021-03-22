type TimeUnit = 'min' | 'hour'
var a = 1;
interface Time {
  unit: TimeUnit
  time: number
}
interface RecipeTime {
  isStartPreviousDay: boolean
  totalTime: Time
  cookingTime: Time
}

interface IngredientQuantity {
  type: string
  quantity: number
}

interface Ingredient {
  id: string
  uuid: string
  name: string
}

interface RecipeIngredient {
  ingredient: Ingredient
  quantity: IngredientQuantity
}

type RecipeContent = string

export interface Recipe {
  id: string
  uuid: string
  title: string
  url?: string
  content: RecipeContent
  ingredientsContent: RecipeContent
  ingredients: RecipeIngredient[]
  time: RecipeTime
}

export interface RecipeSummary {
  id: string
  img?: string
  title: string
}
