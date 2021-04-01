<script lang="ts">//
import { push } from 'svelte-spa-router'
import SvelteMarkdown from 'svelte-markdown'
import type { RecipeSummary } from './recipe'

export let recipe: RecipeSummary = null
let hovered = false
function onMouseEnter () {
  hovered = true
}

function onMouseLeave () {
  hovered = false
  console.log('hovered', hovered)
}
</script>

<div class="summary" on:click={() => push(`/recipe/${recipe.id}`)} on:mouseenter={onMouseEnter} on:mouseleave={onMouseLeave} class:hovered={hovered}>
  <SvelteMarkdown source="{recipe.title}" />
  <SvelteMarkdown source="{recipe.img}" />
</div>

<style>
  .hovered {
      cursor: pointer
  }

  :global(.summary img) {
     max-width: 500px;
  }

</style>
