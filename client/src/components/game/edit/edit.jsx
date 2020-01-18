import React from 'react';
import {withRouter} from "react-router-dom";

import Loading from "../../loading";
import ValidationError from "../../validation-error";
import Service from "../../../service";

class GameEditInternal extends React.Component {        
    constructor(props) {
        super(props);
        this.svc = Service.game();
        this.state = {
            game: {},
            saveErrors: {},
            touched: false,
            isLoading: false
        };
    }    

    componentDidMount() {        
        let gameId = "";        
        if( this.props.match && this.props.match.params ) {
            gameId = this.props.match.params.gameId;
            if(gameId && gameId.length>0) {
                console.log("calling gameGet id = "+gameId);
                this.startLoading();
                return this.svc.gameGet(gameId)
                           .then( (res) => this.getCallback(res) )
                           .catch( (err) => this.getError(err) )
            }
        }
    }

    startLoading() {
        this.setState({
                        isLoading: true,
                        saveErrors: {} 
                      });
    }

    stopLoading() {
        this.setState({isLoading: false});
    }

    getCallback(res) {
        if(res.result==="OK") {
            return this.setState({
                                   game: {...res.game},
                                   isLoading: false
                                });
        }
        return this.getError(res.result);
    }

    getError(err) {
        console.log("getError error = "+err);
        this.stopLoading();
    }

    onChange(e) {
        const {name,value} = e.target;
        const saveErrors = {...this.state.saveErrors};
        delete saveErrors[name];
        this.setState({ game: {...this.state.game, [name]: value},
                        saveErrors,
                        touched: true
                      });
    }
    
    onCancel() {
        this.goBack();
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({
                        isLoading: true,
                        saveErrors: {}
                     });
        console.log("onSubmit");
        console.dir(this.state.game);
        this.svc.gameSave(this.state.game)
                .then( (res) => this.saveCallback(res) )
                .catch( (err) => this.saveError(err) );
    }

    saveCallback(res) {
        if(res.result==="OK") {
            return this.goBack();
        }
        return this.setState({isLoading: false, saveErrors: res.errors})        
    }

    saveError(err) {
        return this.setState({isLoading: false, saveErrors: {error: err}});
    }

    goBack() {
        return this.props.history.push("/games");
    }

    render() {

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

const GameEdit = withRouter(GameEditInternal);

export default GameEdit;