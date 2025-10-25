import { Button } from '@mui/material';

import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authAction } from '@/service/auth/states';

const SocialButton = () => {
    const dispatch = useDispatch()
  const login = useGoogleLogin({
    onSuccess: async response => {
      try {
        const res = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );
        const dispatchValues = {
            email:res?.data?.email,
            full_name:res?.data?.name,
            password:"",
            social_id:res?.data?.sub
        }
        dispatch(authAction.socialSignUpStart(dispatchValues))
      } catch (err) {
    
      }
    },
  });

  return (
    <>
      <Button
        sx={{
          width: { xs: 130, sm: 150 },
         p:{xs:'5px 16px',sm:'7px 16px'},
          borderRadius: '4px',
          border: '1px solid #DDDDDD',
          textTransform: 'none',
          color: '#484848',
          fontFamily:'Jost', fontSize:{xs:14,sm:15},
          '&:hover': {
            backgroundColor: '#FFF0EA',

            color: '#222',
            border: '1px solid #DDDDDD',
          },
        }}
        onClick={login}
        startIcon={<img src='/static/media/googleicon.svg' />}
        variant='outlined'>
        Google
      </Button>
    </>
  );
};

export default SocialButton;
