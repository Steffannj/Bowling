import { EventAggregator, Subscription } from 'aurelia-event-aggregator';
import { inject, observable } from 'aurelia-framework';
import { NewInstance } from 'aurelia-framework';
import { Player } from '../player/player';
import { ValidationRules, ValidationController } from 'aurelia-validation';
import * as Toastr from 'toastr';

@inject(EventAggregator)
export class PoolOfPlayers {
  playerName: string;
  @observable players: Array<Player>;
  @observable size: number;
  ea: EventAggregator;
  isBusy: boolean;
  canDraw: boolean;
  drawCompleted: boolean;
  drawEndedSubscription: Subscription;

  constructor(ea: EventAggregator) {
    this.players = [];
    this.ea = ea;
    this.size = 0;
  }

  attached() {
    this.drawEndedSubscription = this.ea.subscribe("drawCompleted", res => setTimeout(() => {
      this.drawCompleted = res
    }, 2500));
  }

  detached() {
    this.drawEndedSubscription.dispose();
  }

  sizeChanged(n, o) {
    if (n > 0 && n % 2 == 0)
      this.canDraw = true;
    else
      this.canDraw = false;
  }

  playersChanged(n, o) {
    console.log("asdasd");
  }

  add(playerName: string) {
    if (playerName) {
      this.players.push(new Player(playerName));
      this.size++;
      this.playerName = '';
      this.ea.publish('addPlayer', this.players);
    } else {
      Toastr.error("Player name can not be blank.");
    }
  }

  startDraw() {
    if (!this.canDraw)
      return;
    this.isBusy = true;
    this.ea.publish('startDraw', true);
  }

  reset() {
    this.players = [];
    this.size = 0;
    this.isBusy = false;
    this.drawCompleted = false;
    this.ea.publish('drawReseted', true);
  }
}
