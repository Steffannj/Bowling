import { Player } from './../../../../src/components/player/player';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Draw } from './../../../../src/components/draw/draw';

describe('The draw module', () => {
  let sut: Draw;
  let ea: EventAggregator;
  jest.useFakeTimers();

  beforeEach(() => {
    ea = new EventAggregator;
    sut = new Draw(ea);
  });

  it('should create 2 teams if number of players are 4', () => {
    let players = [new Player('Stefan'), new Player('Zvjezdan'), new Player('Aner'), new Player('Mladen')];
    sut.players = players;
    sut.playersChanged();
    expect(sut.teams.length).toEqual(2);
  });

  it('should create teams with existing players', () => {
    let players = [new Player('Stefan'), new Player('Zvjezdan'), new Player('Aner'), new Player('Mladen')];
    sut.players = players;
    sut.playersChanged();
    jest.runAllTimers();
    expect(sut.teams).toMatchSnapshot(
      [{ name: 'Stefan' }]
    );

  });
});
