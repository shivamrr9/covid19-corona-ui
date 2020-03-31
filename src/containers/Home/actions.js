import { Constants } from "./constants";
import { doHttpGet, doHttpPost } from "../../components/utilities.js";
import { stat } from "fs";

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
  var url1 = `https://api.jsonbin.io/b/5e7f99ff862c46101abfbd6f`;
  return dispatch => {
    dispatch({
      type: Constants.SELECTED_STATE,
      data: state
    });
    var promise = doHttpGet(url1, {});
    promise.then(
      response => {
        let districts = [];
        if (response && response.status === 200) {
          response.data.states.map(obj => {
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
        }
      },
      err => {
        console.log("error:", err);
      }
    );
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
          console.log("cities response", response);
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
      subject: "Welcome!! To Corona Risk Calculator Update!!",
      description:
        "Hi There, <br/><br/> Thank you for subscribing with us.<br/> By signing up to our newsletter, you’ll be the first to know about the new, statistics, Spread and new government regulations related to Coronavirus/COVID-19  <br/><br/> ARE YOU AT RISK!!!<br/> Check now: https://www.coronariskcalculator.in <br/><br/> Stay Updated: https://www.coronariskcalculator.in/news <br/><br/> Spread the word! <br/></br> Keep your family and yourself safe. Stay at home!"
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
