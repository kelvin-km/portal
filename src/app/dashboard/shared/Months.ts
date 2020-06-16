export class Months {
  static month: string;

  static getMonth(monthValue: number): string {

    if (monthValue === 0) {
      this.month = "Jan";
    }
    if (monthValue === 1) {
      this.month = "Feb";
    }
    if (monthValue === 2) {
      this.month = "March";
    }
    if (monthValue === 3) {
      this.month = "April";
    }
    if (monthValue === 4) {
      this.month = "May";
    }
    if (monthValue === 5) {
      this.month = "June";
    }
    if (monthValue === 6) {
      this.month = "July";
    }
    if (monthValue === 7) {
      this.month = "Aug";
    }
    if (monthValue === 8) {
      this.month = "Sep";
    }
    if (monthValue === 9) {
      this.month = "Oct";
    }
    if (monthValue === 10) {
      this.month = "Nov";
    }
    if (monthValue === 11) {
      this.month = "Dec";
    }
    return this.month;
  }
}
