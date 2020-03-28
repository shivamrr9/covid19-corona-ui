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
import { languageChange } from "./actions.js";

class Home extends Component {
  handleLangChange(val) {
    console.log("value on index: ", val);
    this.props.languageChange(val);
  }
  render() {
    console.log("props :", this.props);
    return (
      <div>
        <Container>
          <Row className="col-center">
            <Col md={3}></Col>

            <Col md={6} style={{ textAlign: "center" }}>
              <img
                src="https://res.cloudinary.com/arorashivam-com-resume/image/upload/v1585398260/finallogo_ujrp2b.png"
                alt="corona_logo"
                height="170"
                style={{ marginTop: "20%" }}
              />
              <h5 style={{ marginTop: "25%" }}>
                {this.props.languageValue.value === "English"
                  ? English.heading1
                  : Hindi.heading1}
              </h5>
              <h6 style={{ fontSize: "12px" }}>
                {this.props.languageValue.value === "English"
                  ? English.heading2
                  : Hindi.heading2}
              </h6>
              <div style={{ width: "100%" }} align="center">
                <div style={{ width: "150px" }}>
                  <Select
                    isSearchable={false}
                    value={this.props.languageValue}
                    onChange={val => {
                      this.handleLangChange(val);
                    }}
                    options={languageOptions}
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
                  style={{ backgroundClip: "red", marginBottom: "3px" }}
                  size="lg"
                  block
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
  languageValue: state.postReducer.languageValue
});

export default connect(mapStateToProps, {
  Test,
  ApiCall,
  postApiCall,
  languageChange
})(Home);
