import React from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import propTypes from "prop-types";

import Loading from "../../loading";
import {GameListAction, GameListActionDestroy} from '../../../redux/game/list/action';
import withComponentId from "../../with-component-id";
import { GameDeleteAction, GameDeleteActionDestroy } from '../../../redux/game/delete/action';


class GameListInternal extends React.Component {

    componentDidMount() {        
        this.props.gameList(this.props.componentId);
    }

     componentWillUnmount() {         
         this.props.gameListDestroy(this.props.componentId);
         this.props.gameDeleteDestroy(this.props.componentId);
    }


    formatGame(g) {
        const id = g.gameId;
        return ( <tr key={id}> 
                    <td>
                      <Link to={`/game/edit/${id}`}> {g.name} </Link>
                    </td> 
                    <td align="center">
                        <button type="button" onClick={ () => this.onDelete(id)}>X</button>
                    </td>
                 </tr>
               );
     }

     onDelete(id) {
         if(window.confirm("You sure you want to delete this item?")) {
             this.props.gameDelete(id, this.props.componentId);
         }
     }
     
    render() {
        const games = this.props.games || [];
        const isLoading = this.props.isLoading;

        if(isLoading) {
            return <Loading />;
        }
        let jsx = "You currently have no games in your list";
        if(games.length>0) {
            jsx = (
                    <table border="1">
                       <thead>
                           <tr>
                             <td>Name</td>
                             <td>Actions</td>
                           </tr>
                       </thead>
                       <tbody>
                       {games.map( g => this.formatGame(g) )}
                       </tbody>
                       
                    </table>
            );            
        }
        return (
            <div> 
                <h2>Games List </h2>
                {jsx}
            </div>
        );    
    }
}

GameListInternal.propTypes = {
    games: propTypes.array.isRequired,
    isLoading: propTypes.bool.isRequired,
    gameList: propTypes.func.isRequired,
    gameListDestroy: propTypes.func.isRequired,
    gameDelete: propTypes.func.isRequired,
    gameDeleteDestroy: propTypes.func.isRequired
};

const msp = (state, ownProps) => {
    const componentId = ownProps.componentId;
    let isLoading = false;
    let games = [];
    console.log("GameList msp componentId = "+componentId);
    if(state && state.game && state.game.gameList) {
        let gameList = state.game.gameList;
        if(componentId) {
            gameList = state.game.gameList[componentId];
        }
        if(gameList) {
            isLoading = gameList.isLoading || false;
            if(gameList.payload && gameList.payload.games) {
               games = gameList.payload.games || [];
            }    
        }
    }
    console.log("msp state=");
    console.dir(state);
    return {
        isLoading,
        games
    }
};

const mdp = {
    gameList: GameListAction,
    gameListDestroy: GameListActionDestroy,
    gameDelete: GameDeleteAction,
    gameDeleteDestroy: GameDeleteActionDestroy
};

const wrapper = connect(msp, mdp);

const tmp = wrapper(GameListInternal);

const GameList = withComponentId(tmp);


export default GameList;
