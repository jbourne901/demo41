const express = require("express");

const GameModel = require("../model/game");

const router = express.Router();

router.post("/list", (req,res,next) => {
   console.log("POST /api/game/list");
   GameModel.find({})
            .then( games => gameListFound(games, req, res, next))
            .catch( err => sendError(err, req, res, next));
});

function gameListFound(gamesFound, req, res, next) {
    const games = gamesFound.map( g => {return {...(g.toObject()), gameId: g._id} });
    return res.json({games, result: "OK", errors: {} });
}

function sendSuccess(req, res, next) {
    console.log("sendSuccess")
    return res.json({result: "OK"});
}

function sendError(error, req, res, next) {
    console.log("sendError error="+error);
    return res.status(500).json({errors: {error}});
}

function sendErrors(errors, req, res, next) {
    return res.json({result: "Error", errors});
}

async function gameValidate(gameInfo) {
    let errors = {};
    let isValid=true;

    const gameId = gameInfo.gameId || "";
    const name = gameInfo.name || "";

    if(name.length===0) {
        errors.name="Name is required";
        isValid=false;
    }

    console.log("gameValidate 1");
    if( !errors.name && gameId.length>0) {
        const game = await GameModel.findOne( {_id: { $ne: gameId }, name } );

        if(game) {
            console.log("name must be unique - game=");
            console.dir(game);
            errors.name="Name must be unique";
            isValid=false;
        }
    }

    console.log("gameValidate 2");    
    if(!errors.name && gameId.length===0) {
        const game = await GameModel.findOne( {name} );        
        console.log("gameValidate 3 game=");
        console.dir(game);
        if(game) {
            console.log("name must be unique 2 - game=");
            console.dir(game);
            errors.name="Name must be unique";
            isValid=false;
        }
    }
    if(!isValid) {
        return errors;
    }
    return null;
}

router.post("/save", async (req,res,next) => {
    let game=undefined;
    if(req.body && req.body.game) {
        game = req.body.game;
    }
    if(!game) {
        return sendError("no game data received", req,res,next);
    }
    console.log("POST /api/games/save game=");
    console.dir(game);
    const errors = await gameValidate(game);
    console.log("validate errors = ");
    console.dir(errors);
    if(errors) {
        return sendErrors(errors, req, res, next);
    }
    if(game.gameId) {
        console.log("findByIdAndUpdate game=");
        console.dir(game);
        return GameModel.findByIdAndUpdate(game.gameId, game)
                        .then( () => sendSuccess(req, res, next))
                        .catch( (err) => sendError(err))
    }
    const newGame = new GameModel({ name: game.name });
    console.log("creating new game");
    return newGame.save()
                  .then( () => sendSuccess(req,res,next))
                  .catch( (err) => sendError(err, req, res, next));
});





router.post("/get", (req,res,next) => {
    console.log("POST /api/game/get");
    const gameId = req.body.gameId;    
    console.log("gameId = "+gameId);
    if(gameId && gameId.length>0) {
        GameModel.findById(gameId)
        .then( game => gameFound(game, req, res, next))
        .catch( err => sendError(err, req, res, next));
    }
 });
 
 function gameFound(gameFound, req, res, next) {
     const g = gameFound.toObject();
     console.log("gameFound g = ");
     console.dir(g);
     const game =  {...g, gameId: g._id };
     console.log("game=");
     console.dir(game);
     return res.json({game, result: "OK", errors: {} });
 }

 




router.post("/delete", (req,res,next) => {
    console.log("POST /api/game/delete");
    const gameId = req.body.gameId;    
    console.log("gameId = "+gameId);
    if(gameId && gameId.length>0) {
        GameModel.findByIdAndDelete(gameId)
        .then( () => sendSuccess(req, res, next))
        .catch( err => sendError(err, req, res, next));
    }
 });
 

module.exports = router;