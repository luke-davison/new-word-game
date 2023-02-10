import { wordlist } from '../../client/src/shared/utils'

const titles: string[] = [
  'Mr',
  'Mrs',
  'Miss',
  'Ms',
  'Dr',
  'Sir',
  'Lady',
  'Lord',
  'Captain'
]

export const generateNickname = () => {
  const titleIndex = Math.floor(Math.random() * titles.length)
  const wordIndex = Math.floor(Math.random() * wordlist.length)
  const word = wordlist[wordIndex]

  return titles[titleIndex] + ' ' + word.slice(0, 1)[0].toUpperCase() + word.slice(1)
}