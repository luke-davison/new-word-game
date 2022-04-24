import { wordlist } from '../../common/utils/getWordlist';

export const getIsWordInWordlist = (word: string): boolean => {
  return wordlist.indexOf(word) !== -1
}