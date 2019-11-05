import { EventAggregator } from 'aurelia-event-aggregator';
import { PoolOfPlayers } from '../../../../src/components/poolOfPlayers/poolOfPlayers';

describe('The Pool of players module', () => {
  let sut: PoolOfPlayers;
  let ea: EventAggregator;

  beforeEach(() => {
    ea = new EventAggregator;
    sut = new PoolOfPlayers(ea);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should add player in players array if add is called', () => {
    sut.add('Stefan');
    expect(sut.players).toMatchSnapshot(
      [{ name: 'Stefan' }]
    );
  });

  it('should have size of 4 if 4 players are added', () => {
    sut.add('Stefan');
    sut.add('Zvjezdan');
    sut.add('Aner');
    sut.add('Mladen');
    expect(sut.size).toEqual(4);
  });

  it('should not add player if empty string is passed', () => {
    sut.add('');
    expect(sut.size).toEqual(0);
  });

  it('should set canDraw to true if num of players is even', () => {
    sut.add('Stefan');
    sut.add('Zvjezdan');
    expect(sut.canDraw).toBeTruthy();
  });

  it('should set canDraw to false if num of players is odd', () => {
    sut.add('Stefan');
    expect(sut.canDraw).toBeFalsy();
  });

  it('should clear array of players if reset is called', () => {
    sut.add('Stefan');
    sut.add('Zvjezdan');
    sut.reset();
    expect(sut.players.length).toEqual(0);
  });
  
  it('should set isBusy to false if reset is called', () => {
    sut.add('Stefan');
    sut.add('Zvjezdan');
    sut.startDraw();
    expect(sut.isBusy).toBeTruthy();
    sut.reset();
    expect(sut.isBusy).toBeFalsy();
  });

})
