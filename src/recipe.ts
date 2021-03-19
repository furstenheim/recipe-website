import uuid from "uuid"

type TimeUnit = 'min' | 'hour'

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

interface Recipe {
  id: string
  uuid: string
  title: string
  url?: string
  content: RecipeContent
  ingredients: Array<RecipeIngredient>
}

