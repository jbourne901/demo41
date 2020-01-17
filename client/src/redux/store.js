import {createStore, applyMiddleware} from "redux";
import rootReducer from "./root/reducer";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

const enhancers = composeWithDevTools( applyMiddleware(thunk) );

const store = createStore(rootReducer, enhancers);

export default store;
