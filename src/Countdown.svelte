<script lang="ts">//

import * as dayjs from 'dayjs'
import {onDestroy, onMount} from "svelte";

export let timeEnd: dayjs.Dayjs = null

let timeDiff = getDiff()
$: minutes = timeDiff.minutes
$: seconds = timeDiff.seconds
let timer = null

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

function getDiff () {
  const now = dayjs.default()
  if (timeEnd.diff(now) < 0) {
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
</div>
