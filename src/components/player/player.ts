export class Player {
  id: number;
  name: string;
  drawed: boolean;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
    this.drawed = false;
  }
}
