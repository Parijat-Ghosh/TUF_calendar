export interface Note {
  title: string;
  content: string;
  rangeLabel: string;
  key?: string;
}

export interface Notes {
  [key: string]: Note;
}

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface DayData {
  day: number;
  month: number;
  year: number;
  isCurrentMonth: boolean;
}
