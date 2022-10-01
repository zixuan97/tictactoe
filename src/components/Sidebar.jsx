import { AccountBox, People } from '@mui/icons-material';
import { Button, Divider, Drawer, Toolbar } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

const Sidebar = (props) => {
  return (
    <div>
      <Drawer
        variant='permanent'
        anchor='left'
        sx={{
          width: props.sidebarWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: props.sidebarWidth,
            boxSizing: 'border-box'
          }
        }}
      >
        <Toolbar>
          <Button
            variant='text'
            component={Link}
            to='/'
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            Tictactoe
          </Button>
        </Toolbar>
        <Divider />
        <ProSidebar>
          <Menu iconShape='square'>
            <MenuItem icon={<People />}>
              <Link to='games'>Games</Link>
            </MenuItem>
            <MenuItem icon={<AccountBox />}>
              <Link to='profile'>My Profile</Link>
            </MenuItem>
          </Menu>
        </ProSidebar>
      </Drawer>
    </div>
  );
};

export default Sidebar;
