<script lang="ts">//

import * as dayjs from 'dayjs'
import {onDestroy, onMount} from "svelte";

export let timeEnd: dayjs.Dayjs = null

let timeDiff = getDiff()
let player: HTMLAudioElement = null
$: minutes = timeDiff.minutes
$: seconds = timeDiff.seconds
let timer = null
let stopped = false

onMount(function () {
  timer = setInterval(function () {
    timeDiff = getDiff()
  })
})

onDestroy(() => {
  if (timer) {
    clearInterval(timer)
  }
})

function stopAlarm () {
  stopped = true
  if (player) player.pause()
  // TODO emit element to remove clockdown
}
function increaseAlarm (time, amount) {
  if (player) {
    player.pause()
  }

  const now = dayjs.default()
  if (timeEnd.diff(now) < 0) {
    timeEnd = now
  }
  timeEnd = timeEnd.add(time, amount)
}
function getDiff () {
  const now = dayjs.default()
  if (timeEnd.diff(now) < 0) {
    if (!stopped) {
      player.play()
    }
    return {
      minutes: 0,
      seconds: 0
    }
  }

  return {
    minutes: timeEnd.diff(now, 'minutes'),
    seconds: timeEnd.diff(now, 'seconds') % 60
  }
}

</script>

<div class="countdown">
  <span class="minutes">{minutes}</span>
  <span class="seconds">{seconds}</span>
  <button on:click={() => increaseAlarm(10, 'minute')}>+10 m</button>
  <button on:click={() => increaseAlarm(1, 'minute')}>+1 m</button>
  <button on:click={() => increaseAlarm(10, 'second')}>+10 s</button>
  <button on:click={stopAlarm}>X</button>
  <audio loop="true" src="sound/default.mp3" bind:this={player}></audio>
</div>
