import { Player } from './components/player/player';
import { observable } from "aurelia-binding";
import { inject, NewInstance } from "aurelia-framework";
import { ValidationRules, ValidationController } from 'aurelia-validation';
import * as Toastr from 'toastr';
import { EventAggregator, Subscription } from 'aurelia-event-aggregator';

@inject(NewInstance.of(ValidationController), EventAggregator)
export class Welcome {
  @observable numberOfPlayers: number;
  players: Array<Player>;
  drawStarted: boolean;
  drawReady: boolean;
  drawEnded: boolean;
  drawedPlayers: Array<Player>;
  vc: ValidationController;
  ea: EventAggregator;
  drawEndedSubscription: Subscription;

  constructor(vc: ValidationController, ea: EventAggregator) {
    this.players = new Array<Player>();
    this.drawedPlayers = new Array<Player>();
    this.vc = vc;
    this.ea = ea;
  }

  attached() {
    this.setupValidationRules();
    this.drawEndedSubscription = this.ea.subscribe("drawEnded", res => setTimeout(() => {
      this.drawEnded = res
    }, 2500));
  }

  detached() {
    this.drawEndedSubscription.dispose();
  }

  async numberOfPlayersChanged(n, o) {
    if (n % 2 == 0) {
      this.drawReady = true;
      this.createPlayers();
    } else {
      this.drawReady = false;
      Toastr.error("Number must be even.")
    }

  }

  createPlayers() {
    this.players = [];
    for (let i = 0; i < this.numberOfPlayers; i++) {
      this.players.push(new Player(i + 1, ''));
    }
  }

  async submit() {
    let res = await this.vc.validate();
    if (res.valid) {
      this.drawStarted = true;
      this.drawReady = false;
    } else {
      Toastr.error("Enter all names!");
    }
  }

  setupValidationRules() {
    ValidationRules
      .ensure('name').required()
      .on(Player);
  }

  resetDraw(){
    this.players = [];
    this.numberOfPlayers = 0;
    this.drawStarted = false;
    this.drawEnded = false;
  }
}

