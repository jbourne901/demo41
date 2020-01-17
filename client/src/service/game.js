import extractSvcData from "./extractSvcData";
import axios from "axios";

class GameService {
    
    constructor() {
        this.BASE_URL=process.env.REACT_APP_API_URL+"/game";
    }    

    gameList = () => axios.post(this.BASE_URL+"/list")
                          .then( (res) => extractSvcData(res) );  

    gameGet = (gameId) => axios.post(this.BASE_URL+"/get", {gameId})
                               .then( (res) => extractSvcData(res) );  

    gameDelete = (gameId) => axios.post(this.BASE_URL+"/delete", {gameId})
                                  .then( (res) => extractSvcData(res) );  

    gameSave = (game) => axios.post(this.BASE_URL+"/save", {game})
                              .then( (res) => extractSvcData(res) );  

};

GameService.BASE_URL="http://192.168.2.22:5000/api/game";

export default GameService;
