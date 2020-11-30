import React, { useState, useContext } from 'react';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Button from '@material-ui/core/Button';
import Movimentar from './Movimentar/Movimentar.js' ;
import Confirmar from './Confirmar/Confirmar';
import Badge from '@material-ui/core/Badge';
import useStyles from './homeStyles.js';
import { NovaSoliciataoTracker } from '../Telas';

const Home = ({ screenChangeHandler, goToAdminScreen }) => {
  const classes = useStyles();

  const { feedbackSendSolicitacao } = useContext(NovaSoliciataoTracker);
  
  const [activeContainer, set_activeContainer] = useState('movimentar');
  const [badgeInvisble, set_badgeInvisible] = useState(true);

  /*  since we want the modal to fill the whole screen, we need it
  defined here intead of in Confirmar component where it would have
  access to only a limited vertical space of the screen */
  const [modalSolicitacao, set_modalSolicitacao] = useState(null);
  
  let solicitar = (
    <Movimentar
      activeContainer={activeContainer}
      screenChangeHandler={screenChangeHandler}
    />
  );

  let confirmar = (      
    <Confirmar
      activeContainer={activeContainer}
      set_modalSolicitacao={set_modalSolicitacao}
      set_badgeInvisible={set_badgeInvisible}
    />
  );

  const adminBtnHanler = () => {
    goToAdminScreen();
    screenChangeHandler('next');
  }
  
  return (
    <>
      {modalSolicitacao}

      <div className={classes.btnContainer}>
        <Button
          onClick={() => set_activeContainer('movimentar')}
          className={classes.navBtn}
          variant="contained"
          color="primary"
        >
          Movimentar
        </Button>

        <Button
          onClick={() => set_activeContainer('confirmar')}
          className={classes.navBtn}
          variant="contained"
          color="primary"
        >
          <Badge
            className={classes.badge} // sets zIndex = 'auto';
            invisible={badgeInvisble}
            variant="dot"
            color="secondary"
          >
            Confirmar
          </Badge>
        </Button>
      </div>

      {feedbackSendSolicitacao}

      {solicitar}
      {confirmar}

      <AdminBtn adminBtnHanler={adminBtnHanler} />
    </>
  );
}

export default Home;

function AdminBtn ({ adminBtnHanler }) {
  const classes = useStyles();

  const ROLE = localStorage.getItem('role');

  return ROLE === 'admin'? (
    <Button
      onClick={adminBtnHanler}
      className={classes.adminBtn}
      variant="contained"
      color="primary"
      fullWidth={true}
    >
      <ExpandLessIcon fontSize="large" />
    </Button>
  ) : null;
}