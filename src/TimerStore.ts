import { Writable, writable } from 'svelte/store'
import type * as dayjs from 'dayjs'

interface TimerDefinition {
  title: string
  timeEnd: dayjs.Dayjs
}

export const timers: Writable<TimerDefinition[]> = writable([])
