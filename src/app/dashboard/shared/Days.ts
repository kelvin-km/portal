export class Days {
  static day: string;

  static getDay(dayValue: number): string {
    if (dayValue === 0) {
      this.day = "Monday";
    }
    if (dayValue === 1) {
      this.day = "Tuesday";
    }
    if (dayValue === 2) {
      this.day = "Wednesday";
    }
    if (dayValue === 3) {
      this.day = "Thursday";
    }
    if (dayValue === 4) {
      this.day = "Friday";
    }
    if (dayValue === 5) {
      this.day = "Saturday";
    }
    if (dayValue === 6) {
      this.day = "Sunday";
    }
    return this.day;
  }
}
