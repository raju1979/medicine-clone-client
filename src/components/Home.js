import React, { useState, useEffect } from "react";
import Grid from "react-css-grid";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { getMedicines } from "../redux/Medicine/medicineActions";
import Button from '@material-ui/core/Button';
import { Row, Col } from "react-flexbox-grid";
import { addToCart } from '../redux/Cart/cartActions';

import MedicineCard from './Medicine-Card';

const HomeContainer = styled.div`
  padding: 10px;
  font-family: "Roboto";
`;



const useStyles = makeStyles({
  navigationContainer: {
    marginTop: '20px'
  }
});

const Home = (props) => {
  const classes = useStyles();

  useEffect(() => {
    const medicinesLength = props.medicines.medicines.length;
    if(medicinesLength == 0) {
      props.getMedicines({first: true});
    } else {
      props.getMedicines({first: false, lastDoc: props.medicines.medicines[medicinesLength - 1]});
    }
    
  }, []);

  const fetchNext = () => {
    console.log('get more');
    const medicinesLength = props.medicines.medicines.length;
    props.getMedicines({first: false, lastDoc: props.medicines.lastVisible, forward: true});
  }

  const fetchPrevious = () => {
    console.log('get more');
    const medicinesLength = props.medicines.medicines.length;
    props.getMedicines({first: false, lastDoc: props.medicines.lastVisible,forward: false});
  }

  const addToCart = (item) => {
    console.log('ITEM is :: ', item);
    props.addToCart(item);

  }

  return (
    <HomeContainer>
      {props.medicines.medicines.length > 0 ? (
        <Grid width={250} gap={10}>
          {props.medicines.medicines.map((medicine, index) => (
            <MedicineCard medicine={medicine} key={medicine.id} addToCart={addToCart} />
          ))}
        </Grid>
      ) : (
        <div>Load More</div>
      )}
      <Row around="xs" className={classes.navigationContainer}>
        <Button variant="contained" color='primary' onClick={fetchPrevious}>Previous</Button>
        <Button variant="contained" onClick={fetchNext}>Next</Button>
      </Row>
    </HomeContainer>
  );
};

const mapStateToProps = (state, props) => {
  return {
    medicines: state.medicines,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    getMedicines: (options) => dispatch(getMedicines(options)),
    addToCart: (item) => dispatch(addToCart(item))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
