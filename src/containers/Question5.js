import React, { Component } from "react";
import { connect } from "react-redux";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { English, Hindi } from "../language";
import ProgressBar from "react-bootstrap/ProgressBar";
import styles from "./Home/styles.scss";
import InputRange from "react-input-range";
import {
  selectedTemprature,
  selectedContactAns,
  openQuestionPage
} from "../containers/Home/actions";
import "react-input-range/lib/css/index.css";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

class Question5 extends Component {
  handleContactAnsChange(event) {
    this.props.selectedContactAns(event.target.value);
  }
  handleTempratureChange(event) {
    this.props.selectedTemprature(event.target.value);
  }
  render() {
    console.log("props :", this.props);
    return (
      <div>
        <Container>
          <Row className="col-center">
            <Col md={3}></Col>
            <Col md={6} style={{ height: "75vh" }}>
              <div style={{ width: "100%" }}>
                <img
                  src="https://res.cloudinary.com/arorashivam-com-resume/image/upload/v1585416392/corona_ytm8cs.png"
                  alt="corona_virum_image"
                  style={{ marginTop: "15px", float: "left", padding: "2px" }}
                  height="70"
                  width="20%"
                />
                <div
                  style={{
                    float: "left",
                    width: "80%",
                    marginTop: "20px",
                    padding: "10px"
                  }}
                >
                  <h6>
                    {this.props.languageValue.value === "English"
                      ? English.heading1
                      : Hindi.heading1}
                  </h6>
                  <hr style={{ marginBottom: "9px", marginTop: "0px" }}></hr>
                  <ProgressBar
                    variant="success"
                    now={this.props.questionProgress}
                  />
                </div>
              </div>
              <div
                className="main-body"
                style={{
                  textAlign: "center",
                  marginTop: "35%",
                  backgroundImage: `url(https://res.cloudinary.com/arorashivam-com-resume/image/upload/v1585442509/bg_2_dvlffd.png)`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  height: "100%",
                  paddingBottom: "20px",
                  overflow: "scroll"
                }}
              >
                <h6 style={{ padding: "6px" }}>
                  {this.props.languageValue.value === "English"
                    ? English.question5Heading
                    : Hindi.question5Heading}
                </h6>
                <div
                  className="temprature-container"
                  style={{
                    marginTop: "14px",
                    paddingLeft: "9%"
                  }}
                  align="left"
                >
                  <RadioGroup
                    aria-label="tempratureSelection"
                    name="tempratureSelection"
                    value={this.props.tempratureSelectedByUser}
                    onChange={event => {
                      this.handleTempratureChange(event);
                    }}
                  >
                    <FormControlLabel
                      value="98.6"
                      control={<Radio />}
                      label={
                        this.props.languageValue.value === "English"
                          ? English.tempOption1
                          : Hindi.tempOption1
                      }
                    />
                    <FormControlLabel
                      value="102"
                      control={<Radio />}
                      label={
                        this.props.languageValue.value === "English"
                          ? English.tempOption2
                          : Hindi.tempOption2
                      }
                    />
                    <FormControlLabel
                      value="104"
                      control={<Radio />}
                      label={
                        this.props.languageValue.value === "English"
                          ? English.tempOption3
                          : Hindi.tempOption3
                      }
                    />
                  </RadioGroup>
                </div>
                <hr
                  style={{
                    marginTop: "5px",
                    marginBottom: "5px",
                    padding: "2px"
                  }}
                ></hr>
                <h6 style={{ padding: "6px" }}>
                  {this.props.languageValue.value === "English"
                    ? English.question5Heading2
                    : Hindi.question5Heading2}
                </h6>
                <div
                  className="temprature-container"
                  style={{
                    marginTop: "14px",
                    paddingLeft: "9%"
                  }}
                  align="left"
                >
                  <RadioGroup
                    aria-label="tempratureSelection"
                    name="tempratureSelection"
                    value={this.props.contactAnsSelectedByUser}
                    onChange={event => {
                      this.handleContactAnsChange(event);
                    }}
                  >
                    <FormControlLabel
                      value="yes"
                      control={<Radio />}
                      label={
                        this.props.languageValue.value === "English"
                          ? English.yes
                          : Hindi.yes
                      }
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio />}
                      label={
                        this.props.languageValue.value === "English"
                          ? English.no
                          : Hindi.no
                      }
                    />
                    <FormControlLabel
                      value="don't know"
                      control={<Radio />}
                      label={
                        this.props.languageValue.value === "English"
                          ? English.dontKnow
                          : Hindi.dontKnow
                      }
                    />
                  </RadioGroup>
                </div>
              </div>
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
                    this.props.openQuestionPage("6");
                  }}
                >
                  {this.props.languageValue.value === "English"
                    ? English.resultButton
                    : Hindi.resultButton}
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
  languageValue: state.postReducer.languageValue,
  questionProgress: state.postReducer.questionProgress,
  tempratureSelectedByUser: state.postReducer.tempratureSelectedByUser,
  contactAnsSelectedByUser: state.postReducer.contactAnsSelectedByUser
});

export default connect(mapStateToProps, {
  selectedTemprature,
  selectedContactAns,
  openQuestionPage
})(Question5);
