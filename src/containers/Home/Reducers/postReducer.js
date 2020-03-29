import { Constants } from "../constants";

const initialState = {
  test: 5,
  response: {},
  Postresponse: {},
  visibility: false,
  languageValue: { value: "English", label: "English" },
  showDisclaimer: false,
  currentPageNumber: 0,
  questionProgress: 20,
  enteredAgeByUser: 20,
  stateSelectedByUser: "",
  districtOptions: [],
  districtSelectedByUser: "",
  citySelectedByUser: "",
  cityOptions: [],
  genderSelectedByUser: "",
  question2Obj: {
    diabetes: false,
    heartDisease: false,
    highBloodPressure: false,
    kidneyOrLiverDisease: false,
    noneOfTheAbove: false
  },
  travelAnsSelectedByUser: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case Constants.TEST_VALUE:
      return { ...state, test: action.flag };
    case Constants.API_CALL_TEST:
      return { ...state, response: action.response };
    case Constants.POST_API_RESPONSE:
      return { ...state, Postresponse: action.data };
    case Constants.LANGUAGE_SELECTION:
      return { ...state, languageValue: action.data };
    case Constants.TOGGLE_SHOW_DISCLAIMER:
      return { ...state, showDisclaimer: action.data };
    case Constants.SET_ACTIVE_PAGE_NUMBER:
      return { ...state, currentPageNumber: action.data };
    case Constants.ENTERED_AGE:
      return { ...state, enteredAgeByUser: action.data };
    case Constants.SELECTED_STATE:
      return { ...state, stateSelectedByUser: action.data };
    case Constants.DISTRICTS_DATA:
      return { ...state, districtOptions: action.data };
    case Constants.SELECTED_DISTRICT:
      return { ...state, districtSelectedByUser: action.data };
    case Constants.CITIES_DATA:
      return { ...state, cityOptions: action.data };
    case Constants.SELECTED_CITY:
      return { ...state, citySelectedByUser: action.data };
    case Constants.SELECTED_GENDER:
      return { ...state, genderSelectedByUser: action.data };
    case Constants.CHANGE_PROGRESS_BAR:
      return { ...state, questionProgress: action.data };
    case Constants.TRAVEL_HISTORY_ANS:
      return { ...state, travelAnsSelectedByUser: action.data };
    case Constants.SHOW_LOADER:
      return { ...state, visibility: action.visibility };
    case Constants.HIDE_LOADER:
      return { ...state, visibility: action.visibility };
    case Constants.QUESTION2_DATA:
      let q2Obj = state.question2Obj;
      q2Obj[action.checkType] = action.data;
      return {
        ...state,
        question2Obj: Object.assign({}, state.question2Obj, q2Obj)
      };
    default:
      return state;
  }
}
