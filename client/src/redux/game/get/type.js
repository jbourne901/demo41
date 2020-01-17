const pfx = "GAME_GET_";

const GameGetActionType = {
    request: pfx+"REQUEST",
    success: pfx+"SUCCESS",
    failure: pfx+"FAILURE",
    destroy: pfx+"DESTROY"
};

export default GameGetActionType;
