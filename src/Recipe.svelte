<script lang="ts">//
import SvelteMarkdown from 'svelte-markdown'
import type { Recipe } from './recipe'
import { afterUpdate, onMount } from 'svelte'
import copy from 'copy-html-to-clipboard'
import CountDown from './Countdown.svelte'
import { timers } from './TimerStore'
import Link from './Link.svelte'
import * as dayjs from 'dayjs'

export let params = {
  recipeId: ''
}
let recipe: Recipe

onMount(async function () {
  const res = await window.fetch(`recipes/${params.recipeId}.json`)
  recipe = await res.json()

  console.log(recipe)
})
let isSideIngredientsOpen = false
let isSideTimersOpen = false
let isSidePanelOpen: boolean
$: isSidePanelOpen = isSideTimersOpen || isSideIngredientsOpen

function toggleIngredientsOpen () {
  if (isSidePanelOpen && isSideIngredientsOpen) {
    isSideIngredientsOpen = false
    isSideTimersOpen = false
  } else {
    isSideIngredientsOpen = true
    isSideTimersOpen = false
  }
}
function toggleTimersOpen () {
  if (isSidePanelOpen && isSideTimersOpen) {
    isSideTimersOpen = false
    isSideIngredientsOpen = false
  } else {
    isSideTimersOpen = true
    isSideIngredientsOpen = false
  }
}

afterUpdate(function () {
  addCopyButton(document.querySelector('.side-ingredients h3'))
  addCopyButton(document.querySelector('.main-ingredients h3'))
})

function addCopyButton (element) {
  if (!element) {
    return
  }
  if (element.querySelector('.ingredients-copy-button')) {
    return
  }
  const copyButton = document.createElement('button')
  copyButton.classList.add('icon-clipboard')
  copyButton.classList.add('ingredients-copy-button')
  copyButton.addEventListener('click', copyIngredients)
  element.appendChild(copyButton)
}

function copyIngredients () {
  const ingredientsElement = document.querySelector('.main-ingredients') || document.querySelector('.side-ingredients')
  copy(ingredientsElement.innerHTML, { asHtml: true })
}

</script>
{#if recipe}
  <div class="ingredients-side-panel side-panel" class:side-panel--open="{isSidePanelOpen}"
  class:side-panel--on-top={isSideIngredientsOpen}
  >
    <SvelteMarkdown source="{recipe.ingredientsContent}" />
  </div>

  <div class="timeouts-side-panel side-panel" class:side-panel--open="{isSidePanelOpen}"
    class:side-panel--on-top={isSideTimersOpen}
  >
    <h2>Timers</h2>
    {#each $timers as countDown}
      <CountDown timeEnd="{countDown.timeEnd}" title="{countDown.title}"/>
    {/each}
  </div>
  <div class="side-content-handler ingredients-content-handler" on:click={toggleIngredientsOpen} class:side-content-handler-opener--open="{isSidePanelOpen}">
    <p class="side-content-handler-opener">Ingredients</p>
  </div>
  <div class="side-content-handler timeouts-content-handler" on:click={toggleTimersOpen} class:side-content-handler-opener--open="{isSidePanelOpen}">
    <p class="side-content-handler-opener">Timers</p>
  </div>


  <div class="recipe-container">
    <div class="side-ingredients">
        <SvelteMarkdown source="{recipe.ingredientsContent}" />
    </div>

  <div class="cooking-container">

          <SvelteMarkdown source="{recipe.title}" />
          <SvelteMarkdown source="{recipe.img}" />
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
          <SvelteMarkdown source="{recipe.content}" renderers="{{ link: Link }}"/>
  </div>
  </div>
  {/if}



<style>

    .recipe-container {
        display: block;
    }



    .side-ingredients {
        position: fixed;
        float: left;
        margin-left: 20px;
        padding-top: 50px;
        max-width: min(33vw, calc((100vw - 1000px)));
    }


    .side-panel {
        color: white;
        align-items: center;
        box-sizing: border-box;
        padding: 20px;
        background: #b4c6d7;
        /*margin: 20px;*/
        position: fixed;
        left: calc(-1 * min(max(min(50vw, 500px), 300px), 100vw));
        width: min(max(min(50vw, 500px), 300px), 100vw);
        height: 100vh;
        top: 0vh;

        transition-timing-function: ease-in-out;
        transition-duration: 500ms;
    }


    .side-panel--open {
        transition-timing-function: ease-in-out;
        transition-duration: 500ms;
        left: 0vw;
    }

    .side-panel--on-top {
        z-index: 100;
    }



    .side-content-handler {
        position: fixed;
        display: flex;
        transform: rotate(90deg);
        transform-origin: bottom left;
        margin: 0px;

        transition-timing-function: ease-in-out;
        transition-duration: 500ms;
    }

    .ingredients-content-handler {
        top: 80vh;
        left:0vw;
    }
    .timeouts-content-handler {
        top: 70vh;
        left:0vw;
    }

    .side-content-handler-opener--open {
        transition-timing-function: ease-in-out;
        transition-duration: 500ms;
        left:min(max(min(50vw, 500px), 300px), 100vw);
    }

    .side-content-handler:after {
        position: absolute;
        content: '\00a0';
        left: -10px;
        top: 0px;
        width: 100%;
        padding: 10px;
        z-index: -1;
        border-top: 1px solid lightgrey;
        border-left: 1px solid lightgrey;
        border-right: 1px solid lightgrey;
        background: #b4c6d7;
        transform: perspective(100px) rotateX(40deg);
    }


    .side-content-handler-opener {
        color: white;
        position: relative;
        text-align: center;
        z-index: 2;
        width: 100px;
        text-decoration: none;
        display: inline-block;
        margin-bottom: 0px;
    }

    .cooking-container {
        text-align: left;
        padding: 1em;
        max-width: min(max(500px, 33vw), 100vh);
        margin: 0 auto;
    }

    :global(.cooking-container img) {
        max-width: 500px;
    }


    :global(.ingredients-copy-button) {
        margin-left: 10px;
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
        .ingredients-content-handler {
            display: none;
        }
        .ingredients-side-panel {
            display: none;
        }
    }

</style>
