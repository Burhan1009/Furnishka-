import React from 'react';
import { Typography, Grid } from '@mui/material';
import Link from 'next/link';

const Noproduct = () => {
  return (
    <>
      <Grid mt={10}>
        <Typography variant='h4' align='center'>
          This product is not available currently
        </Typography>
        <Link href="/">
          {' '}
          <Typography mt={5} align='center'>
            <button className='back-to-home'>Back to Home</button>
          </Typography>
        </Link>
      </Grid>
    </>
  );
};

export default Noproduct;
