import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import SidePanelBackOffice from "../../components/sidePanelBackOffice/SidePanelBackOffice";
import "./BackOffice.css";

const BackOffice = () => {
  return (
    <div className="backOfficeDivision">
      <Container
        fluid
        className="text-center d-flex justify-content-center align-items-center"
      >
        <Row className="w-100">
          <Col md={9} className="w-100">
            <Outlet />
          </Col>
        </Row>
      </Container>
      <SidePanelBackOffice />
    </div>
  );
};

export default BackOffice;
