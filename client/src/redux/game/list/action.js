import Service from "../../../service/service";
import CommonActionCreators from "../../common/action";
import GameListActionType from "./type";

export const GameListAction = (target) => (dispatch) => 
    CommonActionCreators.action( () => Service.game().gameList(), 
                                 dispatch, 
                                 GameListActionType,
                                 target
                               );

export const GameListActionDestroy = (target) => (dispatch) => 
    CommonActionCreators.targetDestroy( dispatch, GameListActionType.destroy, target);
                               



