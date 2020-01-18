import React from 'react';
import {Link} from "react-router-dom";
import propTypes from "prop-types";
import Loading from "../../loading";


class GameListInternal extends React.Component {

    formatGame(g) {
        const id = g.gameId;
        return ( <tr key={id}> 
                    <td>
                      <Link to={`/game/edit/${id}`}> {g.name} </Link>
                    </td> 
                    <td align="center">
                        <button type="button" onClick={ () => this.onDelete(id)}>
                            X
                        </button>
                    </td>
                 </tr>
               );
     }

     onDelete(id) {
         if(window.confirm("You sure you want to delete this item?")) {
             this.props.onDelete(id);
         }
     }
     
    render() {
        const games = this.props.games || [];

        if(this.props.isLoading) {
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
    onDelete: propTypes.func.isRequired
};

const GameList = GameListInternal;

export default GameList;
