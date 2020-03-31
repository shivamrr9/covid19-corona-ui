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
import { languageChange, toggleShowDisclaimer } from "./actions";
import Disclaimer from "../Disclaimer";
import Question1 from "../Question1";
import Question2 from "../Question2";
import Question3 from "../Question3";
import Question4 from "../Question4";
import Question5 from "../Question5";
import Result from "../Result";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDotCircle } from "@fortawesome/free-solid-svg-icons";

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
        {this.props.showDisclaimer && this.props.currentPageNumber == 0 && (
          <Disclaimer />
        )}
        {!this.props.showDisclaimer && this.props.currentPageNumber == 0 && (
          <Container>
            <Row className="col-center">
              <Col md={3}></Col>

              <Col md={6} style={{ textAlign: "center", height: "75vh" }}>
                <div
                  style={{
                    width: "100%",
                    marginTop: "10px",
                    padding: "8px",
                    display: "flex"
                  }}
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
                  <div
                    style={{
                      background: "#E04F51",
                      border: "1px solid #E04F51",
                      paddingLeft: "6px",
                      paddingRight: "6px",
                      borderRadius: "18px",
                      position: "fixed",
                      right: "4%"
                    }}
                  >
                    <a
                      href="https://coronariskcalculator.in/news"
                      target="_blank"
                      style={{ textDecoration: "none" }}
                    >
                      <span style={{ color: "white", fontSize: "12px" }}>
                        <FontAwesomeIcon
                          icon={faDotCircle}
                          color="white"
                          style={{
                            marginRight: "3px",
                            fontSize: "7px",
                            marginBottom: "3px"
                          }}
                        />{" "}
                        {this.props.languageValue.value === "English"
                          ? English.checkLiveUpdates
                          : Hindi.checkLiveUpdates}
                      </span>
                    </a>
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
                  style={{ marginTop: "15px" }}
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

        {this.props.currentPageNumber == 1 && <Question1 />}
        {this.props.currentPageNumber == 2 && <Question2 />}
        {this.props.currentPageNumber == 3 && <Question3 />}
        {this.props.currentPageNumber == 4 && <Question4 />}
        {this.props.currentPageNumber == 5 && <Question5 />}
        {this.props.currentPageNumber == 6 && <Result />}

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
  showDisclaimer: state.postReducer.showDisclaimer,
  currentPageNumber: state.postReducer.currentPageNumber
});

export default connect(mapStateToProps, {
  Test,
  ApiCall,
  postApiCall,
  languageChange,
  toggleShowDisclaimer
})(Home);
