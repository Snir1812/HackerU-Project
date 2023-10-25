import React from "react";
import "./SidePanelBackOffice.css";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const SidePanelBackOffice = () => {
  return (
    <div className="sidePanel">
      <div className="item">
        <ListGroup.Item as={Link} to="category">
          Category
        </ListGroup.Item>
      </div>
      <div className="item">
        <ListGroup.Item as={Link} to="order">
          Order
        </ListGroup.Item>
      </div>
      <div className="item">
        <ListGroup.Item as={Link} to="review">
          Review
        </ListGroup.Item>
      </div>
      <div className="item">
        <ListGroup.Item as={Link} to="user">
          User
        </ListGroup.Item>
      </div>
      <div className="item">
        <ListGroup.Item as={Link} to="product">
          Product
        </ListGroup.Item>
      </div>
    </div>
  );
};

export default SidePanelBackOffice;
