<script lang="ts">//
import SvelteMarkdown from 'svelte-markdown'
import type { Recipe, RecipeSummary } from './recipe'
import { onMount } from 'svelte'
export let recipe: RecipeSummary
let fullRecipe: Recipe

onMount(async function () {
  const res = await window.fetch(`recipes/${recipe.id}.json`)
  fullRecipe = await res.json()

  console.log(fullRecipe)
})
</script>

<div class="recipe-container">
    {#if fullRecipe}

        <SvelteMarkdown source="{fullRecipe.title}" />
        <div>
            <p>Cooking Time: {fullRecipe.recipeTime.cookingTime}</p>
            <p>Total Time: {fullRecipe.recipeTime.totalTime}</p>
            {#if fullRecipe.recipeTime.isStartPreviousDay}
                <p>Achtung! Prepare previous day</p>
            {/if}
        </div>
        <SvelteMarkdown source="{fullRecipe.ingredientsContent}" />
        <SvelteMarkdown source="{fullRecipe.content}" />
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
