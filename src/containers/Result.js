import React, { Component } from "react";
import { connect } from "react-redux";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { English, Hindi } from "../language";
import styles from "./Home/styles.scss";
import GaugeChart from "react-gauge-chart";
import { FacebookShareButton, WhatsappShareButton } from "react-share";
import { FacebookIcon, WhatsappIcon } from "react-share";

import {
  openQuestionPage,
  travelHistoryAns,
  setResultPrecentage
} from "../containers/Home/actions";
import "react-input-range/lib/css/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedoAlt, faShareAlt } from "@fortawesome/free-solid-svg-icons";

class Question3 extends Component {
  shareContent() {
    if (navigator.share) {
      var sharePromise = window.navigator.share({
        title: "Corona Risk Calculator",
        text: `Are you at Risk? Know if you're safe from Corona or not. I am at : ${
          this.props.finalResultPercentage > 0 &&
          this.props.finalResultPercentage < 20
            ? "Low Risk"
            : this.props.finalResultPercentage > 20 &&
              this.props.finalResultPercentage < 43
            ? "Moderate Risk"
            : "High Risk"
        } | Corona Risk Calculator | `,
        url: "https://coronariskcalculator.in"
      });

      sharePromise
        .then(function() {
          console.log("Shareing successfull");
        })
        .catch(function() {
          console.log("Sharing failed");
        });
    } else {
      alert("Sharing Not Supported on this device");
    }
  }
  componentDidMount() {
    window.setTimeout(() => {
      this.riskCalculator(
        this.props.enteredAgeByUser,
        this.props.citySelectedByUser,
        this.props.districtSelectedByUser,
        this.props.stateSelectedByUser,
        this.props.travelAnsSelectedByUser,
        this.props.question2Obj.diabetes,
        this.props.question2Obj.highBloodPressure,
        this.props.question2Obj.heartDisease,
        this.props.question2Obj.kidneyOrLiverDisease,
        this.props.tempratureSelectedByUser,
        this.props.question4Obj.dryCough,
        this.props.question4Obj.soreThroat,
        this.props.question4Obj.lossOfSmell,
        this.props.question4Obj.weakness,
        this.props.question4Obj.changeAppetite,
        this.props.question4Obj.severeCough,
        this.props.question4Obj.difficultyInBreathing,
        this.props.question4Obj.drowsiness,
        this.props.question4Obj.painInChest,
        this.props.question4Obj.severeWeakness,
        this.props.contactAnsSelectedByUser
      );
    }, 150);
  }

