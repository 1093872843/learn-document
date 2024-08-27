import { father } from "./module1";

export class Son implements father {
  constructor() {}
  public say(a: string): void {
    console.log(a);
  }
}


