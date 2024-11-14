import React, { useState } from 'react';
import { Tabs, Tab, Box} from '@mui/material';

import Bond from './Bond';
import Equity from './Equity';
import Navbar from './Navbar';

function SecurityMasterPage() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (

    <div>
      <Navbar />
      <Tabs value={tabValue} onChange={handleTabChange} centered>
        <Tab label="View Equities" />
        <Tab label="View Bonds" />
      </Tabs>

      <Box p={3}>
        {tabValue === 0 && (<Equity tabValue={tabValue}/>)}
        {tabValue === 1 && (<Bond tabValue={tabValue}/>)}
      </Box>
    </div>
  );
}

export default SecurityMasterPage;
