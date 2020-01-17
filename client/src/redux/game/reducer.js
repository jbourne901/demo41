import {combineReducers} from "redux";

import commonReducer from "../common/reducer";
import GameDeleteActionType from "./delete/type";
import GameGetActionType from "./get/type";
import GameListActionType from "./list/type";
import GameSaveActionType from "./save/type";


const getReducer = commonReducer(GameGetActionType);
const listReducer = commonReducer(GameListActionType);
const deleteReducer = commonReducer(GameDeleteActionType);
const saveReducer = commonReducer(GameSaveActionType);

const gameReducer = combineReducers({
    gameGet: getReducer,
    gameList: listReducer,
    gameDelete: deleteReducer,
    gameSave: saveReducer
});

export default gameReducer;

