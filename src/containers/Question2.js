import React, { Component } from "react";
import { connect } from "react-redux";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { English, Hindi } from "../language";
import ProgressBar from "react-bootstrap/ProgressBar";
import styles from "./Home/styles.scss";
import { openQuestionPage, setQuestion2Data } from "../containers/Home/actions";
import "react-input-range/lib/css/index.css";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import ReactGA from "react-ga";

class Question2 extends Component {
  handleQuestion2(val, type) {
    this.props.setQuestion2Data(val.target.checked, type);
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
                  marginTop: "32%",
                  backgroundImage: `url(https://res.cloudinary.com/arorashivam-com-resume/image/upload/v1585442509/bg_2_dvlffd.png)`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  height: "100%"
                }}
              >
                <h6 style={{ padding: "10px" }}>
                  {this.props.languageValue.value === "English"
                    ? English.question2Heading
                    : Hindi.question2Heading}
                </h6>

                <div
                  className="checkBox-group"
                  style={{
                    marginTop: "30px",
                    paddingLeft: "10%"
                  }}
                  align="left"
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.props.question2Obj.diabetes}
                        onChange={val => {
                          this.handleQuestion2(val, "diabetes");
                        }}
                        inputProps={{ "aria-label": "primary checkbox" }}
                        disabled={this.props.question2Obj.noneOfTheAbove}
                      />
                    }
                    label={`${
                      this.props.languageValue.value === "English"
                        ? English.diabetes
                        : Hindi.diabetes
                    }`}
                  />

                  <br />

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.props.question2Obj.heartDisease}
                        onChange={val => {
                          this.handleQuestion2(val, "heartDisease");
                        }}
                        inputProps={{ "aria-label": "primary checkbox" }}
                        disabled={this.props.question2Obj.noneOfTheAbove}
                      />
                    }
                    label={`${
                      this.props.languageValue.value === "English"
                        ? English.heartDisease
                        : Hindi.heartDisease
                    }`}
                  />

                  <br />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.props.question2Obj.highBloodPressure}
                        onChange={val => {
                          this.handleQuestion2(val, "highBloodPressure");
                        }}
                        inputProps={{ "aria-label": "primary checkbox" }}
                        disabled={this.props.question2Obj.noneOfTheAbove}
                      />
                    }
                    label={`${
                      this.props.languageValue.value === "English"
                        ? English.bloodPressure
                        : Hindi.bloodPressure
                    }`}
                  />
                  <br />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.props.question2Obj.kidneyOrLiverDisease}
                        onChange={val => {
                          this.handleQuestion2(val, "kidneyOrLiverDisease");
                        }}
                        inputProps={{ "aria-label": "primary checkbox" }}
                        disabled={this.props.question2Obj.noneOfTheAbove}
                      />
                    }
                    label={`${
                      this.props.languageValue.value === "English"
                        ? English.kidneyLung
                        : Hindi.kidneyLung
                    }`}
                  />
                  <br />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.props.question2Obj.noneOfTheAbove}
                        onChange={val => {
                          this.handleQuestion2(val, "noneOfTheAbove");
                        }}
                        inputProps={{ "aria-label": "primary checkbox" }}
                        disabled={
                          this.props.question2Obj.diabetes ||
                          this.props.question2Obj.heartDisease ||
                          this.props.question2Obj.highBloodPressure ||
                          this.props.question2Obj.kidneyOrLiverDisease
                        }
                      />
                    }
                    label={`${
                      this.props.languageValue.value === "English"
                        ? English.noneOfTheAbove
                        : Hindi.noneOfTheAbove
                    }`}
                  />
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
                    background: "#A4D160",
                    border: " 1px solid #A4D160",
                    width: "50%",
                    right: "50%",
                    position: "absolute",
                    marginTop: "8px",
                    marginRight: "1x"
                  }}
                  onClick={() => {
                    this.props.openQuestionPage("1");
                  }}
                  size="lg"
                  block
                >
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    color="white"
                    style={{
                      marginRight: "3px",
                      fontSize: "13px",
                      marginBottom: "3px"
                    }}
                  />
                  Prev
                </Button>
                <Button
                  style={{
                    background: "#A4D160",
                    border: " 1px solid #A4D160",
                    width: "50%",
                    position: "relative",
                    left: "50%",
                    marginLeft: "1px"
                  }}
                  size="lg"
                  block
                  onClick={() => {
                    ReactGA.event({
                      category: "Click",
                      action: "Next Clicked on 2nd Question Page"
                    });
                    this.props.openQuestionPage("3");
                  }}
                  disabled={
                    !this.props.question2Obj.diabetes &&
                    !this.props.question2Obj.heartDisease &&
                    !this.props.question2Obj.highBloodPressure &&
                    !this.props.question2Obj.kidneyOrLiverDisease &&
                    !this.props.question2Obj.noneOfTheAbove
                  }
                >
                  {this.props.languageValue.value === "English"
                    ? English.next
                    : Hindi.next}
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    color="white"
                    style={{
                      marginLeft: "3px",
                      fontSize: "13px",
                      marginBottom: "3px"
                    }}
                  />
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
  question2Obj: state.postReducer.question2Obj
});

export default connect(mapStateToProps, { openQuestionPage, setQuestion2Data })(
  Question2
);
