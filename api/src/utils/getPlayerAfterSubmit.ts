import { ICampaignGame, IPlayer, ISubmitCampaignWord } from "../../../common/datamodels";
import { convertWordToLetters } from "../utils/convertWordToLetters";
import { getWordPoints } from "../../../common/utils/getWordPoints"
import { getNextEndOfCampaignDateString } from "../utils/getNextEndOfCampaignDateString";
import { getDateFromString } from "../../../common/utils";
import { getFundingFromLetters } from "../utils/getFundingFromLetters";
import { Abilities } from "../../../common/enums";
import { getInventoryAfterSubmit } from "../utils/getInventoryAfterSubmit";

export const getPlayerAfterSubmit = (body: ISubmitCampaignWord, campaignGame: ICampaignGame, player?: IPlayer): IPlayer => {

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
