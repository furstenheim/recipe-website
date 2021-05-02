<script lang="ts">//
import * as dayjs from 'dayjs'
import { timers } from './TimerStore'
export let href:string = ''
export let title

const isTimerLink = href.startsWith('timer:')
let isTimerCorrect = false
let timerUnit
let timerAmount
let text
if (isTimerLink) {
  const parameters = href.substring(6)
  const [time, unit] = parameters.split(':')
  if (parseInt(time) && ['minutes', 'hours', 'seconds'].includes(unit)) {
    isTimerCorrect = true
    timerUnit = unit
    timerAmount = time
  } else {
    console.error('Wrong timer', href)
  }
}

function onClick () {
  timers.update(function (actualTimers) {
    actualTimers.push({ timeEnd: dayjs.default().add(timerAmount, timerUnit), title: text || 'Timer' })
    return actualTimers
  })
}
</script>

{#if isTimerCorrect}
  <span contenteditable="true" class="hidden" bind:textContent={text}><slot></slot></span>
  <span class="icon-history" on:click={onClick}></span>
{:else if isTimerLink}
  <span class="icon-exclamation-circle"></span>
{:else}
<a {href} {title}><slot></slot></a>
{/if}

<style>
.icon-history {
    font-size: x-large;
}
.icon-exclamation-circle {
    font-size: x-large;
}

.hidden {
    display: none;
}

</style>
