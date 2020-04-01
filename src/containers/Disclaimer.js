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
import ReactGA from "react-ga";

class Disclaimer extends Component {
  startQuestion(pageNumber) {
    ReactGA.event({
      category: "Click",
      action: "Accept and Continue on Disclaimer Page"
    });
    this.props.openQuestionPage(pageNumber);
    this.props.toggleShowDisclaimer(false);
  }
  render() {
    return (
      <div>
        <Container>
          <Row className="col-center">
            <Col md={3}></Col>
            <Col md={6} style={{ textAlign: "left" }}>
              <h3 style={{ paddingTop: "25px", paddingLeft: "10px" }}>
                {this.props.languageValue.value === "English"
                  ? English.disclaimerHeading
                  : Hindi.disclaimerHeading}
              </h3>
              <hr></hr>
              <h5
                style={{
                  paddingLeft: "10px",
                  fontFamily: "serif",
                  paddingRight: "10px",
                  fontSize: "18px",
                  paddingTop: "15px",
                  paddingBottom: "25px"
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
                    background: "#A4D160",
                    border: " 1px solid #A4D160"
                  }}
                  size="lg"
                  block
                  onClick={() => {
                    this.startQuestion("1");
                  }}
                >
                  {this.props.languageValue.value === "English"
                    ? English.acceptAndContinue
                    : Hindi.acceptAndContinue}
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
