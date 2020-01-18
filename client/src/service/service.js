import GameService from "./game";

export default class Service {};

Service._game = new GameService();

Service.game = () => Service._game;