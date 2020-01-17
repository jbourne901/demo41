import Service from "../../../service/service";
import CommonActionCreators from "../../common/action";
import GameGetActionType from "./type";

export const GameGetAction = (gameId, target) => (dispatch) => 
    CommonActionCreators.action( () => Service.game().gameGet(gameId), 
                                 dispatch, 
                                 GameGetActionType,
                                 target
                               );

export const GameGetActionDestroy = (target) => (dispatch) => 
    CommonActionCreators.targetDestroy(dispatch, GameGetActionType.destroy, target);
 
