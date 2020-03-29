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
                  marginTop: "35%",
                  backgroundImage: `url(https://res.cloudinary.com/arorashivam-com-resume/image/upload/v1585442509/bg_2_dvlffd.png)`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  height: "100%"
                }}
              >
                <h6>
                  {this.props.languageValue.value === "English"
                    ? English.question2Heading
                    : Hindi.question2Heading}
                </h6>

                <div
                  className="checkBox-group"
                  style={{
                    marginTop: "30px",
                    paddingLeft: "9%"
                  }}
                  align="left"
                >
                  <Checkbox
                    checked={this.props.question2Obj.diabetes}
                    onChange={val => {
                      this.handleQuestion2(val, "diabetes");
                    }}
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                  {this.props.languageValue.value === "English"
                    ? English.diabetes
                    : Hindi.diabetes}
                  <br />
                  <Checkbox
                    checked={this.props.question2Obj.heartDisease}
                    onChange={val => {
                      this.handleQuestion2(val, "heartDisease");
                    }}
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                  {this.props.languageValue.value === "English"
                    ? English.heartDisease
                    : Hindi.heartDisease}
                  <br />
                  <Checkbox
                    checked={this.props.question2Obj.highBloodPressure}
                    onChange={val => {
                      this.handleQuestion2(val, "highBloodPressure");
                    }}
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                  {this.props.languageValue.value === "English"
                    ? English.bloodPressure
                    : Hindi.bloodPressure}
                  <br />
                  <Checkbox
                    checked={this.props.question2Obj.kidneyOrLiverDisease}
                    onChange={val => {
                      this.handleQuestion2(val, "kidneyOrLiverDisease");
                    }}
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                  {this.props.languageValue.value === "English"
                    ? English.kidneyLiver
                    : Hindi.kidneyLiver}
                  <br />
                  <Checkbox
                    checked={this.props.question2Obj.noneOfTheAbove}
                    onChange={val => {
                      this.handleQuestion2(val, "noneOfTheAbove");
                    }}
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                  {this.props.languageValue.value === "English"
                    ? English.noneOfTheAbove
                    : Hindi.noneOfTheAbove}
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
                    this.props.openQuestionPage("3");
                  }}
                >
                  {this.props.languageValue.value === "English"
                    ? English.next
                    : Hindi.next}
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
