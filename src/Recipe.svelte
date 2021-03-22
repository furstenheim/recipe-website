<script lang="ts">//
import SvelteMarkdown from 'svelte-markdown'
import type { Recipe } from './recipe'
export let recipe: Recipe
</script>

<div class="my-cass">
    <SvelteMarkdown class="aaa" source="{recipe.content}" />
</div>


<style>
    .my-cass {
        text-align: left;
        padding: 1em;
        max-width: 500px;
        margin: 0 auto;
    }

</style>
