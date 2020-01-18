import React from 'react';
import GameList from "./list";
import Service from "../../../service";

class GameListContainerInternal extends React.Component {
    constructor(props) {
        super(props);
        console.log("GameListContainer constructor");
        this.svc = Service.game();
        this.state = {
            games: [],
            isLoading: false
        };
    }

    componentDidMount() {
        this.refreshList();
    }

    startLoading() {
        this.setState({isLoading: true});
    }

    stopLoading() {
        this.setState({isLoading: false});
    }

    updateList(games) {
        this.setState({
                         isLoading: false, 
                         games
                      });
    }

    refreshList() {
        console.log("refreshList()");
        this.startLoading();
        this.svc.gameList()
            .then( (res) => this.refreshListCallback(res) )
            .catch( (err) => this.serviceError(err) );
    }

    refreshListCallback(res) {
        if(res.result==="OK") {
            return this.updateList(res.games);
        } 
        return this.refreshListError(res.result);
    }

    serviceError(err) {
        console.log("refreshListError err="+err);
        return this.stopLoading();
    }

    onDelete(id) {
        this.startLoading();
        return this.svc.gameDelete(id)
                   .then( (res) => this.deleteCallback(res) )
                   .catch( (err) => this.serviceError(err))
    }

    deleteCallback(res) {
        if(res.result==="OK") {
            return this.refreshList();
        }
        return this.serviceError(res.result);
    }

    render() {
        const games = this.state.games || [];
        const isLoading = this.state.isLoading || false;
        const onDelete = (id) => this.onDelete(id);
        const p = {...this.props, games, isLoading, onDelete};
        console.log("GameListContainer render p = ");
        console.dir(p);
        return (
            <GameList {...p} />
        );
    }
}

const GameListContainer = GameListContainerInternal;

export default GameListContainer;
