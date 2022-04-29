import { ICampaignGame, IPlayer, ISubmitWord } from '../../../shared/datamodels';
import { Abilities } from '../../../shared/enums';
import { getDateFromString } from '../../../shared/utils';
import { getWordPoints } from '../../../shared/utils/getWordPoints';
import { convertWordToLetters } from '../utils/convertWordToLetters';
import { getFundingFromLetters } from '../utils/getFundingFromLetters';
import { getInventoryAfterSubmit } from '../utils/getInventoryAfterSubmit';
import { getNextEndOfCampaignDateString } from '../utils/getNextEndOfCampaignDateString';

export const getPlayerAfterSubmit = (body: ISubmitWord, campaignGame: ICampaignGame, player?: IPlayer): IPlayer => {

  const letters = convertWordToLetters(body.word, campaignGame, player)

  const points = (player?.points || 0) + getWordPoints(letters)
  const funding = (player?.funding || 0) + getFundingFromLetters(letters)
  const isMember = player?.isMember || letters.some(letter => letter.ability === Abilities.Club)
  const inventory = getInventoryAfterSubmit(letters, player?.inventory)
  const lastSubmit = campaignGame.date

  const newPlayer: IPlayer = {
    startDate: player?.startDate || campaignGame.date,
    endDate: player?.endDate || getNextEndOfCampaignDateString(getDateFromString(campaignGame.date)),
    userId: player?.userId || body.userId,
    inventory,
    isMember,
    funding,
    points,
    lastSubmit
  }

  return newPlayer
}
