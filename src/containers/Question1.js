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
  enteredAge,
  stateSelected,
  districtSelected,
  citySelected,
  genderSelected,
  openQuestionPage
} from "../containers/Home/actions";
import "react-input-range/lib/css/index.css";
import Radio from "@material-ui/core/Radio";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowLeft,
  faSpinner
} from "@fortawesome/free-solid-svg-icons";

import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Select from "react-select";
import { stateOptions } from "../configConstants";
import ReactGA from "react-ga";

const colorStyles = {
  control: styles => ({ ...styles, marginBottom: "5px" })
};

class Question1 extends Component {
  handleCityChange(val) {
    this.props.citySelected(val);
  }
  handleDistrictChange(val) {
    this.props.districtSelected(val);
  }
  handleStateChange(val) {
    this.props.stateSelected(val);
  }
  handleInputAge(age) {
    if (age < 0) {
      age = 0;
    }
    if (age > 90) {
      age = 90;
    }
    this.props.enteredAge(age);
  }
  handleGenderChange(event) {
    this.props.genderSelected(event.target.value);
  }
  render() {
    return (
      <div>
        <Container>
          <Row className="col-center">
            <Col md={3}></Col>
            <Col md={6} style={{ height: "80vh" }}>
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
                  marginTop: "27%",
                  backgroundImage: `url(https://res.cloudinary.com/arorashivam-com-resume/image/upload/v1585442509/bg_2_dvlffd.png)`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  height: "100%"
                }}
              >
                <div
                  className="citySelection"
                  style={{ marginBottom: "15px", padding: "15px" }}
                >
                  <h6>
                    {this.props.languageValue.value === "English"
                      ? English.selectCity
                      : Hindi.selectCity}
                  </h6>
                  <Select
                    styles={colorStyles}
                    placeholder={
                      this.props.languageValue.value === "English"
                        ? English.state
                        : Hindi.state
                    }
                    isSearchable={true}
                    value={this.props.stateSelectedByUser}
                    onChange={val => {
                      this.handleStateChange(val);
                    }}
                    options={stateOptions}
                    style={{ marginBottom: "10px" }}
                  />
                  <Select
                    styles={colorStyles}
                    placeholder={
                      this.props.languageValue.value === "English"
                        ? English.district
                        : Hindi.district
                    }
                    isDisabled={!this.props.stateSelectedByUser}
                    isSearchable={true}
                    value={this.props.districtSelectedByUser}
                    onChange={val => {
                      this.handleDistrictChange(val);
                    }}
                    options={this.props.districtOptions}
                  />
                  {this.props.districtSelectedByUser &&
                  this.props.cityOptions.length == 0 ? (
                    <span>
                      <FontAwesomeIcon
                        icon={faSpinner}
                        style={{
                          marginRight: "5px",
                          fontSize: "15px"
                        }}
                      />
                      {this.props.languageValue.value === "English"
                        ? English.loadingCities
                        : Hindi.loadingCities}
                    </span>
                  ) : (
                    <Select
                      styles={colorStyles}
                      placeholder={
                        this.props.languageValue.value === "English"
                          ? English.city
                          : Hindi.city
                      }
                      isDisabled={!this.props.districtSelectedByUser}
                      isSearchable={true}
                      value={this.props.citySelectedByUser}
                      onChange={val => {
                        this.handleCityChange(val);
                      }}
                      options={this.props.cityOptions}
                    />
                  )}
                </div>
                <hr></hr>
                <div className="age-container">
                  <h6>
                    {this.props.languageValue.value === "English"
                      ? English.howOld
                      : Hindi.howOld}
                  </h6>
                  <input
                    type="number"
                    min="5"
                    max="90"
                    style={{
                      width: "40px",
                      border: "1px solid grey",
                      height: "40px",
                      textAlign: "center",
                      marginBottom: "5px"
                    }}
                    value={this.props.enteredAgeByUser}
                    onChange={val => {
                      this.handleInputAge(val.target.value);
                    }}
                  />
                  <InputRange
                    maxValue={90}
                    minValue={0}
                    value={Number(this.props.enteredAgeByUser)}
                    onChange={value => {
                      this.handleInputAge(value);
                    }}
                    slider="check"
                  />
                </div>
                <hr style={{ marginTop: "30px" }}></hr>
                <div
                  className="gender-container"
                  align="center"
                  style={{ marginTop: "6%", marginBottom: "25%" }}
                >
                  <h6 style={{ marginBottom: "0px", padding: "3px" }}>
                    {this.props.languageValue.value === "English"
                      ? English.selectGender
                      : Hindi.selectGender}
                  </h6>
                  <RadioGroup
                    aria-label="gender"
                    name="gender1"
                    value={this.props.genderSelectedByUser}
                    onChange={event => {
                      this.handleGenderChange(event);
                    }}
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label={
                        this.props.languageValue.value === "English"
                          ? English.female
                          : Hindi.female
                      }
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label={
                        this.props.languageValue.value === "English"
                          ? English.male
                          : Hindi.male
                      }
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label={
                        this.props.languageValue.value === "English"
                          ? English.other
                          : Hindi.other
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
                    background: "#A4D160",
                    border: " 1px solid #A4D160",
                    width: "50%",
                    right: "50%",
                    position: "absolute",
                    marginTop: "8px",
                    marginRight: "1x"
                  }}
                  size="lg"
                  block
                  onClick={() => {
                    this.props.openQuestionPage("0");
                  }}
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
                  {this.props.languageValue.value === "English"
                    ? English.back
                    : Hindi.back}
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
                      action: "Next Clicked on 1st Question Page"
                    });
                    this.props.openQuestionPage("2");
                  }}
                  disabled={
                    this.props.stateSelectedByUser.length == 0 ||
                    this.props.districtSelectedByUser.length == 0 ||
                    this.props.enteredAgeByUser == 0 ||
                    this.props.genderSelectedByUser.length == 0
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
  enteredAgeByUser: state.postReducer.enteredAgeByUser,
  stateSelectedByUser: state.postReducer.stateSelectedByUser,
  districtOptions: state.postReducer.districtOptions,
  districtSelectedByUser: state.postReducer.districtSelectedByUser,
  cityOptions: state.postReducer.cityOptions,
  citySelectedByUser: state.postReducer.citySelectedByUser,
  genderSelectedByUser: state.postReducer.genderSelectedByUser
});

export default connect(mapStateToProps, {
  enteredAge,
  stateSelected,
  districtSelected,
  citySelected,
  genderSelected,
  openQuestionPage
})(Question1);
