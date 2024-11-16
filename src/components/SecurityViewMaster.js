import React, { useState } from 'react';
import { Tabs, Tab, Box} from '@mui/material';
// import Equity from './Equity';
import Navbar from './Navbar';
import Bonds from './Bonds';
import Equity2 from './Equity2';

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
        {tabValue === 0 && (<Equity2 tabValue={tabValue}/>)}
        {tabValue === 1 && (<Bonds />)}
      </Box>
    </div>
  );
}

export default SecurityMasterPage;
