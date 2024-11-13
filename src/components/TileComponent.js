import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const TileComponent = ({ activeCount, inactiveCount }) => {
  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Card>
        <CardContent>
          <Typography variant="h6">Active Securities</Typography>
          <Typography variant="h4">{activeCount}</Typography>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Typography variant="h6">Inactive Securities</Typography>
          <Typography variant="h4">{inactiveCount}</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default TileComponent;
