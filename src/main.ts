import App from './App.svelte'
import type { Recipe } from './recipe'

const recipes: Recipe[] = [{ id: 'a', content: '', uuid: '', title: '', ingredients: [], ingredientsContent: '', time: { isStartPreviousDay: false, cookingTime: { time: 10, unit: 'hour' }, totalTime: { time: 11, unit: 'min' } } }]
const app = new App({
  target: document.body,
  props: {
    name: 'world',
    recipes
  }
})

export default app
