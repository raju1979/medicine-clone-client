import React, { useState, useEffect } from "react";
import { Row, Col } from "react-flexbox-grid";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { addToCart, removeFromCart } from "../redux/Cart/cartActions";

import List from "@material-ui/core/List";

import ReviewListItem from "./Review-List-Item";

const useStyles = makeStyles({
  orderOuterContainer: {
    padding: "10px",
  },
  headingTitle: {
    fontFamily: "Roboto",
    fontWeight: 700,
    fontSize: "20px",
  },
  borderBottom: {
    borderBottom: "1px solid #cecece",
  },
  total_text: {
    fontSize: "14px",
    fontWeight: 700,
  },
  total_text_value: {
    fontSize: "14px",
    fontWeight: 700,
    color: "red",
  },
  right: {
    textAlign: "right",
  },
});

const OrderReview = ({ cart, addToCart, removeFromCart }) => {
  const classes = useStyles();
  const [cartItems, setCartItems] = useState([]);
  const [cartValue, setCartValue] = useState(0);

  useEffect(() => {
    const localCartItemArr = [];
    for (let key in cart.items) {
      console.log(cart.items[key]);
      localCartItemArr.push(cart.items[key]);
    }
    setCartItems(localCartItemArr);
    setCartValue(cart.cartTotal);
  }, [cart]);

  const removeItemFromCart = (id) => {
      console.log("ID", id);
      removeFromCart(id);
  }

  return (
    <div className={classes.orderOuterContainer}>
      <Row>
        <Col xs={12}>
          <p className={`${classes.headingTitle} ${classes.borderBottom}`}>
            OrderSummary
          </p>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={8}>
          <Row>
            <Col xs={12}>
              <p className={`${classes.headingTitle} ${classes.borderBottom}`}>
                Items
              </p>
            </Col>
            <Col xs={12}>
              {cartItems.length > 0 ? (
                <List className={classes.root}>
                  {cartItems.map((item, index) => (
                    <ReviewListItem key={item.item.id} item={item} removeItemFromCart={removeItemFromCart} />
                  ))}
                </List>
              ) : null}
            </Col>
          </Row>
          <Row>
            <Col xsOffset={8} xs={4} className={classes.right}>
              <span className={classes.total_text}>Total: </span>
              <span className={classes.total_text_value}>
                &#x20B9;{cart.cartTotal}
              </span>
            </Col>
          </Row>
        </Col>
        <Col xs={12} md={4}>
          <p className={`${classes.headingTitle} ${classes.borderBottom}`}>
            Payment
          </p>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    medicines: state.medicines,
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    addToCart: (item) => dispatch(addToCart(item)),
    removeFromCart: (itemId) => dispatch(removeFromCart(itemId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderReview);
