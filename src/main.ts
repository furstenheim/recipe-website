import App from './App.svelte'
import type { Recipe } from './recipe'

const recipes: Recipe[] = []
const app = new App({
  target: document.body,
  props: {
    name: 'world',
    recipes
  }
})

export default app
