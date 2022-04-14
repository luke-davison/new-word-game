import React from 'react';

import { CampaignStore } from './CampaignStore';

export const CampaignContext = React.createContext<CampaignStore>({} as CampaignStore);