import { Constants } from "../constants";

const initialState = {
  test: 5,
  response: {},
  Postresponse: {},
  visibility: false,
  languageValue: { value: "English", label: "English" },
  showDisclaimer: false
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
    case Constants.SHOW_LOADER:
      return { ...state, visibility: action.visibility };
    case Constants.HIDE_LOADER:
      return { ...state, visibility: action.visibility };
    default:
      return state;
  }
}
