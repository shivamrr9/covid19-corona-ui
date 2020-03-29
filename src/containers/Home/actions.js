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

export function stateSelected(state) {
  console.log("state: ", state);
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

//get call example
export function ApiCall() {
  var url1 = `https://api.github.com/users/shivamrr9`;
  return dispatch => {
    var promise = doHttpGet(url1, {});
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
