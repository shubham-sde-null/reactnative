import { combineReducers } from "redux";
import { renderPage, addData } from "./reducer";
export default combineReducers({
  renderPage: renderPage,
  addData: addData,
});
