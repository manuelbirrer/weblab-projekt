export interface Meal {
  _id: string;
  date: Date;
  recipe: string;
  cook: string;
  note: string;
}

export interface DayOfMeals {
  date: Date;
  meals: Meal[];
}

export class Week {
  private readonly _monday: Date;
  private readonly _sunday: Date;

  constructor(date: Date = new Date()) {
    this._monday = Week.getMondayOf(date);
    this._sunday = Week.getSundayOf(date);
  }

  get monday(): Date {
    return new Date(this._monday);
  }

  get prevMonday(): Date {
    const prevMonday = new Date(this._monday);
    prevMonday.setDate(prevMonday.getDate() - 7);
    return prevMonday;
  }

  get nextMonday(): Date {
    const nextMonday = new Date(this._monday);
    nextMonday.setDate(nextMonday.getDate() + 7);
    return nextMonday;
  }

  get sunday(): Date {
    return new Date(this._sunday);
  }

  static getMondayOf(date: Date): Date {
    const daysSinceMonday = (date.getDay() || 7) - 1;
    const monday = new Date(date);
    monday.setDate(date.getDate() - daysSinceMonday);
    monday.setHours(0, 0, 0, 0);
    return monday;
  }

  static getSundayOf(date: Date): Date {
    const daysToSunday = 7 - (date.getDay() || 7);
    const sunday = new Date(date);
    sunday.setDate(date.getDate() + daysToSunday);
    sunday.setHours(23, 59, 59, 999);
    return sunday;
  }
}

export class DateHelper {
  static isSameDay(dateA: Date, dateB: Date): boolean {
    return dateA.getDate() === dateB.getDate() &&
      dateA.getMonth() === dateB.getMonth() &&
      dateA.getFullYear() === dateB.getFullYear();
  }
}
