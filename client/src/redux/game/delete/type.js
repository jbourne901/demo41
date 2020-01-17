const pfx = "GAME_DELETE_";

const GameDeleteActionType = {
    request: pfx+"REQUEST",
    success: pfx+"SUCCESS",
    failure: pfx+"FAILURE",
    destroy: pfx+"DESTROY"
};

export default GameDeleteActionType;
