import {Box, CssBaseline, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, styled } from '@mui/material'
import React from 'react'
import MuiAppBar from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CategoryIcon from '@mui/icons-material/Category';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import { useTheme } from '@emotion/react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
const drawerWidth = 240;
const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
  });
const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between",
  });
  const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  });
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));
  
  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      }),
      ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      }),
    }),
  );
const AdminSidebar = () => {
  const navigate = useNavigate()
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
      };
      const handleDrawerClose = () => {
        setOpen(false);
      };
      const handleLogout = () => {
        localStorage.removeItem('admintoken');
        navigate("/login")
      };
  return (
    <>
      <Box sx={{ display: 'flex',  }}>
      <CssBaseline />
      <AppBar sx={{backgroundColor:"#098B20"}} position="fixed" 
      open={open}
      >
        <StyledToolbar>
          <Box sx={{display:'flex',justifyContent:"space-around",alignItems:"center"}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            AlMuqtadir Admin Panel
          </Typography>
          </Box>
          <Box sx={{display:'flex',justifyContent:"end",alignItems:"center"}}>
          
          {/* <Box sx={{marginRight:2}}>
          <Badge badgeContent={admin&& admin.notification? admin.notification.length:null} color="primary">
         <Link to={"/admin_notification"}> <NotificationsIcon sx={{color:'white'}}/> </Link>
            </Badge>
            
          </Box> */}

          </Box>
        </StyledToolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} >
        <Box sx={{ backgroundImage: 'linear-gradient(to bottom, #023611, #046B15,#098B20)',height:'100%'}}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon sx={{color:'#ffffff'}}/>}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <List>
        <ListItem 
        onClick={()=>{navigate("/")}}
         disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  color:'#ffffff',
                
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color:'#ffffff'
                  }}
                >
                 <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" sx={{ opacity: open ? 1 : 0, }} />
              </ListItemButton>
            </ListItem>
        </List>

        <List>
        <ListItem 
        onClick={()=>{navigate("/collection")}}
          disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  color:'#ffffff',
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color:'#ffffff',
                  }}
                >
                 <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary="Collections" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
        </List>
        <List>
        <ListItem 
        onClick={()=>{navigate("/product")}}
           disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  color:'#ffffff',
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color:'#ffffff',
                  }}
                >
                 <CheckroomIcon />
                </ListItemIcon>
                <ListItemText primary="Products" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
        </List>
        
        <List>
        <ListItem 
        onClick={()=>{navigate("/banner")}}
          disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  color:'#ffffff',
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color:'#ffffff',
                  }}
                >
                  <ViewCarouselIcon /> 
                </ListItemIcon> 
                <ListItemText primary="Banners" sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
           </ListItem> 
    
      </List>
      <List>
      <ListItem 
        onClick={()=>{navigate("/orders")}}
          disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  color:'#ffffff',
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color:'#ffffff',
                  }}
                >
                  <LocalShippingIcon /> 
                </ListItemIcon> 
                <ListItemText primary="Orders" sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
           </ListItem> 
      </List>
      <List>
      <ListItem 
        onClick={()=>{navigate("/users")}}
          disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  color:'#ffffff',
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color:'#ffffff',
                  }}
                >
                  <PersonIcon /> 
                </ListItemIcon> 
                <ListItemText primary="Orders" sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
           </ListItem> 
      </List>
      <List>
        <ListItem 
        onClick={handleLogout}
          disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  color:'#ffffff',
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color:'#ffffff',
                  }}
                >
                 <ExitToAppIcon/>
                </ListItemIcon>
                <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
        </List>
        </Box>
       

       
     

       

      


        {/* <List>
        <ListItem 
        // onClick={()=>{navigate("/admin_Appointment_page")}}
          disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                 {/* <DateRangeIcon /> */}
                {/* </ListItemIcon>
                <ListItemText primary="Appointments" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton> */}
            {/* </ListItem> */}
        {/* </List> */} 
      
      </Drawer>
     
    </Box>
    </>
  )
}

export default AdminSidebar
