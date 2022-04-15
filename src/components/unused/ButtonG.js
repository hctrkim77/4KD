import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

export default function VariantButtonGroup() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
          m: 0,
        },
      }}
    >
      <ButtonGroup variant="text" aria-label="text button group">
        <Button>배달음식</Button>
        <Button>택배</Button>
      </ButtonGroup>
    </Box>
  );
}