import React, { Component } from "react";
import { connect } from "react-redux";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { English, Hindi } from "../language";
import ProgressBar from "react-bootstrap/ProgressBar";
import styles from "./Home/styles.scss";
import { openQuestionPage, travelHistoryAns } from "../containers/Home/actions";
import "react-input-range/lib/css/index.css";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import ReactGA from "react-ga";

class Question3 extends Component {
  handleTravelAnsChange(event) {
    this.props.travelHistoryAns(event.target.value);
  }
  render() {
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
                    ? English.question3Heading
                    : Hindi.question3Heading}
                </h6>
                <div
                  style={{
                    marginTop: "30px",
                    paddingLeft: "9%"
                  }}
                  align="left"
                >
                  <RadioGroup
                    aria-label="travelAns"
                    name="travelAns"
                    value={this.props.travelAnsSelectedByUser}
                    onChange={event => {
                      this.handleTravelAnsChange(event);
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
                  onClick={() => {
                    this.props.openQuestionPage("2");
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
                  {this.props.languageValue.value === "English"
                    ? English.prev
                    : Hindi.prev}
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
                      action: "Next Clicked on 3rd Question Page"
                    });
                    this.props.openQuestionPage("4");
                  }}
                  disabled={this.props.travelAnsSelectedByUser.length == 0}
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
  travelAnsSelectedByUser: state.postReducer.travelAnsSelectedByUser
});

export default connect(mapStateToProps, { openQuestionPage, travelHistoryAns })(
  Question3
);
