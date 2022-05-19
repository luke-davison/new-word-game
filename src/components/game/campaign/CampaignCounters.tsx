import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';

import { AppContext } from '../../../stores/AppContext';

export const CampaignCounters: React.FC = observer(() => {
  const { isPlayingCampaignGame, player } = useContext(AppContext)

  if (!isPlayingCampaignGame) {
    return null
  }

  return (
    <div className="campaign-counters">
      <div className="funding-counter">
        {`${player?.funding || 0} extra money each game`}
      </div>
      <div className="funding-counter">
        {`${player?.points || 0} total points so far`}
      </div>
      <div className="member-counter">
        {`Is ${player?.isMember ? "" : "not "} a secret club member`}
      </div>
    </div>
  )
})