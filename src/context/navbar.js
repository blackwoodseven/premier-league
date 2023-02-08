/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react'

import * as React from 'react';
import { Link as RouterLink, useMatch } from 'react-router-dom'
import { Logo } from 'components/logo';
import * as colors from '../styles/colors';
import { useAuth } from 'context/auth-context';

import { googleLogout } from '@react-oauth/google';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

const RouteArray = [
   { 'name': 'Teams', 'link': '/teams' },
   { 'name': 'Players', 'link': '/players' }
]

const settings = ['Logout'];
const darkTheme = createTheme({
   palette: {
      mode: 'dark',
      primary: {
         main: `${colors.text}`,
      },
   },
});

function ResponsiveAppBar({ roll, userData }) {
   const { logout } = useAuth();
   const [anchorElNav, setAnchorElNav] = React.useState(null);
   const [anchorElUser, setAnchorElUser] = React.useState(null);

   const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
   };
   const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
   };

   const handleCloseNavMenu = () => {
      setAnchorElNav(null);
   };

   const handleCloseUserMenu = () => {
      setAnchorElUser(null);
   };

   // const performRedirect = () => {
   //    return <Navigate to="/" />;
   // };
   const handleLogout = () => {
      googleLogout();
      logout();
      handleCloseUserMenu();
   };

   return (
      <ThemeProvider theme={darkTheme}>
         <AppBar position="sticky">
            <Container maxWidth="xl">
               <Toolbar disableGutters>
                  <Typography
                     variant="h6"
                     noWrap
                     component="a"
                     href="/"
                     sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        textDecoration: 'none',
                     }}
                  >
                     <Logo />
                  </Typography>

                  {/* Show box in extra small device */}
                  <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                     <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                     >
                        <MenuIcon />
                     </IconButton>
                     <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                           vertical: 'bottom',
                           horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                           vertical: 'top',
                           horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                           display: { xs: 'block', md: 'none' },
                        }}>
                        <Nav />
                     </Menu>
                  </Box>
                  {/* Show box in extra small device */}
                  <Typography
                     variant="h5"
                     noWrap
                     component="a"
                     href=""
                     sx={{
                        mr: 2,
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        textDecoration: 'none',
                     }}
                  >
                     <Logo />
                  </Typography>
                  {/* Show box in medium device */}
                  <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end', paddingRight: '20px' }}>
                     <Nav />
                  </Box>

                  <Box sx={{ flexGrow: 0 }}>
                     <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                           <Avatar alt={userData.Name} src={userData.picture} />
                        </IconButton>
                     </Tooltip>
                     <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                           vertical: 'top',
                           horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                           vertical: 'top',
                           horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                     >
                        <MenuItem key={'userName'} >
                           {/* <Typography textAlign="center">{userData.name}</Typography> */}
                           <NavLink to={`/profile`}>{userData.Name}</NavLink>
                        </MenuItem>

                        {settings.map((setting) => (
                           (setting.toLowerCase() === 'logout') ?
                              (
                                 <MenuItem key={setting} onClick={handleLogout}>
                                    <Typography textAlign="center">{setting}</Typography>
                                 </MenuItem>
                              )
                              : (
                                 <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <NavLink to={`${setting.toLowerCase()}`}>{setting}</NavLink>
                                 </MenuItem>
                              )
                        ))}
                     </Menu>
                  </Box>
               </Toolbar>
            </Container>
         </AppBar>
      </ThemeProvider>
   );
}

function NavLink(props) {
   const match = useMatch(props.to)
   return (
      <RouterLink
         css={[
            {
               width: '100%',
               height: '100%',
               color: colors.base,
               borderRadius: '2px',
               // borderLeft: '5px solid transparent',
               textDecoration: 'none'
            },
            match
               ? {
                  borderLeft: `5px solid ${colors.indigo}`
               }
               : null,
         ]}
         {...props}
      />
   )
}

function Nav(params) {
   return (
      // pages.map((page) => (
      //    <MenuItem key={page.name}>
      //       <NavLink key={page.name} to={`/${page.link}`}>{page.name}</NavLink>
      //    </MenuItem>
      // ))
      RouteArray.map((page) => (
         <MenuItem key={page.name}>
            <NavLink to={`${page.link}`}>{page.name}</NavLink>
         </MenuItem>
      ))
   )
}

export default ResponsiveAppBar;