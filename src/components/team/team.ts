import { Player } from './../player/player';
export class Team{
  player1: Player;
  player2: Player;
  id: string;

  constructor(id){
    this.id = id;
  }
}
