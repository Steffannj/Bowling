import { EventAggregator } from 'aurelia-event-aggregator';
import { Team } from './../team/team';
import { Player } from './../player/player';
import { bindable, inject } from "aurelia-framework";

@inject(EventAggregator)
export class Draw {
  @bindable players: Player[];
  @bindable drawStarted: boolean;
  availablePlayersInDraw: Player[];
  numOfTeams: number;
  teams: Array<Team>;
  ea: EventAggregator;

  constructor(ea: EventAggregator) {
    this.ea = ea;
  }

  playersChanged() {
    this.numOfTeams = this.players.length / 2;
    this.availablePlayersInDraw = new Array(...this.players);
    this.createTeams();
  }

  createTeams() {
    this.teams = [];
    for (let i = 0; i < this.numOfTeams; i++) {
      this.teams.push(new Team(i + 1));
    }
  }

  drawStartedChanged(n, o) {
    if (n) {
      let interval = setInterval(() => {
        let rnd = Math.floor(Math.random() * this.availablePlayersInDraw.length);
        let player = this.availablePlayersInDraw[rnd];
        player.drawed = true;
        this.putPlayerInTeam(player);
        if (this.availablePlayersInDraw.length == 0) {
          this.ea.publish("drawEnded", true);
          clearInterval(interval);
        }
      }, 2500);
    }
  }

  private putPlayerInTeam(player: Player) {
    let placeAvailable = false;
    while (!placeAvailable) {
      let rnd = Math.floor(Math.random() * this.teams.length);
      let team = this.teams[rnd];
      if (!team.player1 || !team.player2) {
        placeAvailable = true;
        if (!team.player1)
          team.player1 = player;
        else
          team.player2 = player;
        this.availablePlayersInDraw.splice(this.availablePlayersInDraw.indexOf(player), 1);
      }
    }
  }
}
