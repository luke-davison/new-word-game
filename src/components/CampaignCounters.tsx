import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';

import { AppContext } from '../stores/AppContext';
import { CampaignContext } from '../stores/CampaignContext';

export const CampaignCounters: React.FC = observer(() => {
  const { isPlayingCampaignGame } = useContext(AppContext)
  const campaignStore = useContext(CampaignContext)

  if (!isPlayingCampaignGame) {
    return null
  }

  return (
    <div className="campaign-counters">
      <div className="funding-counter">
        {`${campaignStore.player.funding} extra money each game`}
      </div>
      <div className="funding-counter">
        {`${campaignStore.player.points} total points so far`}
      </div>
      <div className="member-counter">
        {`Is ${campaignStore.player.isMember ? "" : "not "} a secret club member`}
      </div>
    </div>
  )
})