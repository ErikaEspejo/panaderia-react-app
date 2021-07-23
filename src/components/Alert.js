import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';

export default function Alert({ severity, message }) {
  return (
    <MuiAlert elevation={6} variant="filled" severity={severity}>
      {message}
    </MuiAlert>
  );
}

Alert.propTypes = {
  /**
   * Which message will display
   */
  message: PropTypes.string,
  /**
   * Severity
   */
  severity: PropTypes.oneOf(['error', 'warning', 'info', 'success']),
};

Alert.defaultProps = {
  message: '',
  severity: 'warning',
};