  preConditions(diabetes, blood_pressure, heart_problem, kidney_lung_disease) {
    let percentage = 0;
    if (diabetes) {
      percentage += 2;
    }
    if (blood_pressure) {
      percentage += 2;
    }
    if (heart_problem) {
      percentage += 2;
    }
    if (kidney_lung_disease) {
      percentage += 2;
    }
    return percentage > 10 ? 10 : percentage;
  }
  symptoms(
    cough,
    sore_throat,
    smell,
    weaknes,
    appetite,
    severe_cough,
    breathing_problem,
    drowsiness,
    chest_pain,
    severe_weakness
  ) {
    let percentage = 0;
    if (cough) {
      percentage += 2;
    }
    if (sore_throat) {
      percentage += 2;
    }
    if (smell) {
      percentage += 2;
    }
    if (weaknes) {
      percentage += 2;
    }
    if (appetite) {
      percentage += 2;
    }
    if (severe_cough) {
      percentage += 2;
    }
    if (breathing_problem) {
      percentage += 2;
    }
    if (drowsiness) {
      percentage += 2;
    }
    if (chest_pain) {
      percentage += 2;
    }
    if (severe_weakness) {
      percentage += 2;
    }

    return percentage > 20 ? 20 : percentage;
  }
  riskCalculator(
    age,
    district,
    city,
    state,
    travel_history,
    diabetes,
    blood_pressure,
    heart_problem,
    kidney_lung_disease,
    temprature,
    cough,
    sore_throat,
    smell,
    weaknes,
    appetite,
    severe_cough,
    breathing_problem,
    drowsiness,
    chest_pain,
    severe_weakness,
    contact_with_covid_paitent
  ) {
    let total_percentage = 0;
    if (travel_history === "yes") {
      total_percentage += 10;
    }
    total_percentage += this.preConditions(
      diabetes,
      blood_pressure,
      heart_problem,
      kidney_lung_disease
    );

    if (temprature >= 98.7 && temprature <= 102) {
      total_percentage += 5;
    } else if (temprature > 102) {
      total_percentage += 10;
    }
    total_percentage += this.symptoms(
      cough,
      sore_throat,
      smell,
      weaknes,
      appetite,
      severe_cough,
      breathing_problem,
      drowsiness,
      chest_pain,
      severe_weakness
    );

    if (contact_with_covid_paitent === "yes") {
      total_percentage += 20;
    }
    let age_0_20 = 0,
      age_20_40 = 0,
      age_40_60 = 0,
      age_60_above = 0,
      age_count,
      city_count = 0,
      district_count = 0,
      state_count = 0;
    let total_data = this.props.rawData.length;
    this.props.rawData.forEach(function(info) {
      if (info.agebracket <= 20) ++age_0_20;
      else if (info.agebracket <= 40) ++age_20_40;
      else if (info.agebracket <= 60) ++age_40_60;
      else ++age_60_above;

      if (info.detectedcity === city.value) ++city_count;
      if (info.detecteddistrict === district.value) ++district_count;
      if (info.detectedstate === state.value) ++state_count;
    });
    if (age <= 20) age_count = age_0_20;
    else if (age <= 40) age_count = age_20_40;
    else if (age <= 60) age_count = age_40_60;
    else age_count = age_60_above;

    total_percentage += (age_count / total_data) * 10;
    total_percentage += (city_count / total_data) * 10;
    total_percentage += (district_count / total_data) * 6;
    total_percentage += (state_count / total_data) * 4;

    total_percentage /= 1;
    {
      isNaN(total_percentage)
        ? (total_percentage = 0)
        : (total_percentage = total_percentage);
    }

    console.log("round of number", Math.round(total_percentage));
    this.props.setResultPrecentage(Math.round(total_percentage));
  }

