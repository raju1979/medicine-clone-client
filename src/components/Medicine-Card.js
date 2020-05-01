import React from "react";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import { Row, Col } from "react-flexbox-grid";
import { makeStyles } from "@material-ui/core/styles";

import IconButton from "@material-ui/core/IconButton";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";


const PaperContainer = styled.div`
  background: transparent;
`;

const MedContainer = styled.div`
  padding: 5px;
`;

const useStyles = makeStyles({
  medicine_img: {
    maxWidth: "40px",
    height: "auto",
  },
  font_w700: {
    fontWeight: 700,
  },
  med_price_name: {
    fontSize: "10px",
    fontWeight: 700,
  },
  med_description_text: {
    fontSize: "10px",
    fontWeight: 400,
  },
  med_salt_text: {
    display: "inline-block",
    fontSize: "10px",
    color: "#8D9BFF",
    width: "80px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  shoppingCartContainer: {
    display: "block",
    textAlign: "right",
  },
});

const MedicineCard = ({ medicine, addToCart }) => {
  const classes = useStyles();

  return(
    <PaperContainer key={medicine.id}>
      <Paper elevation={3}>
        <MedContainer>
          <Row>
            <Col xs={3}>
              <img
                src={medicine.med_img_url}
                className={classes.medicine_img}
              />
            </Col>
            <Col xs={9}>
              <Row>
                <Col xs={8}>
                  <span className={classes.med_price_name}>
                    {medicine.med_name}
                  </span>
                </Col>
                <Col xs={4}>
                  <span className={classes.med_price_name}>
                    &#x20B9;{medicine.med_price}
                  </span>
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <span className={classes.med_description_text}>
                    {medicine.med_manufacturer}
                  </span>
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <span className={classes.med_description_text}>
                    {medicine.med_packaging}
                  </span>
                </Col>
              </Row>
              <Row middle="xs">
                <Col xs={6}>
                  <span className={classes.med_salt_text}>
                    {medicine.med_salt}
                  </span>
                </Col>
                <Col xs={6}>
                  <span className={classes.shoppingCartContainer}>
                    <IconButton
                      color="secondary"
                      aria-label="delete"
                      size="small"
                      onClick = {() => addToCart(medicine)}
                    >
                      <AddShoppingCartIcon fontSize="inherit" />
                    </IconButton>
                  </span>
                </Col>
              </Row>
            </Col>
          </Row>
        </MedContainer>
      </Paper>
    </PaperContainer>
  );
};

export default MedicineCard;
