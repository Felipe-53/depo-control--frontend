import React, { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Quantidades from './Quantidades/Quantidades.js';
import Movimentacoes from './Movimentacoes/Movimentacoes.js';
import Ajustes from './Ajustes/Ajustes.js';

/* Context used to trigger fetching action */
export const Triggers = React.createContext();

const AdminScreen = () => {
  
  /* controls which tab is visible */
  const [tabIndex, set_tabIndex] = useState(0);

  const [modal, set_modal] = useState(null);
  const [enviarAjusteFeedback, set_enviarAjusteFeedback] = useState(null);

  const [triggerFetchQuantidades, set_triggerFetchQuantidades] = useState(0);
  const [triggerFetchMovs, set_triggerFetchMovs] = useState(0);
  
  const triggers = {
    'triggerFetchQuantidades': triggerFetchQuantidades,
    'set_triggerFetchQuantidades': set_triggerFetchQuantidades,
    'triggerFetchMovs': triggerFetchMovs,
    'set_triggerFetchMovs': set_triggerFetchMovs,
  }

  const tabHitHandler = (event, newValue) => {
    set_tabIndex(newValue);
  };

  const tabSwipeHandler = (index) => {
    set_tabIndex(index);
  };

  return (
    <Triggers.Provider value={triggers}>
      {modal}

      <AppBar position="static" color="default">

        <Tabs
          value={tabIndex}
          onChange={tabHitHandler}
          variant="scrollable"
        >

          <Tab label="Quantidades" />
          <Tab label="Movimentações" />
          <Tab label="Ajustes" />
        
        </Tabs>

      </AppBar>

      {enviarAjusteFeedback}
      
      <SwipeableViews
        index={tabIndex}
        onChangeIndex={tabSwipeHandler}
        resistance={true}
        enableMouseEvents={true}
        disableLazyLoading={true}
        style={{width: '100%', height: '100%', overflowX: 'hidden'}}
        containerStyle={{width: '100%', height: '100%', overflow: 'visible'}}
        slideStyle={{
          width: '100%',
          height: '100%',
          overflowY: 'scroll',
          overflowX: 'hidden',
        }}
      >
        <Quantidades
          value={tabIndex}
          index={0}
        />
        
        <Movimentacoes
          value={tabIndex}
          index={1}
          set_modal={set_modal}
        />
        
        <Ajustes
          value={tabIndex}
          index={2}
          set_tabIndex={set_tabIndex}
          set_enviarAjusteFeedback={set_enviarAjusteFeedback}
        />
      
      </SwipeableViews>
    </Triggers.Provider>
  );
}

export default AdminScreen;
