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
import Rating from "react-rating";

import {
  openQuestionPage,
  travelHistoryAns,
  sendEmail,
  inputEmailByUser
} from "../containers/Home/actions";
import "react-input-range/lib/css/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRedoAlt,
  faShareAlt,
  faQuestionCircle,
  faEnvelope,
  faPhone,
  faExclamationTriangle,
  faHeart,
  faHandPointer,
  faDotCircle,
  faSmile,
  faHospitalAlt
} from "@fortawesome/free-solid-svg-icons";
import firebase from "../firebase";
import ReactGA from "react-ga";

class Question3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRatingContainer: true,
      finalResultPercentage: 0
    };
  }
  // pushNotifSubscribe() {
  //   const messaging = firebase.messaging();
  //   messaging
  //     .requestPermission()
  //     .then(() => {
  //       return messaging.getToken();
  //     })
  //     .then(token => {
  //       console.log("token: ", token);
  //       firebase
  //         .database()
  //         .ref(Math.ceil(Math.random() * 1000000))
  //         .set({
  //           userToken: token
  //         });
  //     })
  //     .catch(obj => {
  //       console.log("error occured");
  //     });
  // }
  handleValidEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return false;
    }
    return true;
  }
  showRatingBox(showRating) {
    this.setState({
      showRatingContainer: true
    });
  }
  handleInputChange(inputEmail) {
    this.props.inputEmailByUser(inputEmail);
  }
  handleSubscribe(email) {
    this.props.sendEmail(email);
    this.saveDataToFireBase(email);
  }
  handleRating(rating) {
    firebase
      .database()
      .ref(Math.ceil(Math.random() * 1000000))
      .set({
        rating: rating
      });
    this.setState({
      showRatingContainer: false
    });
  }
  saveDataToFireBase(email) {
    firebase
      .database()
      .ref(Math.ceil(Math.random() * 1000000))
      .set({
        email: email
      });
  }
  shareContent() {
    if (navigator.share) {
      ReactGA.event({
        category: "Share",
        action: "Share Result Clicked"
      });
      var sharePromise = window.navigator.share({
        title: `${
          this.props.languageValue.value === "English"
            ? English.heading1
            : Hindi.heading1
        }`,
        text: `${
          this.props.languageValue.value === "English"
            ? English.iAmAt
            : Hindi.iAmAt
        } ${
          this.state.finalResultPercentage > 0 &&
          this.state.finalResultPercentage < 30
            ? `${
                this.props.languageValue.value === "English"
                  ? English.lowRisk
                  : Hindi.lowRisk
              }`
            : this.state.finalResultPercentage > 30 &&
              this.state.finalResultPercentage < 60
            ? `${
                this.props.languageValue.value === "English"
                  ? English.moderateRisk
                  : Hindi.moderateRisk
              }`
            : `${
                this.props.languageValue.value === "English"
                  ? English.highRisk
                  : Hindi.highRisk
              }`
        } ${
          this.props.languageValue.value === "English" ? English.par : Hindi.par
        } ${
          this.props.languageValue.value === "English"
            ? English.shareString
            : Hindi.shareString
        }`,
        url: "https://coronariskcalculator.in"
      });

      sharePromise
        .then(function() {
          console.log("Sharaing successfull");
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
    }, 350);
  }

  preConditions(diabetes, blood_pressure, heart_problem, kidney_lung_disease) {
    let percentage = 0;
    if (diabetes) {
      percentage += 3;
    }
    if (blood_pressure) {
      percentage += 2;
    }
    if (heart_problem) {
      percentage += 4;
    }
    if (kidney_lung_disease) {
      percentage += 5;
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
      percentage += 3;
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
      percentage += 3;
    }
    if (breathing_problem) {
      percentage += 4;
    }
    if (drowsiness) {
      percentage += 2;
    }
    if (chest_pain) {
      percentage += 4;
    }
    if (severe_weakness) {
      percentage += 3;
    }

    return percentage;
  }
  riskCalculator(
    age,
    district,
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
      total_percentage += 15;
    }
    total_percentage += this.preConditions(
      diabetes,
      blood_pressure,
      heart_problem,
      kidney_lung_disease
    );

    if (temprature >= 98.7 && temprature <= 102) {
      total_percentage += 6;
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
      total_percentage += 25;
    }
    let age_0_20 = 0,
      age_20_40 = 0,
      age_40_60 = 0,
      age_60_above = 0,
      age_count,
      district_count = 0,
      state_count = 0;
    let total_data = this.props.rawData.length;
    this.props.rawData.forEach(function(info) {
      if (info.agebracket <= 20) ++age_0_20;
      else if (info.agebracket <= 40) ++age_20_40;
      else if (info.agebracket <= 60) ++age_40_60;
      else ++age_60_above;

      if (info.detecteddistrict === district.value) ++district_count;
      if (info.detectedstate === state.value) ++state_count;
    });
    if (age <= 20) age_count = age_0_20;
    else if (age <= 40) age_count = age_20_40;
    else if (age <= 60) age_count = age_40_60;
    else age_count = age_60_above;

    total_percentage += (age_count / total_data) * 12;
    total_percentage += (district_count / total_data) * 8;
    total_percentage += (state_count / total_data) * 6;

    total_percentage /= 1;
    {
      isNaN(total_percentage)
        ? (total_percentage = 0)
        : (total_percentage = total_percentage);
    }

    console.log("round of number", Math.round(total_percentage));
    this.setState({
      finalResultPercentage: Math.round(total_percentage)
    });
    ReactGA.event({
      category: "Risk Percentage",
      action: `Risk Percentage : ${Math.round(total_percentage)}`
    });
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
              style={{ height: "100%", background: "#A4D160" }}
              className="parent-container"
              align="center"
            >
              <div
                className="heading-container"
                style={{
                  display: "flex",
                  padding: "7px",
                  justifyContent: "left",
                  width: "100%"
                }}
              >
                <span
                  style={{
                    color: "white",
                    marginTop: "3px",
                    fontSize: "13px",
                    fontWeight: "bold"
                  }}
                >
                  {this.props.languageValue.value === "English"
                    ? English.heading1
                    : Hindi.heading1}
                </span>
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
                  onClick={() => {
                    ReactGA.event({
                      category: "Check Live Updates Clicked",
                      action: "from Results Page"
                    });
                  }}
                  className="blink_me_result"
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
                          marginRight: "2px",
                          fontSize: "7px",
                          marginBottom: "2px"
                        }}
                      />{" "}
                      {this.props.languageValue.value === "English"
                        ? English.checkLiveUpdates
                        : Hindi.checkLiveUpdates}
                    </span>
                  </a>
                </div>
              </div>
              <div
                className="risk-display-container"
                style={{
                  marginTop: "5%",
                  width: "98%",
                  background: "white",
                  borderRadius: "16px",
                  padding: "5px"
                }}
              >
                <div style={{ display: "flex" }}>
                  <div
                    className="percentage-meter"
                    style={{ width: "50%", padding: "2px", flexGrow: "5" }}
                  >
                    <GaugeChart
                      id="gauge-chart5"
                      nrOfLevels={420}
                      arcPadding={0}
                      cornerRadius={1}
                      percent={this.state.finalResultPercentage / 100}
                      arcsLength={[0.3, 0.3, 0.4]}
                      hideText={true}
                      animate={true}
                      animDelay={500}
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
                    {this.state.finalResultPercentage > 0 &&
                      this.state.finalResultPercentage <= 30 && (
                        <span style={{ fontSize: "24px", color: "#A4D160" }}>
                          {this.props.languageValue.value === "English"
                            ? English.lowRisk
                            : Hindi.lowRisk}
                        </span>
                      )}
                    {this.state.finalResultPercentage > 30 &&
                      this.state.finalResultPercentage <= 60 && (
                        <span style={{ fontSize: "24px", color: "#ffc400" }}>
                          {this.props.languageValue.value === "English"
                            ? English.moderate
                            : Hindi.moderate}
                        </span>
                      )}
                    {this.state.finalResultPercentage > 60 && (
                      <span style={{ fontSize: "24px", color: "#FF0100" }}>
                        {this.props.languageValue.value === "English"
                          ? English.highRisk
                          : Hindi.highRisk}
                      </span>
                    )}
                    <br />
                    <p style={{ fontSize: "10px" }}>
                      {this.props.languageValue.value === "English"
                        ? English.smallDisclamier
                        : Hindi.smallDisclamier}
                    </p>
                  </div>
                </div>
                <p
                  style={{
                    fontSize: "12px",
                    padding: "5px",
                    paddingRight: "10px",
                    paddingLeft: "10px",
                    marginBottom: "2px"
                  }}
                >
                  {this.props.languageValue.value === "English"
                    ? English.basedOnAssessment1
                    : Hindi.basedOnAssessment1}{" "}
                  {this.state.finalResultPercentage > 0 &&
                  this.state.finalResultPercentage < 30
                    ? `${
                        this.props.languageValue.value === "English"
                          ? English.lowRisk
                          : Hindi.lowRisk
                      }`
                    : this.state.finalResultPercentage > 30 &&
                      this.state.finalResultPercentage < 60
                    ? `${
                        this.props.languageValue.value === "English"
                          ? English.moderateRisk
                          : Hindi.moderateRisk
                      }`
                    : `${
                        this.props.languageValue.value === "English"
                          ? English.highRisk
                          : Hindi.highRisk
                      }`}
                  {this.props.languageValue.value === "English"
                    ? English.ofCovid
                    : Hindi.ofCovid}
                  <br />{" "}
                  {this.props.languageValue.value === "English"
                    ? English.basedOnAssessment2
                    : Hindi.basedOnAssessment2}
                </p>
                <hr style={{ marginTop: "0px", marginBottom: "-5px" }}></hr>
                <div
                  className="button-container"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Button
                    variant="outlined"
                    style={{ marginRight: "10px" }}
                    onClick={() => {
                      window.location.href = "https://coronariskcalculator.in";
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faRedoAlt}
                      color="grey"
                      style={{ marginRight: "5px" }}
                    />
                    <span style={{ fontSize: "14px" }}>
                      {this.props.languageValue.value === "English"
                        ? English.reAssess
                        : Hindi.reAssess}
                    </span>
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
                        style={{ marginRight: "5px" }}
                      />
                      <span style={{ fontSize: "14px" }}>
                        {this.props.languageValue.value === "English"
                          ? English.shareResult
                          : Hindi.shareResult}
                      </span>
                    </Button>
                  ) : (
                    <div className="fallback-share" style={{ display: "flex" }}>
                      <FontAwesomeIcon
                        icon={faShareAlt}
                        color="grey"
                        style={{ marginRight: "5px", marginTop: "30px" }}
                      />
                      <span style={{ marginTop: "28px", fontSize: "14px" }}>
                        {this.props.languageValue.value === "English"
                          ? English.shareOn
                          : Hindi.shareOn}{" "}
                      </span>
                      <div style={{ marginTop: "23px", paddingLeft: "8px" }}>
                        <FacebookShareButton
                          url={"https://www.coronariskcalculator.in"}
                          quote={`${
                            this.props.languageValue.value === "English"
                              ? English.iAmAt
                              : Hindi.iAmAt
                          } ${
                            this.state.finalResultPercentage > 0 &&
                            this.state.finalResultPercentage < 30
                              ? `${
                                  this.props.languageValue.value === "English"
                                    ? English.lowRisk
                                    : Hindi.lowRisk
                                }`
                              : this.state.finalResultPercentage > 30 &&
                                this.state.finalResultPercentage < 60
                              ? `${
                                  this.props.languageValue.value === "English"
                                    ? English.moderateRisk
                                    : Hindi.moderateRisk
                                }`
                              : `${
                                  this.props.languageValue.value === "English"
                                    ? English.highRisk
                                    : Hindi.highRisk
                                }`
                          } ${
                            this.props.languageValue.value === "English"
                              ? English.par
                              : Hindi.par
                          }${
                            this.props.languageValue.value === "English"
                              ? English.shareString
                              : Hindi.shareString
                          }`}
                        >
                          <FacebookIcon size={32} round />
                        </FacebookShareButton>
                      </div>
                      <div style={{ marginTop: "23px", paddingLeft: "8px" }}>
                        <WhatsappShareButton
                          url={"https://www.coronariskcalculator.in"}
                          title={`${
                            this.props.languageValue.value === "English"
                              ? English.iAmAt
                              : Hindi.iAmAt
                          } ${
                            this.state.finalResultPercentage > 0 &&
                            this.state.finalResultPercentage < 30
                              ? `${
                                  this.props.languageValue.value === "English"
                                    ? English.lowRisk
                                    : Hindi.lowRisk
                                }`
                              : this.state.finalResultPercentage > 30 &&
                                this.state.finalResultPercentage < 60
                              ? `${
                                  this.props.languageValue.value === "English"
                                    ? English.moderateRisk
                                    : Hindi.moderateRisk
                                }`
                              : `${
                                  this.props.languageValue.value === "English"
                                    ? English.highRisk
                                    : Hindi.highRisk
                                }`
                          } ${
                            this.props.languageValue.value === "English"
                              ? English.par
                              : Hindi.par
                          }${
                            this.props.languageValue.value === "English"
                              ? English.shareString
                              : Hindi.shareString
                          }`}
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
              {this.state.finalResultPercentage > 30 && (
                <div
                  className="testing-facilities"
                  style={{
                    marginTop: "3%",
                    width: "98%",
                    background: "white",
                    borderRadius: "16px",
                    padding: "15px"
                  }}
                >
                  <h6>
                    <FontAwesomeIcon
                      icon={faHospitalAlt}
                      color="#DDB24B"
                      style={{ marginRight: "3px" }}
                    />
                    {this.props.languageValue.value === "English"
                      ? English.testingfacilities
                      : Hindi.testingfacilities}
                  </h6>
                  <div
                    style={{
                      textAlign: "left",
                      padding: "10px",
                      marginLeft: "10px",
                      fontSize: "12px"
                    }}
                  >
                    {`${
                      this.props.languageValue.value === "English"
                        ? English.youAreAt
                        : Hindi.youAreAt
                    } : ${
                      this.state.finalResultPercentage > 0 &&
                      this.state.finalResultPercentage < 30
                        ? `${
                            this.props.languageValue.value === "English"
                              ? English.lowRisk
                              : Hindi.lowRisk
                          }`
                        : this.state.finalResultPercentage > 30 &&
                          this.state.finalResultPercentage < 60
                        ? `${
                            this.props.languageValue.value === "English"
                              ? English.moderateRisk
                              : Hindi.moderateRisk
                          }`
                        : `${
                            this.props.languageValue.value === "English"
                              ? English.highRisk
                              : Hindi.highRisk
                          }`
                    }${
                      this.props.languageValue.value === "English"
                        ? English.consultPhysician
                        : Hindi.consultPhysician
                    }`}
                    <a
                      href="https://covid.icmr.org.in/index.php/testing-facilities"
                      target="_blank"
                    >
                      <span
                        onClick={() => {
                          ReactGA.event({
                            category: "Testing Facilities Link",
                            action: "Testing Facilities Link CLicked"
                          });
                        }}
                        style={{ color: "blue" }}
                      >
                        {this.props.languageValue.value === "English"
                          ? English.clickHere
                          : Hindi.clickHere}
                      </span>
                    </a>
                  </div>
                </div>
              )}
              <div
                className="precautions-container"
                style={{
                  marginTop: "3%",
                  width: "98%",
                  background: "white",
                  borderRadius: "16px",
                  padding: "15px"
                }}
              >
                <h6>
                  <FontAwesomeIcon
                    icon={faQuestionCircle}
                    color="#DDB24B"
                    style={{ marginRight: "3px" }}
                  />
                  {this.props.languageValue.value === "English"
                    ? English.block2Heading
                    : Hindi.block2Heading}
                </h6>
                <ul
                  style={{
                    textAlign: "left",
                    padding: "10px",
                    marginLeft: "10px"
                  }}
                >
                  <li style={{ padding: "3px", fontSize: "12px" }}>
                    {this.props.languageValue.value === "English"
                      ? English.block2Point1
                      : Hindi.block2Point1}
                  </li>
                  <li style={{ padding: "3px", fontSize: "12px" }}>
                    {this.props.languageValue.value === "English"
                      ? English.block2Point2
                      : Hindi.block2Point2}
                  </li>
                  <li style={{ padding: "3px", fontSize: "12px" }}>
                    {this.props.languageValue.value === "English"
                      ? English.block2Point3
                      : Hindi.block2Point3}
                  </li>
                  <li style={{ padding: "3px", fontSize: "12px" }}>
                    {this.props.languageValue.value === "English"
                      ? English.block2Point4
                      : Hindi.block2Point4}
                  </li>
                </ul>
                <div
                  className="emergency-contacts-container"
                  style={{ display: "flex", width: "100%" }}
                  align="left"
                >
                  <div
                    className="emergency-contacts"
                    style={{
                      width: "65%",
                      marginLeft: "10px"
                    }}
                  >
                    <span style={{ fontSize: "12px", fontWeight: "bold" }}>
                      {this.props.languageValue.value === "English"
                        ? English.forAnyEmergency
                        : Hindi.forAnyEmergency}
                    </span>
                    <br />
                    <FontAwesomeIcon
                      icon={faPhone}
                      color="grey"
                      style={{ marginRight: "3px", fontSize: "10px" }}
                    />
                    <span style={{ padding: "3px", fontSize: "11px" }}>
                      {this.props.languageValue.value === "English"
                        ? English.helpline
                        : Hindi.helpline}{" "}
                      :{" "}
                      <a
                        style={{ textDecoration: "none" }}
                        href="tel:011-23978046"
                      >
                        011-23978046
                      </a>
                    </span>
                    <br />
                    <FontAwesomeIcon
                      icon={faPhone}
                      color="grey"
                      style={{ marginRight: "3px", fontSize: "10px" }}
                    />
                    <span style={{ padding: "3px", fontSize: "11px" }}>
                      {this.props.languageValue.value === "English"
                        ? English.tollFreeNumber
                        : Hindi.tollFreeNumber}{" "}
                      :{" "}
                      <a style={{ textDecoration: "none" }} href="tel:1075">
                        1075
                      </a>
                    </span>
                    <br />
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      color="grey"
                      style={{ marginRight: "3px", fontSize: "10px" }}
                    />
                    <span style={{ padding: "3px", fontSize: "11px" }}>
                      {this.props.languageValue.value === "English"
                        ? English.helpLineEmail
                        : Hindi.helpLineEmail}{" "}
                      :{" "}
                      <a
                        style={{ textDecoration: "none" }}
                        href="mailto:ncov2019@gov.in?Subject=Covid 19 Help!!"
                        target="_top"
                      >
                        ncov2019@gov.in
                      </a>
                    </span>
                  </div>
                  <div
                    className="mask-image-container"
                    style={{
                      backgroundImage: `url(https://res.cloudinary.com/arorashivam-com-resume/image/upload/v1585586438/Mask_Group_1_iphccs.png)`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      backgroundSize: "100px 100px",
                      width: "35%"
                    }}
                  ></div>
                </div>

                <p
                  style={{
                    padding: "10px",
                    marginBottom: "0px"
                  }}
                >
                  {this.props.languageValue.value === "English"
                    ? English.precautionaryMeasuresVideo
                    : Hindi.precautionaryMeasuresVideo}
                </p>
                {this.props.languageValue.value === "English" ? (
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/v-852f1PXBo"
                    allow="picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/OFFg21KhOV0"
                    allow="picture-in-picture"
                    allowFullScreen
                  ></iframe>
                )}
              </div>
              <div
                className="alert-container"
                style={{
                  marginTop: "3%",
                  width: "98%",
                  background: "white",
                  borderRadius: "16px",
                  padding: "5px"
                }}
              >
                <h6 style={{ padding: "10px", marginBottom: "0px" }}>
                  <FontAwesomeIcon
                    icon={faExclamationTriangle}
                    color="#DDB24B"
                    style={{ marginRight: "3px" }}
                  />
                  {this.props.languageValue.value === "English"
                    ? English.alerts
                    : Hindi.alerts}
                </h6>
                <div
                  className="alert-content"
                  style={{
                    textAlign: "left",
                    marginLeft: "10px",
                    padding: "8px"
                  }}
                >
                  <span style={{ fontSize: "12px" }}>
                    {this.props.languageValue.value === "English"
                      ? English.block3Point1
                      : Hindi.block3Point1}{" "}
                    <b>
                      {this.props.languageValue.value === "English"
                        ? English.call
                        : Hindi.call}{" "}
                      <a href="tel:1075">108 </a>
                    </b>
                    ,{" "}
                    {this.props.languageValue.value === "English"
                      ? English.inCaseYouSuspect
                      : Hindi.inCaseYouSuspect}{" "}
                    <b>
                      {this.props.languageValue.value === "English"
                        ? English.call
                        : Hindi.call}{" "}
                      <a href="tel:1075">104 </a>
                    </b>
                    {this.props.languageValue.value === "English"
                      ? English.findAllHelpline
                      : Hindi.findAllHelpline}{" "}
                    <a
                      onClick={() => {
                        ReactGA.event({
                          category: "Help Line Link (PDF)",
                          action: "Help Line Link Clicked/PDF downloaded"
                        });
                      }}
                      href="https://www.mohfw.gov.in/pdf/coronvavirushelplinenumber.pdf"
                      target="_blank"
                      style={{ color: "blue" }}
                    >
                      <b>
                        {this.props.languageValue.value === "English"
                          ? English.allHelplineLink
                          : Hindi.allHelplineLink}
                      </b>
                    </a>
                  </span>
                </div>
              </div>
              <div
                className="help-container"
                style={{
                  marginTop: "3%",
                  width: "98%",
                  background: "white",
                  borderRadius: "16px",
                  padding: "5px",
                  backgroundImage: `url(https://res.cloudinary.com/arorashivam-com-resume/image/upload/v1585593262/Mask_Group_2_1_vxrgdv.png)`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundSize: "100% 120px",
                  backgroundPosition: "bottom"
                }}
              >
                <h6 style={{ paddingTop: "10px" }}>
                  <FontAwesomeIcon
                    icon={faHeart}
                    color="#D42F51"
                    style={{ marginRight: "3px" }}
                  />
                  {this.props.languageValue.value === "English"
                    ? English.block4Heading
                    : Hindi.block4Heading}
                </h6>
                <div
                  style={{
                    textAlign: "left",
                    marginLeft: "10px",
                    padding: "8px"
                  }}
                >
                  <p>
                    {this.props.languageValue.value === "English"
                      ? English.block4SubHeading
                      : Hindi.block4SubHeading}
                  </p>
                  <br />
                  <a
                    style={{ textDecoration: "none" }}
                    href="https://www.narendramodi.in/appeal-to-generously-donate-to-prime-ministers-citizen-assistance-and-relief-in-emergency-situations-fund-pm-cares-fund-549013"
                    target="_blank"
                  >
                    <Button
                      style={{
                        background: "#A4D160",
                        border: " 1px solid #A4D160"
                      }}
                    >
                      {this.props.languageValue.value === "English"
                        ? English.learnMore
                        : Hindi.learnMore}
                    </Button>
                  </a>
                </div>
              </div>
              <div
                className="subscribe-container"
                style={{
                  marginTop: "3%",
                  width: "98%",
                  background: "white",
                  borderRadius: "16px",
                  padding: "5px",
                  backgroundImage: `url(https://res.cloudinary.com/arorashivam-com-resume/image/upload/v1585594410/Mask_Group_3_ynvjbo.png)`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundSize: "100% 120px",
                  backgroundPosition: "bottom"
                }}
              >
                <h6 style={{ paddingTop: "10px" }}>
                  <FontAwesomeIcon
                    icon={faHandPointer}
                    color="#DDB24B"
                    style={{ marginRight: "3px" }}
                  />
                  {this.props.languageValue.value === "English"
                    ? English.block5Heading
                    : Hindi.block5Heading}
                </h6>
                <div
                  style={{
                    textAlign: "left",
                    marginLeft: "10px",
                    padding: "8px",
                    marginBottom: "10px"
                  }}
                >
                  <p style={{ marginBottom: "0px" }}>
                    {this.props.languageValue.value === "English"
                      ? English.block5SubHeading
                      : Hindi.block5SubHeading}
                  </p>
                  {!this.props.isMailSent && <br />}
                  {!this.props.isMailSent && (
                    <input
                      style={{
                        width: "68%",
                        borderRadius: "3px",
                        padding: "2px"
                      }}
                      type="email"
                      name="email"
                      placeholder="Email"
                      onChange={val => {
                        this.handleInputChange(val.target.value);
                      }}
                    />
                  )}
                  {!this.props.isMailSent && <br />}
                  {!this.props.isMailSent && (
                    <Button
                      style={{
                        background: "#A4D160",
                        border: " 1px solid #A4D160",
                        marginTop: "10px"
                      }}
                      disabled={this.handleValidEmail(
                        this.props.enteredEmailByUser
                      )}
                      onClick={() => {
                        ReactGA.event({
                          category: "Subscribe Newsletter",
                          action:
                            "Subscribe clicked on Results Page:" +
                            this.props.enteredEmailByUser
                              .split("@")[0]
                              .toString()
                        });
                        this.handleSubscribe(this.props.enteredEmailByUser);
                      }}
                    >
                      {this.props.languageValue.value === "English"
                        ? English.subscribe
                        : Hindi.subscribe}
                    </Button>
                  )}
                  {this.props.isMailSent && (
                    <p>
                      {this.props.languageValue.value === "English"
                        ? English.yaySubscribed
                        : Hindi.yaySubscribed}
                      <br />{" "}
                      {this.props.languageValue.value === "English"
                        ? English.checkMailBox
                        : Hindi.checkMailBox}
                    </p>
                  )}
                </div>
              </div>
              <div
                className="rating-container"
                style={{
                  marginTop: "3%",
                  width: "98%",
                  background: "white",
                  borderRadius: "16px",
                  padding: "5px"
                }}
              >
                <h6 style={{ paddingTop: "10px" }}>
                  <FontAwesomeIcon
                    icon={faSmile}
                    color="#f06292"
                    style={{ marginRight: "3px" }}
                  />
                  {this.props.languageValue.value === "English"
                    ? English.rateUs
                    : Hindi.rateUs}
                </h6>
                {this.state.showRatingContainer ? (
                  <Rating
                    style={{ marginBottom: "10px", padding: "5px" }}
                    onChange={val => {
                      ReactGA.event({
                        category: "Rating",
                        action: `Rating : ${val} Given on Results Page`
                      });
                      setTimeout(() => {
                        this.handleRating(val);
                      }, 450);
                    }}
                    placeholderRating={0}
                    emptySymbol={
                      <img
                        src="https://res.cloudinary.com/arorashivam-com-resume/image/upload/v1585668786/star-grey_iw3dqf.png"
                        className="icon"
                        height="28"
                        width="28"
                        style={{ padding: "3px" }}
                      />
                    }
                    placeholderSymbol={
                      <img
                        src="https://res.cloudinary.com/arorashivam-com-resume/image/upload/v1585669292/star_bqd991.png"
                        className="icon"
                        height="28"
                        width="28"
                        style={{ padding: "3px" }}
                      />
                    }
                    fullSymbol={
                      <img
                        src="https://res.cloudinary.com/arorashivam-com-resume/image/upload/v1585669292/star_bqd991.png"
                        className="icon"
                        height="28"
                        width="28"
                        style={{ padding: "3px" }}
                      />
                    }
                  />
                ) : (
                  <div style={{ marginBottom: "10px", padding: "5px" }}>
                    {this.props.languageValue.value === "English"
                      ? English.thankYou
                      : Hindi.thankYou}
                    <br />
                    <Button
                      style={{
                        background: "#A4D160",
                        border: " 1px solid #A4D160",
                        marginTop: "10px"
                      }}
                      onClick={() => {
                        ReactGA.event({
                          category: "Rating",
                          action: "Re Rating Given on Results Page"
                        });
                        this.showRatingBox(true);
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faRedoAlt}
                        color="white"
                        style={{ marginRight: "5px" }}
                      />
                      {this.props.languageValue.value === "English"
                        ? English.reRate
                        : Hindi.reRate}
                    </Button>
                  </div>
                )}
              </div>
              <p style={{ marginBottom: "0px", paddingTop: "6px" }}>
                Made with{" "}
                <FontAwesomeIcon
                  icon={faHeart}
                  color="#D42F51"
                  style={{ marginRight: "3px" }}
                />{" "}
                in INDIA |{" "}
                <a
                  onClick={() => {
                    ReactGA.event({
                      category: "FAQS",
                      action: "FAQS CLICKED"
                    });
                  }}
                  href=" https://assets-corona-risk-calculator.s3.ap-south-1.amazonaws.com/FAQ+_+CORONA+RISK+CALCULATOR.pdf"
                  target="_blank"
                >
                  FAQs
                </a>
              </p>
              <div style={{ height: "30px" }}></div>
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
  genderSelectedByUser: state.postReducer.genderSelectedByUser,
  travelAnsSelectedByUser: state.postReducer.travelAnsSelectedByUser,
  question4Obj: state.postReducer.question4Obj,
  tempratureSelectedByUser: state.postReducer.tempratureSelectedByUser,
  contactAnsSelectedByUser: state.postReducer.contactAnsSelectedByUser,
  rawData: state.postReducer.rawData,
  enteredEmailByUser: state.postReducer.enteredEmailByUser,
  isMailSent: state.postReducer.isMailSent
});

export default connect(mapStateToProps, {
  openQuestionPage,
  travelHistoryAns,
  sendEmail,
  inputEmailByUser
})(Question3);
