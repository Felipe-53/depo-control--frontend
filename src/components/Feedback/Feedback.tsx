import React from 'react';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

type FeedbackProps = {
  type: "success" | "error",
  message: string,
  closeHandler: React.Dispatch<React.SetStateAction<null>>
}

const Feedback = ({ type, message, closeHandler }: FeedbackProps) => {

  const closeButton = (
    <IconButton 
    color="inherit"
    size="small"
    onClick={() => closeHandler(null)}
    >
      <CloseIcon fontSize="inherit" />
    </IconButton>
  );

  return (
    <Alert style={{width: '100%'}} severity={type} action={closeButton}>
      {message}
    </Alert>
  );
}

export default Feedback;
