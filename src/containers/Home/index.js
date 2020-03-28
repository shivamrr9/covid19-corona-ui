import React, { Component } from "react";
import { connect } from "react-redux";
import { Test, ApiCall, postApiCall } from "./actions.js";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import styles from "./styles.scss";
import CircularProgress from "@material-ui/core/CircularProgress";
import { English, Hindi } from "../../language";
import Select from "react-select";
import { languageOptions } from "../../configConstants";
import { languageChange, toggleShowDisclaimer } from "./actions.js";
import Disclaimer from "../Disclaimer";

class Home extends Component {
  handleLangChange(val) {
    this.props.languageChange(val);
  }

  handleShowDisclaimer() {
    this.props.toggleShowDisclaimer(true);
  }
  render() {
    console.log("props :", this.props);
    return (
      <div>
        {this.props.showDisclaimer ? (
          <Disclaimer />
        ) : (
          <Container>
            <Row className="col-center">
              <Col md={3}></Col>

              <Col md={6} style={{ textAlign: "center" }}>
                <div
                  style={{ width: "100%", marginTop: "10px", padding: "8px" }}
                >
                  <div style={{ width: "110px" }}>
                    <Select
                      isSearchable={false}
                      value={this.props.languageValue}
                      onChange={val => {
                        this.handleLangChange(val);
                      }}
                      options={languageOptions}
                    />
                  </div>
                </div>
                <h4 style={{ marginTop: "10%" }}>
                  {this.props.languageValue.value === "English"
                    ? English.heading1
                    : Hindi.heading1}
                </h4>
                <p style={{ fontSize: "15px" }}>
                  {this.props.languageValue.value === "English"
                    ? English.heading2
                    : Hindi.heading2}
                </p>
                <img
                  src="https://res.cloudinary.com/arorashivam-com-resume/image/upload/v1585416392/corona_ytm8cs.png"
                  alt="corona_virum_image"
                  style={{ marginTop: "15px" }}
                />
                <img
                  src="https://res.cloudinary.com/arorashivam-com-resume/image/upload/v1585416760/bg_1_1_dqlu64.png"
                  alt="doctor_patient"
                  width="100%"
                  style={{ marginTop: "20px" }}
                />

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
                      this.handleShowDisclaimer();
                    }}
                  >
                    {this.props.languageValue.value === "English"
                      ? English.proceedButton
                      : Hindi.proceedButton}
                  </Button>
                </div>
              </Col>

              <Col md={3}></Col>
            </Row>
          </Container>
        )}

        {this.props.visibility && (
          <div className="full-loader">
            <div className="relative">
              <div className="abs" id="full-screen-loader-wrapper">
                <CircularProgress size={50} thickness={5} />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  test: state.postReducer.test,
  response: state.postReducer.response,
  Postresponse: state.postReducer.Postresponse,
  visibility: state.postReducer.visibility,
  languageValue: state.postReducer.languageValue,
  showDisclaimer: state.postReducer.showDisclaimer
});

export default connect(mapStateToProps, {
  Test,
  ApiCall,
  postApiCall,
  languageChange,
  toggleShowDisclaimer
})(Home);
