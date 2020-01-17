import Service from "../../../service/service";
import CommonActionCreators from "../../common/action";
import GameDeleteActionType from "./type";
import { GameListAction } from "../list/action";

export const GameDeleteAction = (gameId, target) => (dispatch) => 
    CommonActionCreators.actionWithNotify( () => Service.game().gameDelete(gameId),
                                 dispatch, 
                                 GameDeleteActionType,
                                 GameListAction,
                                 target
                               );

export const GameDeleteActionDestroy = (target) => (dispatch) => 
    CommonActionCreators.targetDestroy( dispatch, GameDeleteActionType.destroy, target );



