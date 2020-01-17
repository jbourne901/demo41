import Service from "../../../service/service";
import CommonActionCreators from "../../common/action";
import GameSaveActionType from "./type";

export const GameSaveAction = (game, target) => (dispatch) => 
    CommonActionCreators.action( () => Service.game().gameSave(game), 
                                 dispatch, 
                                 GameSaveActionType,
                                 target
                               );

export const GameSaveActionDestroy = (target) => (dispatch) => 
   CommonActionCreators.targetDestroy( dispatch, GameSaveActionType.destroy, target);


