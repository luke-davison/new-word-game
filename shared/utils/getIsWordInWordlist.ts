import { wordlist } from '../../shared/utils/getWordlist';

export const getIsWordInWordlist = (word: string): boolean => {
  return wordlist.indexOf(word) !== -1
}