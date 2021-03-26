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

type RecipeContent = string

export interface Recipe {
  id: string
  uuid: string
  title: string
  url?: string
  content: RecipeContent
  ingredientsContent: RecipeContent
  recipeTime: RecipeTime
}

export interface RecipeSummary {
  id: string
  img?: string
  title: string
}
