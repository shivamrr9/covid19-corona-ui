import { Constants } from "./constants";
import { doHttpGet, doHttpPost } from "../../components/utilities.js";
import { stat } from "fs";
import { districtOptions } from "../../configConstants";

export function Test(flag) {
  return dispatch => {
    dispatch({
      type: Constants.TEST_VALUE,
      flag: flag
    });
  };
}

export function languageChange(val) {
  return dispatch => {
    dispatch({
      type: Constants.LANGUAGE_SELECTION,
      data: val
    });
  };
}

export function toggleShowDisclaimer(value) {
  return dispatch => {
    dispatch({
      type: Constants.TOGGLE_SHOW_DISCLAIMER,
      data: value
    });
  };
}

export function openQuestionPage(pageNumber) {
  return dispatch => {
    dispatch({
      type: Constants.SET_ACTIVE_PAGE_NUMBER,
      data: pageNumber
    });
    dispatch({
      type: Constants.CHANGE_PROGRESS_BAR,
      data: Number(pageNumber) * 20
    });
  };
}

export function setQuestion2Data(val, type) {
  return dispatch => {
    dispatch({
      type: Constants.QUESTION2_DATA,
      data: val,
      checkType: type
    });
  };
}

export function setQuestion4Data(val, type) {
  return dispatch => {
    dispatch({
      type: Constants.QUESTION4_DATA,
      data: val,
      checkType: type
    });
  };
}

export function selectedTemprature(temprature) {
  return dispatch => {
    dispatch({
      type: Constants.TEMPRATURE_SELECTED,
      data: temprature
    });
  };
}

export function selectedContactAns(contactAns) {
  return dispatch => {
    dispatch({
      type: Constants.SELECTED_CONTACT_ANSWER,
      data: contactAns
    });
  };
}

export function travelHistoryAns(travelAns) {
  return dispatch => {
    dispatch({
      type: Constants.TRAVEL_HISTORY_ANS,
      data: travelAns
    });
  };
}

export function enteredAge(age) {
  return dispatch => {
    dispatch({
      type: Constants.ENTERED_AGE,
      data: age
    });
  };
}
export function citySelected(selectedCity) {
  return dispatch => {
    dispatch({
      type: Constants.SELECTED_CITY,
      data: selectedCity
    });
  };
}
export function genderSelected(gender) {
  return dispatch => {
    dispatch({
      type: Constants.SELECTED_GENDER,
      data: gender
    });
  };
}

export function setResultPrecentage(resultPrecentage) {
  return dispatch => {
    dispatch({
      type: Constants.RESULT_PERCENTAGE,
      data: resultPrecentage
    });
  };
}

export function inputEmailByUser(enteredEmail) {
  return dispatch => {
    dispatch({
      type: Constants.ENTERED_EMAIL,
      data: enteredEmail
    });
  };
}

export function stateSelected(state) {
  return dispatch => {
    dispatch({
      type: Constants.SELECTED_STATE,
      data: state
    });

    let response = districtOptions;
    let districts = [];
    response.states.map(obj => {
      if (obj.state === state.value || obj.state.includes(state.value)) {
        obj.districts.map(obj => {
          districts.push({ value: obj, label: obj });
        });
      }
    });
    dispatch({
      type: Constants.DISTRICTS_DATA,
      data: districts
    });
  };
}
export function districtSelected(district) {
  var url1 = `https://indian-cities-api-nocbegfhqg.now.sh/cities?District=${district.value}`;
  return dispatch => {
    dispatch({
      type: Constants.SELECTED_DISTRICT,
      data: district
    });
    var promise = doHttpGet(url1, {});
    promise.then(
      response => {
        if (response && response.status === 200) {
          let cities = [];
          if (response.data.length == 0) {
            cities.push({
              value: district.value,
              label: district.value
            });
          } else {
            response.data.map(obj => {
              cities.push({ value: obj.City, label: obj.City });
            });
          }
          dispatch({
            type: Constants.CITIES_DATA,
            data: cities
          });
        }
      },
      err => {
        console.log("error:", err);
      }
    );
  };
}

