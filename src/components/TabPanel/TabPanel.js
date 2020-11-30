import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  
  tabPanel: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxHeight: '100%',
  },

}));
  
  
const TabPanel = ({ children, value, index }) => {
  
  const classes = useStyles();

  return (
    <Box className={classes.tabPanel} hidden={value !== index}>
      {children}
    </Box>
      
  );
}

export default TabPanel;