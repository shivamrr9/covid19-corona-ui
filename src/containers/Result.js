import React, { Component } from "react";
import { connect } from "react-redux";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { English, Hindi } from "../language";
import styles from "./Home/styles.scss";

import {
  openQuestionPage,
  travelHistoryAns,
  fetchRawData
} from "../containers/Home/actions";
import "react-input-range/lib/css/index.css";

class Question3 extends Component {
  shareContent() {
    var sharePromise = window.navigator.share({
      title: "Bits and pieces: Web Share API article",
      text: "Web Share API feature is awesome. You must check it",
      url: window.location.href
    });

    sharePromise
      .then(function() {
        console.log("Shareing successfull");
      })
      .catch(function() {
        console.log("Sharing failed");
      });
  }
  componentDidMount() {
    this.props.fetchRawData();
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
    }, 250);
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

    total_percentage /= 1.4;
    {
      isNaN(total_percentage)
        ? (total_percentage = 0)
        : (total_percentage = total_percentage);
    }
    console.log(total_percentage);
    console.log("round of number", Math.round(total_percentage));
  }

  render() {
    console.log("props :", this.props);
    return (
      <div>
        <Container>
          <Row className="col-center">
            <Col md={3}></Col>
            <Col md={6}>
              Result it is
              <br />
              <Button
                style={{
                  marginBottom: "3px",
                  background: "#A4D160",
                  border: " 1px solid #A4D160"
                }}
                size="lg"
                block
                onClick={() => {
                  this.shareContent();
                }}
              >
                Share
              </Button>
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
  rawData: state.postReducer.rawData
});

export default connect(mapStateToProps, {
  openQuestionPage,
  travelHistoryAns,
  fetchRawData
})(Question3);