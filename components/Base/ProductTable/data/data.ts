import { h } from 'vue'
import ArrowDownIcon from '~icons/radix-icons/arrow-down'
import ArrowRightIcon from '~icons/radix-icons/arrow-right'
import ArrowUpIcon from '~icons/radix-icons/arrow-up'
import CheckCircledIcon from '~icons/radix-icons/check-circled'
import CircleIcon from '~icons/radix-icons/circle'
import CrossCircledIcon from '~icons/radix-icons/cross-circled'
import QuestionMarkCircledIcon from '~icons/radix-icons/question-mark-circled'
import StopwatchIcon from '~icons/radix-icons/stopwatch'

export const labels = [
  {
    value: 'bug',
    label: 'Bug',
  },
  {
    value: 'feature',
    label: 'Feature',
  },
  {
    value: 'documentation',
    label: 'Documentation',
  },
]

export const statuses = [
  {
    value: false,
    label: 'ไม่รวมภาษี',
    icon: h(QuestionMarkCircledIcon),
  },
  {
    value: true,
    label: 'รวม vat',
    icon: h(CircleIcon),
  },
]

export const rates = [
  {
    value: false,
    label: '0 %',
    icon: h(QuestionMarkCircledIcon),
  },
  {
    value: true,
    label: '7 %',
    icon: h(CircleIcon),
  },
]

export const priorities = [
  {
    value: 'low',
    label: 'Low',
    icon: h(ArrowDownIcon),
  },
  {
    value: 'medium',
    label: 'Medium',
    icon: h(ArrowRightIcon),
  },
  {
    value: 'high',
    label: 'High',
    icon: h(ArrowUpIcon),
  },
]
