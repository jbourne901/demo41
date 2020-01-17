const pfx = "GAME_SAVE_";

const GameSaveActionType = {
    request: pfx+"REQUEST",
    success: pfx+"SUCCESS",
    failure: pfx+"FAILURE",
    destroy: pfx+"DESTROY"
};

export default GameSaveActionType;

