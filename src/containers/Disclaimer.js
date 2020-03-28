import React, { Component } from "react";
import { connect } from "react-redux";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { English, Hindi } from "../language";

class Disclaimer extends Component {
  handleLangChange(val) {
    console.log("value on index: ", val);
    this.props.languageChange(val);
  }
  render() {
    console.log("props :", this.props);
    return (
      <div>
        <Container>
          <Row className="col-center">
            <Col md={3}></Col>
            <Col md={6} style={{ textAlign: "left" }}>
              <h2 style={{ paddingTop: "25px", paddingLeft: "10px" }}>
                Disclaimer
              </h2>

              <h5
                style={{
                  paddingLeft: "10px",
                  fontFamily: "arial",
                  paddingRight: "10px",
                  fontSize: "20px",
                  paddingTop: "15px"
                }}
              >
                {this.props.languageValue.value === "English"
                  ? English.disclaimer
                  : Hindi.disclaimer}
              </h5>
              <div
                style={{
                  position: "fixed",
                  bottom: "0",
                  width: "100%",
                  right: "0"
                }}
              >
                <Button
                  style={{ backgroundClip: "red", marginBottom: "3px" }}
                  size="lg"
                  block
                >
                  Accept and Continue
                </Button>
              </div>
            </Col>
            <Col md={3}></Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  languageValue: state.postReducer.languageValue
});

export default connect(mapStateToProps, {})(Disclaimer);
