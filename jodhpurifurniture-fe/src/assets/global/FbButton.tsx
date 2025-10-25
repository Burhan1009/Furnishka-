import { Button } from '@mui/material';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authAction } from '@/service/auth/states';
import axios from 'axios';

const FbButton = () => {
  const dispatch = useDispatch();

  const onFbLoginSuccess = (response: fb.StatusResponse) => {
 
    if (response.status === 'connected') {
      async function data() {
        const facebookFeilds = await axios.get(
          'https://graph.facebook.com/v15.0/me?fields=name,email,first_name,last_name',
          {
            headers: {
              Authorization: `Bearer ${response?.authResponse?.accessToken}`,
              'Content-Type': 'application/json',
            },
          }
        );
        const fbValues = facebookFeilds?.data ?? {};
        if (fbValues?.name &&  fbValues?.id ) {
          const dispatchValues = {
            full_name: fbValues?.name,
            email: fbValues?.email,
            social_id: fbValues?.id,
            password: '',
          };
          dispatch(authAction.socialSignUpStart(dispatchValues));
        }
      }
      data();
    } else {
  
    }
  };

  const onFbLogin = () => {
    const scope = 'email,public_profile';

    if (window?.FB)
      FB?.login(onFbLoginSuccess, {
        scope,
        return_scopes: true,
      });
  };
  return (
    <>
      {/* <FacebookLogin
        appId='137858678908475'
        autoLoad={false}
        fields='name,email,picture'
        scope='public_profile,email,user_friends'
        callback={responseFacebook}
        render={renderProps => ( */}
      <Button
        sx={{
          width: { xs:130, sm: 150 },
          fontFamily:'Jost', fontSize:{xs:14,sm:15}, p:{xs:'5px 16px',sm:'7px 16px'},
          borderRadius: '4px',
          border: '1px solid #DDDDDD',
          textTransform: 'none',
          color: '#484848',
          '&:hover': {
            backgroundColor: '#FFF0EA',

            color: '#222',
            border: '1px solid #DDDDDD',
          },
        }}
        onClick={onFbLogin}
        startIcon={<img src='/static/media/fbicon.svg' />}
        variant='outlined'>
        Facebook
      </Button>
    </>
  );
};

export default FbButton;
