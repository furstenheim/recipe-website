<script lang="ts">//
import Recipe from './Recipe.svelte'
import { onMount } from 'svelte'
import type { RecipeSummary } from './recipe'

export let name: string

let recipes:RecipeSummary[] = []

onMount(async function () {
  const res = await window.fetch('recipes.json')
  console.log(res)
  recipes = await res.json()
  console.log(recipes)
})
</script>

<main>
	<h1>Hello {name}!</h1>

	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
    {#if recipes.length > 0}
        <Recipe recipe="{recipes[0]}"/>
    {/if}
</main>

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
