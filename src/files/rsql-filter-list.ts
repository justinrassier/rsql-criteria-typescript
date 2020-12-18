import { RSQLFilterExpression } from './rsql-filter-expression';

export class RSQLFilterList {
  private andList: Array<RSQLFilterExpression | RSQLFilterList>;
  private orList: Array<RSQLFilterExpression | RSQLFilterList>;

  constructor() {
    this.andList = [];
    this.orList = [];
  }

  /* eslint-disable @typescript-eslint/explicit-module-boundary-types*/
  public and(filter: RSQLFilterExpression | RSQLFilterList) {
    if (filter !== undefined && filter !== null && filter.build() !== '') {
      this.andList.push(filter);
    }
  }

  /* eslint-disable @typescript-eslint/explicit-module-boundary-types*/
  public or(filter: RSQLFilterExpression | RSQLFilterList) {
    if (filter !== undefined && filter !== null && filter.build() !== '') {
      this.orList.push(filter);
    }
  }

  /**
   * Builds the filter string for this list of filters.
   * If there is more than one filter expression, it puts
   * parenthesis around the expression.
   */
  public build(): string {
    let filterString = '';
    const includeParens = this.andList.length + this.orList.length > 1;
    let includeConnector = false;
    if (includeParens) {
      filterString += '(';
    }
    for (const filter of this.andList) {
      if (includeConnector) {
        filterString += encodeURIComponent(' and ');
      }
      filterString += filter.build();
      includeConnector = true;
    }
    for (const filter of this.orList) {
      if (includeConnector) {
        filterString += encodeURIComponent(' or ');
      }
      filterString += filter.build();
      includeConnector = true;
    }
    if (includeParens) {
      filterString += ')';
    }

    return filterString;
  }
}
