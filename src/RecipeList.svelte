<script lang="ts">//
import { onMount } from 'svelte'
import RecipeSummaryPreview from './RecipeSummaryPreview.svelte'
import type {RecipeSummary} from "./recipe";

let recipes:RecipeSummary[] = []
export let params = {
  page: '0'
}
const page:number = Math.max(parseInt(params.page) - 1, 0)

let loaded: boolean = false

console.log(page)
const pageSize = 20

onMount(async function () {
  const res = await window.fetch('recipes.json')
  console.log(res)
  const allRecipes = await res.json()

  recipes = allRecipes.slice(pageSize * page, pageSize * page + pageSize)
  loaded = true
})
</script>

{#each recipes as recipe}
  <RecipeSummaryPreview recipe="{recipe}"/>
{/each}

{#if loaded && recipes.length === 0}
  <p>No more recipes</p>
{/if}

<style>

</style>

