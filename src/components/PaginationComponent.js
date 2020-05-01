import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2)
    }
  }
}));

const PaginationComponent = ({ paginationObj, handleChange }) => {
  const classes = useStyles();

  

  return (
    <div className={classes.root}>
      <Pagination
        count={paginationObj.totalPages}
        page={paginationObj.page}
        onChange={handleChange} 
        variant="outlined"
        shape="rounded"
        showFirstButton
        showLastButton
      />
    </div>
  );
};

export default PaginationComponent;
