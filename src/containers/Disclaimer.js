import React, { Component } from "react";
import { connect } from "react-redux";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { English, Hindi } from "../language";
import {
  openQuestionPage,
  toggleShowDisclaimer
} from "../containers/Home/actions";

class Disclaimer extends Component {
  startQuestion(pageNumber) {
    this.props.openQuestionPage(pageNumber);
    this.props.toggleShowDisclaimer(false);
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
              <hr></hr>
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
                  style={{
                    backgroundClip: "red",
                    marginBottom: "3px",
                    background: "#A4D160",
                    border: " 1px solid #A4D160"
                  }}
                  size="lg"
                  block
                  onClick={() => {
                    this.startQuestion("1");
                  }}
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

export default connect(mapStateToProps, {
  openQuestionPage,
  toggleShowDisclaimer
})(Disclaimer);
