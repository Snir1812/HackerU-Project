import React from "react";
import "./SidePanelBackOffice.css";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const SidePanelBackOffice = () => {
  return (
    <div className="sidePanel">
      <ListGroup.Item className="item" as={Link} to="category">
        Category
      </ListGroup.Item>
      <ListGroup.Item className="item" as={Link} to="order">
        Order
      </ListGroup.Item>
      <ListGroup.Item className="item" as={Link} to="review">
        Review
      </ListGroup.Item>
      <ListGroup.Item className="item" as={Link} to="user">
        User
      </ListGroup.Item>
      <ListGroup.Item className="item" as={Link} to="product">
        Product
      </ListGroup.Item>
    </div>
  );
};

export default SidePanelBackOffice;
