import React from 'react';
import {connect} from "react-redux";
import propTypes from "prop-types";
import {withRouter, Redirect} from "react-router-dom";

import Loading from "../../loading";
import ValidationError from "../../validation-error";
import {GameGetAction, GameGetActionDestroy} from '../../../redux/game/get/action';
import {GameSaveAction, GameSaveActionDestroy} from '../../../redux/game/save/action';
import withComponentId from "../../with-component-id";

class GameEditInternal extends React.Component {    
    constructor(props) {
        super(props);
        this.gameId = "";
        this.state = {
            game: {},
            saveErrors: {},
            getResult: "",
            saveResult: "",
            touched: false,
            closeEdit: false
        };
    }    

    componentDidMount() {
        this.gameId = "";
        if( this.props.match && this.props.match.params ) {
            this.gameId = this.props.match.params.gameId;
            if(this.gameId && this.gameId.length>0) {
                console.log("calling gameGet id = "+this.gameId);
                this.props.gameGet(this.gameId, this.props.componentId);
            }            
        }
    }   

    onChange(e) {
        const {name,value} = e.target;
        this.setState({ game: {...this.state.game, [name]: value},
                        errors: {...this.state.errors, [name]: ""},
                        touched: true
                      });
    }

    
    onCancel() {
        this.setState({closeEdit: true});
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({
            saveResult: "",
            saveErrors: {}
        });
        console.log("onSubmit");
        console.dir(this.state.game);
        this.props.gameSave(this.state.game, this.props.componentId);
    }

    componentWillUnmount() {
        this.props.gameGetDestroy(this.props.componentId);
        this.props.gameSaveDestroy(this.props.componentId);
    }

    render() {

       if (this.state.closeEdit) {
           return <Redirect to="/games" />;
       }
       const game = this.state.game || {};
       console.log("render game=");
       console.dir(game);
       const name = game.name || "";
       console.log("name="+name+" game.name="+game.name);
       const errors = this.state.saveErrors || {};
       const nameError = errors.name || undefined;
       console.log("render nameError = "+nameError);    

       let jsx = null;
       if(this.props.isGetting || this.props.isSaving) {
           jsx = <Loading />;
       }

       jsx = (
           <form onSubmit = { (e) => this.onSubmit(e) }>
               <div>
                  <label>Name:</label>
                  <input type="text" name="name" value={name}
                         onChange = { (e) => this.onChange(e)}
                  />
                  {nameError && <ValidationError name="name" error={nameError} /> }                   
               </div>
               <div>
                  <button type="submit">Save</button>
                  <button type="button" onClick={ () => this.onCancel() }>Cancel</button>
               </div>
           </form>
       )
       
       return (
           <div>
                <h2>Game Edit</h2>
                {jsx}
           </div>
       );
    }
}

GameEditInternal.getDerivedStateFromProps = (props, state) => {
    console.log("getDerivedStateFromProps props=");
    console.dir(props);
    
    //if props.saveResult = OK , close and dont check anything else
    // need to make sure saveResult is blank when we just open component
    if(props.saveResult==="OK") {
        console.log("getDerivedStateFromProps return closeEdit=true");
        return {
            closeEdit: true
        };
    }

    
    // game we only set it once when our getResult changes to OK
    // getResult - we change it to blank initially and change to OK after successful retrieval
    if(props.getResult !== state.getResult && props.getResult === "OK" && !state.touched) {
        console.log("getDerivedStateFromProps return getResult, game");
        return {
            getResult: props.getResult,
            game: {...props.game}
        };
    }

    //saveResult we reset to blank in onSubmit, then copy from props every time changes
    //saveErrors we only set when saveResult changes to non-blank and non-OK (i.e. to error)
    //new errors will be copied only if saveResult changes 
    if(props.saveResult !== state.saveResult && props.saveResult.length>0) {
        console.log("getDerivedStateFromProps return saveResult, saveErrors");
        return {
            saveResult: props.saveResult,
            saveErrors: props.saveErrors
        }
    }
    console.log("getDerivedStateFromProps return null");
    return null;
};

GameEditInternal.propTypes = {
    isGetting: propTypes.bool.isRequired,
    isSaving: propTypes.bool.isRequired,
    getResult: propTypes.string.isRequired,
    game: propTypes.object.isRequired,
    saveErrors: propTypes.object.isRequired,
    saveResult: propTypes.string.isRequired,
    gameGet: propTypes.func.isRequired,
    gameGetDestroy: propTypes.func.isRequired,
    gameSave: propTypes.func.isRequired,
    gameSaveDestroy: propTypes.func.isRequired,
    componentId: propTypes.string.isRequired
};

const tmp1 = withRouter(GameEditInternal);

const msp = (state, ownProps) => {
    const componentId = ownProps.componentId;
    let isGetting = false;
    let isSaving = false;
    let game = {};
    let saveErrors = {};
    let getResult = "";
    let saveResult =""    
    if(state && state.game) {        
        let gameGet = state.game.gameGet;
        let gameSave = state.game.gameSave;
        if(gameGet && componentId.length>0) {
            gameGet = state.game.gameGet[componentId];
        }
        if(gameSave && componentId.length>0) {
            gameSave = state.game.gameSave[componentId];
        }

        if(gameGet) {
            isGetting = gameGet.isLoading;
            if(gameGet.payload && gameGet.payload.game) {
                game = gameGet.payload.game;
            }            
            getResult = gameGet.result;
        }
        if(gameSave) {
            isSaving = gameSave.isLoading;
            saveErrors = gameSave.errors;
            saveResult = gameSave.result;
        }
    }    
    return {
        isGetting,
        isSaving,
        game,
        saveErrors,
        getResult,
        saveResult
    };
};

const mdp = {
    gameGet: GameGetAction,
    gameGetDestroy: GameGetActionDestroy,
    gameSave: GameSaveAction,
    gameSaveDestroy: GameSaveActionDestroy
};

const wrapper = connect(msp,mdp);

const tmp2 = wrapper(tmp1);

const GameEdit = withComponentId(tmp2);


export default GameEdit;