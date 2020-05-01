import React from "react";

import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";

import { makeStyles } from "@material-ui/core/styles";

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
  med_name: {
    fontWeight: "bold",
    fontSize: "15px",
  },
  med_total: {
    fontSize: "12px",
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

const ReviewListItem = ({ item, removeItemFromCart }) => {
  const classes = useStyles();

  return (
    <div key={item.item.id}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <BeachAccessIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText>
          <div>
            <span className={classes.med_name}>{item.item.med_name}</span>
          </div>
          <div>
            <span className={classes.med_total}>Qty: {item.qty}</span>
          </div>
          <div>
            <span className={classes.med_total}>
              Price: &#x20B9;{item.total}
            </span>
          </div>
        </ListItemText>
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="delete" onClick={() => removeItemFromCart(item.item.id)}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </div>
  );
};

export default ReviewListItem;
