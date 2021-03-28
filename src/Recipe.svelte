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
{#if recipe}
  <div class="recipe-container">
    <div class="side-ingredients">
      <SvelteMarkdown source="{recipe.ingredientsContent}" />
    </div>

  <div class="cooking-container">

          <SvelteMarkdown source="{recipe.title}" />
          <div>
              <p>Cooking Time: {recipe.recipeTime.cookingTime}</p>
              <p>Total Time: {recipe.recipeTime.totalTime}</p>
              {#if recipe.recipeTime.isStartPreviousDay}
                  <p>Achtung! Prepare previous day</p>
              {/if}
          </div>
          <div class="main-ingredients">
            <SvelteMarkdown source="{recipe.ingredientsContent}" />
          </div>
          <SvelteMarkdown source="{recipe.content}" />
  </div>
  </div>
  {/if}



<style>
    .recipe-container {
        display: block;
    }

    @media only screen and (max-width: 1300px) {
        .side-ingredients {
            display: none;
        }
    }

    @media only screen and (min-width: 1300px) {
        .main-ingredients {
            display: none;
        }
    }
    .side-ingredients {
        position: fixed;
        float: left;
        margin-left: 20px;
        padding-top: 50px;
        max-width: min(33vw, calc((100vw - 1000px)));
    }

    .cooking-container {
        text-align: left;
        padding: 1em;
        max-width: min(max(500px, 33vw), 100vh);
        margin: 0 auto;
    }

</style>
