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
  openQuestionPage,
  setQuestion4Data,
  fetchRawData
} from "../containers/Home/actions";
import "react-input-range/lib/css/index.css";
import Radio from "@material-ui/core/Radio";
import Checkbox from "@material-ui/core/Checkbox";

class Question4 extends Component {
  handleCheckBoxChange(val, type) {
    this.props.setQuestion4Data(val.target.checked, type);
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
                <h6 style={{ padding: "10px" }}>
                  {this.props.languageValue.value === "English"
                    ? English.question4Heading
                    : Hindi.question4Heading}
                </h6>
                <div
                  style={{
                    marginTop: "10px",
                    paddingLeft: "9%",
                    overflow: "scroll",
                    height: "80%",
                    paddingBottom: "20px"
                  }}
                  align="left"
                >
                  <Checkbox
                    checked={this.props.question4Obj.dryCough}
                    onChange={val => {
                      this.handleCheckBoxChange(val, "dryCough");
                    }}
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                  {this.props.languageValue.value === "English"
                    ? English.dryCough
                    : Hindi.dryCough}
                  <br />
                  <Checkbox
                    checked={this.props.question4Obj.soreThroat}
                    onChange={val => {
                      this.handleCheckBoxChange(val, "soreThroat");
                    }}
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                  {this.props.languageValue.value === "English"
                    ? English.soreThroat
                    : Hindi.soreThroat}
                  <br />
                  <Checkbox
                    checked={this.props.question4Obj.lossOfSmell}
                    onChange={val => {
                      this.handleCheckBoxChange(val, "lossOfSmell");
                    }}
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                  {this.props.languageValue.value === "English"
                    ? English.lossOfSmell
                    : Hindi.lossOfSmell}
                  <br />
                  <Checkbox
                    checked={this.props.question4Obj.weakness}
                    onChange={val => {
                      this.handleCheckBoxChange(val, "weakness");
                    }}
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                  {this.props.languageValue.value === "English"
                    ? English.weakness
                    : Hindi.weakness}
                  <br />
                  <Checkbox
                    checked={this.props.question4Obj.changeAppetite}
                    onChange={val => {
                      this.handleCheckBoxChange(val, "changeAppetite");
                    }}
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                  {this.props.languageValue.value === "English"
                    ? English.changeAppetite
                    : Hindi.changeAppetite}
                  <br />
                  <Checkbox
                    checked={this.props.question4Obj.severeCough}
                    onChange={val => {
                      this.handleCheckBoxChange(val, "severeCough");
                    }}
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                  {this.props.languageValue.value === "English"
                    ? English.severeCough
                    : Hindi.severeCough}
                  <br />
                  <Checkbox
                    checked={this.props.question4Obj.difficultyInBreathing}
                    onChange={val => {
                      this.handleCheckBoxChange(val, "difficultyInBreathing");
                    }}
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                  {this.props.languageValue.value === "English"
                    ? English.difficultyInBreathing
                    : Hindi.difficultyInBreathing}
                  <br />
                  <Checkbox
                    checked={this.props.question4Obj.drowsiness}
                    onChange={val => {
                      this.handleCheckBoxChange(val, "drowsiness");
                    }}
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                  {this.props.languageValue.value === "English"
                    ? English.drowsiness
                    : Hindi.drowsiness}
                  <br />
                  <Checkbox
                    checked={this.props.question4Obj.painInChest}
                    onChange={val => {
                      this.handleCheckBoxChange(val, "painInChest");
                    }}
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                  {this.props.languageValue.value === "English"
                    ? English.painInChest
                    : Hindi.painInChest}
                  <br />
                  <Checkbox
                    checked={this.props.question4Obj.severeWeakness}
                    onChange={val => {
                      this.handleCheckBoxChange(val, "severeWeakness");
                    }}
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                  {this.props.languageValue.value === "English"
                    ? English.severeWeakness
                    : Hindi.severeWeakness}
                  <br />
                  <Checkbox
                    checked={this.props.question4Obj.noneOfTheAbove}
                    onChange={val => {
                      this.handleCheckBoxChange(val, "noneOfTheAbove");
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
                    background: "#A4D160",
                    border: " 1px solid #A4D160"
                  }}
                  size="lg"
                  block
                  onClick={() => {
                    this.props.openQuestionPage("5");
                    this.props.fetchRawData();
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
  question4Obj: state.postReducer.question4Obj
});

export default connect(mapStateToProps, {
  openQuestionPage,
  setQuestion4Data,
  fetchRawData
})(Question4);
