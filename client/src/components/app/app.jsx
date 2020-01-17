import React from 'react';
import {NavLink, Switch, Route} from "react-router-dom";
import GameList from "../game/list";
import GameEdit from "../game/edit";

const App = () => {
    return (
        <div>
            <h1>React App</h1>
            <div>
              <NavLink to="/">Home</NavLink>
              <NavLink to="/games">Games</NavLink>
              <NavLink to="/game/new">New Game</NavLink>
            </div>
            <Switch>
                <Route exact path="/" component={GameList} />
                <Route path="/game/edit/:gameId" component={GameEdit} />                                
                <Route path="/games" component={GameList} />
                <Route path="/game/new" component={GameEdit} />

            </Switch>
        </div>       
    );
}

export default App;