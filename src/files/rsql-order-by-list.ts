import { RSQLOrderByExpression } from './rsql-order-by-expression';

export class RSQLOrderByList {
  private orderByList: Array<RSQLOrderByExpression>;

  constructor() {
    this.orderByList = [];
  }

  public add(field: string, direction: 'asc' | 'desc'): void {
    const o = new RSQLOrderByExpression(field, direction);
    this.orderByList.push(o);
  }

  public addExpression(orderBy: RSQLOrderByExpression): void {
    this.orderByList.push(orderBy);
  }

  public build(): string {
    let str = '';
    let includeConnector = false;
    if (this.orderByList.length > 0) {
      for (const o of this.orderByList) {
        str +=
          (includeConnector ? encodeURIComponent(', ') : '') +
          encodeURIComponent(`${o.field} ${o.direction}`);
        includeConnector = true;
      }
    }
    return str;
  }
}
