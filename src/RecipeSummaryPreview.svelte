<script lang="ts">//
import SvelteMarkdown from 'svelte-markdown'
import type { RecipeSummary } from './recipe'

export let recipe: RecipeSummary = null

</script>


<a href="/#/recipe/{recipe.id}">

  <div class="summary" >
    <SvelteMarkdown source="{recipe.title}" />
    <SvelteMarkdown source="{recipe.img}" />
  </div>

</a>


<style>
  :global(.summary) {
      text-decoration: none;
      color: black;
  }
  :global(.summary img) {
     max-width: 500px;
  }

</style>
