<script lang="ts">//
import Recipe from './Recipe.svelte'
import Router from 'svelte-spa-router'
import RecipeList from './RecipeList.svelte'
const routes = {
  '/recipe/:recipeId': Recipe,
  '/': RecipeList,
  '/page/:page': RecipeList
}
</script>

<Router {routes}>
</Router>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