export function fetchRawData() {
  var url1 = `https://api.covid19india.org/raw_data.json`;
  return dispatch => {
    fetch("https://api.covid19india.org/raw_data.json")
      .then(response => {
        return response.json();
      })
      .then(data => {
        dispatch({
          type: Constants.RAW_DATA,
          data: data.raw_data
        });
      });
  };
}

//get call example
export function ApiCall() {
  var url1 = `https://api.github.com/users/shivamrr9`;
  return dispatch => {
    let headersObj = { headers: { "Access-Control-Allow-Origin": "*" } };
    var promise = doHttpGet(url1, headersObj);
    promise.then(
      response => {
        if (response && response.status === 200) {
          dispatch({
            type: Constants.API_CALL_TEST,
            response
          });
        }
      },
      err => {
        console.log("error:", err);
      }
    );
  };
}

export function postApiCall() {
  return dispatch => {
    var objToSend = {
      name: "test5",
      salary: "123",
      age: "23"
    };
    var url = `http://dummy.restapiexample.com/api/v1/create`;
    dispatch({
      type: Constants.SHOW_LOADER,
      visibility: true
    });
    var promise = doHttpPost(url, objToSend);
    promise.then(
      response => {
        dispatch({
          type: Constants.POST_API_RESPONSE,
          data: response
        });
        //setTimeout(() => window.location.reload(), 1000);
        dispatch({
          type: Constants.HIDE_LOADER,
          visibility: false
        });
      },
      err => {
        console.log("error in post call :", err);
        dispatch({
          type: Constants.HIDE_LOADER,
          visibility: false
        });
      }
    );
  };
}

export function sendEmail(email) {
  return dispatch => {
    let objToSend = {
      to: email,
      from: "info@coronariskcalculator.in",
      subject: "Welcome To Corona Risk Calculator!!",
      description:
        "<center><div style='width:100%'><div style='height:50px; width:100%; background-color: #A4D160;text-align: left;padding:11px;padding-left: 25px'><h2 style='color:white'>CORONA RISK CALCULATOR</h2></div><div style='text-align: left; padding: 20px'><span style='font-size: 16px'>Hi There,</span><br/><br/><span style='font-size: 16px'>Thank you for subscribing with us. By signing up to our newsletter, you’ll be the first to know about the statistics, spread and new government regulations related to Coronavirus/COVID-19 </span><br/><br/><span style='color:red; font-size:16px'>ARE YOU AT RISK!!!</span><br/><br/><span style='font-size: 16px'>Check now : <a href='https://www.coronariskcalculator.in'>https://www.coronariskcalculator.in</a></span><br/><br/><span style='font-size: 16px'>Stay Updated : <a href='https://www.coronariskcalculator.in/news'>https://www.coronariskcalculator.in/news</a></span><br/><br/><span style='font-size: 16px'>Do these five simple things to help stop coronavirus (COVID-19).</span><br/><br/><span style='font-size: 16px'>DO THE FIVE </span><br/><span style='font-size: 16px'>1.) HANDS: Wash them often </span><br/><span style='font-size: 16px'>2.) ELBOW: Cough into it </span><br/><span style='font-size: 16px'>3.) FACE: Don’t touch it </span><br/><span style='font-size: 16px'>4.) FEET: Stay more than 3ft (1m) apart </span><br/><span style='font-size: 16px'>5.) FEEL: Sick? Stay home </span><br/><br/><span style='font-size: 16px'>Keep your family and yourself safe. Stay at home!</span><br/><br/><span style='font-size: 16px'>Regards,</span><br/><span style='font-size: 16px'>Team Corona Risk Calculator</span><br/><img height='80px' width='80px' src='https://res.cloudinary.com/arorashivam-com-resume/image/upload/v1585554685/virus_qhbwob.png' alt='corona_risk_calculator_logo'/></div></div></center>"
    };
    var url = `https://api.coronariskcalculator.in/email`;
    var promise = doHttpPost(url, objToSend);
    promise.then(
      response => {
        dispatch({
          type: Constants.MAIL_SENT,
          data: true
        });
      },
      err => {
        console.log(err);
        dispatch({
          type: Constants.MAIL_SENT,
          data: true
        });
      }
    );
  };
}