  render() {
    console.log("props :", this.props);
    return (
      <div>
        <Container>
          <Row className="col-center">
            <Col md={3}></Col>
            <Col
              md={6}
              style={{ height: "100vh", background: "#A4D160" }}
              className="parent-container"
              align="center"
            >
              <div
                className="heading-container"
                style={{
                  display: "flex",
                  padding: "7px",
                  justifyContent: "left",
                  position: "fixed",
                  top: "0",
                  width: "100%",
                  right: "0"
                }}
              >
                <span
                  style={{
                    color: "white",
                    position: "fixed",
                    left: "4%",
                    marginTop: "2px"
                  }}
                >
                  Corona Risk Calculator
                </span>
                <div
                  style={{
                    background: "#E04F51",
                    border: "1px solid #E04F51",
                    paddingLeft: "8px",
                    paddingRight: "8px",
                    borderRadius: "20px",
                    position: "fixed",
                    right: "4%"
                  }}
                >
                  <span style={{ color: "white", fontSize: "15px" }}>
                    Live Updates
                  </span>
                </div>
              </div>
              <div
                className="risk-display-container"
                style={{
                  marginTop: "15%",
                  width: "98%",
                  background: "white",
                  borderRadius: "16px"
                }}
              >
                <div style={{ display: "flex" }}>
                  <div
                    className="percentage-meter"
                    style={{ width: "50%", padding: "2px", flexGrow: "5" }}
                  >
                    <GaugeChart
                      id="gauge-chart4"
                      nrOfLevels={3}
                      arcPadding={0}
                      cornerRadius={1}
                      percent={this.props.finalResultPercentage / 100}
                      animate={true}
                      hideText={true}
                    />
                  </div>
                  <div
                    className="kind-of-risk"
                    style={{
                      padding: "10px",
                      flexGrow: "5",
                      marginRight: "20px",
                      marginTop: "3px"
                    }}
                  >
                    {this.props.finalResultPercentage > 0 &&
                      this.props.finalResultPercentage < 20 && (
                        <span style={{ fontSize: "25px", color: "#A4D160" }}>
                          LOW RISK
                        </span>
                      )}
                    {this.props.finalResultPercentage > 20 &&
                      this.props.finalResultPercentage < 43 && (
                        <span style={{ fontSize: "25px", color: "#ffc400" }}>
                          MODERATE
                        </span>
                      )}
                    {this.props.finalResultPercentage > 43 && (
                      <span style={{ fontSize: "25px", color: "#FF0100" }}>
                        HIGH RISK
                      </span>
                    )}
                    <br />
                    <p style={{ fontSize: "10px" }}>
                      This is not a medical advice
                    </p>
                  </div>
                </div>
                <p
                  style={{
                    fontSize: "13px",
                    padding: "5px",
                    paddingRight: "10px",
                    paddingLeft: "10px",
                    marginBottom: "2px"
                  }}
                >
                  Based on the assisment you are at{" "}
                  {this.props.finalResultPercentage > 0 &&
                  this.props.finalResultPercentage < 20
                    ? "Low Risk "
                    : this.props.finalResultPercentage > 20 &&
                      this.props.finalResultPercentage < 43
                    ? "Moderate Risk "
                    : "High Risk "}
                  of COVID-19. <br /> Check after every 24 hrs to check the
                  changes.
                </p>
                <hr style={{ marginBottom: "0px", marginTop: "0px" }}></hr>
                <div
                  className="button-container"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Button variant="outlined">
                    <FontAwesomeIcon
                      icon={faRedoAlt}
                      color="grey"
                      style={{ marginRight: "3px" }}
                    />
                    Re Assess
                  </Button>
                  {navigator.share ? (
                    <Button
                      variant="outlined"
                      onClick={() => {
                        this.shareContent();
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faShareAlt}
                        color="grey"
                        style={{ marginRight: "3px" }}
                      />
                      Share Result
                    </Button>
                  ) : (
                    <div className="fallback-share" style={{ display: "flex" }}>
                      <FontAwesomeIcon
                        icon={faShareAlt}
                        color="grey"
                        style={{ marginRight: "3px", marginTop: "30px" }}
                      />
                      <span style={{ marginTop: "26px" }}>Share on </span>
                      <div style={{ marginTop: "23px", paddingLeft: "8px" }}>
                        <FacebookShareButton
                          url={"https://www.coronariskcalculator.in"}
                          quote={`Are you at Risk? Know if you're safe from Corona or not. I am at ${
                            this.props.finalResultPercentage > 0 &&
                            this.props.finalResultPercentage < 20
                              ? "Low Risk"
                              : this.props.finalResultPercentage > 20 &&
                                this.props.finalResultPercentage < 43
                              ? "Moderate Risk"
                              : "High Risk"
                          } | Corona Risk Calculator | Check yours at : `}
                        >
                          <FacebookIcon size={32} round />
                        </FacebookShareButton>
                      </div>
                      <div style={{ marginTop: "23px", paddingLeft: "8px" }}>
                        <WhatsappShareButton
                          url={"https://www.coronariskcalculator.com"}
                          title={`Are you at Risk? Know if you're safe from Corona or not. I am at ${
                            this.props.finalResultPercentage > 0 &&
                            this.props.finalResultPercentage < 20
                              ? "Low Risk"
                              : this.props.finalResultPercentage > 20 &&
                                this.props.finalResultPercentage < 43
                              ? "Moderate Risk"
                              : "High Risk"
                          } | Corona Risk Calculator | Check yours at : `}
                        >
                          <WhatsappIcon size={32} round />
                        </WhatsappShareButton>

                        <div className="Demo__some-network__share-count">
                          &nbsp;
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="precautions-container"></div>
              <div className="alert-container"></div>
              <div className="help-container"></div>
              <div className="subscribe-container"></div>
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
  question2Obj: state.postReducer.question2Obj,
  enteredAgeByUser: state.postReducer.enteredAgeByUser,
  districtSelectedByUser: state.postReducer.districtSelectedByUser,
  stateSelectedByUser: state.postReducer.stateSelectedByUser,
  citySelectedByUser: state.postReducer.citySelectedByUser,
  genderSelectedByUser: state.postReducer.genderSelectedByUser,
  travelAnsSelectedByUser: state.postReducer.travelAnsSelectedByUser,
  question4Obj: state.postReducer.question4Obj,
  tempratureSelectedByUser: state.postReducer.tempratureSelectedByUser,
  contactAnsSelectedByUser: state.postReducer.contactAnsSelectedByUser,
  rawData: state.postReducer.rawData,
  finalResultPercentage: state.postReducer.finalResultPercentage
});

export default connect(mapStateToProps, {
  openQuestionPage,
  travelHistoryAns,
  setResultPrecentage
})(Question3);
