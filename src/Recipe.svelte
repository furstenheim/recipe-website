<script lang="ts">//
import SvelteMarkdown from 'svelte-markdown'
import type { Recipe } from './recipe'
import { onMount } from 'svelte'
export let params = {
  recipeId: ''
}
let recipe: Recipe

onMount(async function () {
  const res = await window.fetch(`recipes/${params.recipeId}.json`)
  recipe = await res.json()

  console.log(recipe)
})
</script>

<div class="recipe-container">
    {#if recipe}

        <SvelteMarkdown source="{recipe.title}" />
        <div>
            <p>Cooking Time: {recipe.recipeTime.cookingTime}</p>
            <p>Total Time: {recipe.recipeTime.totalTime}</p>
            {#if recipe.recipeTime.isStartPreviousDay}
                <p>Achtung! Prepare previous day</p>
            {/if}
        </div>
        <SvelteMarkdown source="{recipe.ingredientsContent}" />
        <SvelteMarkdown source="{recipe.content}" />
    {/if}
</div>


<style>
    .recipe-container {
        text-align: left;
        padding: 1em;
        max-width: 500px;
        margin: 0 auto;
    }

</style>
