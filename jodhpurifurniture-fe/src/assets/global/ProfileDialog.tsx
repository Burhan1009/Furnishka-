import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Avatar, Box, Grid, List, ListItem } from '@mui/material';
import Link from "next/link";
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAuth,
  selectAuthData,
  selectUserDetail,
} from '@/service/auth/globalstate';
import { authAction } from '@/service/auth/states';
import Heart from '../../../Icon/heart.svg';
import { useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import { clearCart } from '@/service/cart/cart';
import { makeStyles } from '@mui/styles';

interface IPageHeaderRequiredProps {
  isPopupOpen?: any;
  onMouseLeave?: any;
  handlePopupClose?: any;
}
export default function BasicPopover({
  isPopupOpen,
  handlePopupClose,
  onMouseLeave
}: IPageHeaderRequiredProps) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const auth = useSelector(selectAuth);
  const authData = auth?.length > 0 ? auth[0] : '';
  const userDetail = useSelector(selectUserDetail);

  const router = useRouter();
  
  React.useEffect(() => {
    dispatch(authAction.getUserDetail(authData?.user_id));
  }, []);

  const handleLogout = () => {
    dispatch(authAction.logOut());
    dispatch(clearCart());
    handlePopupClose(null);
    queryClient.invalidateQueries('user-cart');
    router.push('/');
  };
  const popoverAnchor = React.useRef(null);

  

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const useStyles = makeStyles(theme => ({
    popover: {
      pointerEvents: "none"
    },
    popoverContent: {
      pointerEvents: "auto",
      // padding: theme.spacing(1)
    }
  }));


  const open = Boolean(isPopupOpen);

  return (
    <div>
       
      <Popover
      sx={{
       mt: 1.5 ,
      }}
      
        open={open}
        anchorEl={isPopupOpen}
        // onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        // onMouseLeave={onMouseLeave}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
       
        >
        <Box sx={{ p: 2, minWidth: 280,}}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {/* <Avatar sx={{ width: 50, height: 50 }} /> */}
            <Grid sx={{ml:1.5, }}>
              <Typography sx={{textTransform:'capitalize',fontFamily:'Jost'}} fontWeight={550}>
                {userDetail?.full_name ?? ''}
              </Typography>
              <Typography sx={{fontFamily:'Jost'}} color='#767676' component='body'>
                {authData?.email ?? ''}
              </Typography>
            </Grid>
          </Box>
          <List sx={{ ml: -1 }}>
            <ListItem>
              <Link href={'/my-account/account/edit/' + authData.user_id}>
                <div style={{ display: 'flex', gap: 15 ,fontFamily:'Jost'}}>
                  <img src={'/static/images/userDialog.svg'} />
                  <a className='link-hover'>My Account </a>
                </div>
              </Link>
            </ListItem>
            <ListItem>
              <Link href='/my-account/myorders'>
                <div style={{ display: 'flex', gap: 15,fontFamily:'Jost' }}>
                  <img src={'/static/images/shopping-bag.svg'} />
                  <a className='link-hover'>My Orders</a>
                </div>
              </Link>
            </ListItem>
            
            <ListItem>
              <Link href='/my-account/wishlist'>
                <div style={{ display: 'flex', gap: 15 ,fontFamily:'Jost'}}>
                  <img src={'/static/images/heart1.svg'} />
                  <a style={{ marginLeft: 0 }} className='link-hover'>
                    My Wishlist
                  </a>
                </div>
              </Link>
            </ListItem>
            
            <ListItem>
              <Typography
                sx={{ cursor: 'pointer', ml: 0.2 }}
                onClick={handleLogout}>
                <div style={{ display: 'flex', gap: 15,fontFamily:'Jost' }}>
                  <img src={'/static/images/log-out.svg'} />
                  <a className='link-hover'>Logout</a>
                </div>
              </Typography>
            </ListItem>
          </List>
        </Box>
      </Popover>
    </div>
  );
}
