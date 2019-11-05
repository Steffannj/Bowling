import { observable } from "aurelia-binding";

export class Header{
  @observable ball: HTMLElement;
  title: HTMLElement;

  attached() {
  }
  
  ballChanged(){
    console.log("asdadad");
  }
}
