import withStyles from '@material-ui/core/styles/withStyles';
import { Paper } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';


const styles = theme => ({
  wrapper: {
    width: '100%',
    padding: theme.spacing.unit,
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing.unit * 2,
    },
  },
  paper: {
    width: '95%',
    overflowX: 'auto',
    padding: theme.spacing.unit * 2,
    borderRadius: '15px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing.unit * 4,
    },
  },
});

const PaddedPaper = ({ children, classes }) => (
  <div className={classes.wrapper}>
    <Paper className={classes.paper}>
      {children}
    </Paper>
  </div>
);

PaddedPaper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default withStyles(styles)(PaddedPaper);
