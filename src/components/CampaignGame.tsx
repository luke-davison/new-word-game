import { observer } from 'mobx-react-lite';
import { useState } from 'react';

import { CampaignContext } from '../stores/CampaignContext';
import { CampaignStore } from '../stores/CampaignStore';
import { Game } from './Game';

export const CampaignGame: React.FC = observer(() => {
  const [campaignStore, setCampaignStore] = useState<CampaignStore>(new CampaignStore("1", 0))

  return (
    <CampaignContext.Provider value={campaignStore}>
      <Game/>
    </CampaignContext.Provider>
  )
})