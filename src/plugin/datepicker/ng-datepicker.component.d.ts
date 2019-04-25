import { OnInit, EventEmitter, SimpleChanges, OnChanges, ElementRef } from '@angular/core';
export declare class NgDatepickerComponent implements OnInit, OnChanges {
    width: string;
    initDate: any;
    isHidden: boolean;
    defaultShow: boolean;
    minDate: Date;
    maxDate: Date;
    disabledDates: any[];
    availableDates: any[];
    displayDateType: boolean;
    quickDateBars: QuickDateBar[];
    selectedQuickDateBar: QuickDateBar;
    daysOfWeekDisabled: number[];
    language: string;
    placeholder: string;
    offset: string;
    datePickerBox: ElementRef;
    ngModelChange: EventEmitter<any>;
    changeDateFlag: boolean;
    weekTitleEn: string[];
    weekTitleZh: string[];
    showYearMonth: boolean;
    monthArray: Array<number>;
    yearArray: Array<number>;
    displayDate: string;
    dates: Array<Day[]>;
    titleYear: number;
    titleMonth: number;
    pickerTitle: string;
    today: Date;
    monthDays: number[];
    monthFullName: string[];
    monthName: string[];
    _minDate: Date;
    _maxDate: Date;
    _disabledDates: (Date | string)[];
    _availableDates: (Date | string)[];
    _daysOfWeekDisabled: number[];
    minYear: number;
    minMonth: number;
    maxYear: number;
    maxMonth: number;
    selectedDate: SelectedDate;
    outputDate: OutputDate;
    startDate: Date;
    endDate: Date;
    hasSelectedBar: boolean;
    hasInitDate: boolean;
    isInited: boolean;
    constructor();
    ngOnInit(): void;
    onDocumentClick(ev: any): void;
    ngOnChanges(changes: SimpleChanges): void;
    decreaseYear(): void;
    increaseYear(): void;
    selectMonth(ev: any, month: number): void;
    selectYear(ev: any, year: number): void;
    calcYear(minYear: number): number[];
    clearDate(): void;
    selectYearMonth(): void;
    createEmptyDatePicker(): void;
    initDatePicker(date: Date): void;
    clearDateByOther(): void;
    selectionEmitter(d: Day, isInit?: boolean): void;
    selectDate(d: Day): void;
    isDateSelected(d: Day): boolean;
    isDateDisbalbed(date: Date): boolean;
    /**
     * Formate displaying month to full name
     */
    renderTitle(): string;
    initInput(): void;
    calCalendar(): void;
    increaseMonth(): void;
    decreaseMonth(): void;
    isSelectedDay(y: number, m: number, d: number, num: number): boolean;
    isHoliday(y: number, m: number, d: number, num: number): boolean;
    calMonthEndDay(y: number, m: number, num: number): number;
    clearCalendar(): void;
    resetCalendar(year: number, month: number): void;
    selectBar(bar: QuickDateBar): void;
    setAvailableDates(bar: QuickDateBar): void;
    isBarSelected(bar: QuickDateBar): boolean;
    renderDisplayDate(date: Date): string;
    toggleCalendar(isHidden?: boolean): void;
    outputEvent(): void;
}
export declare class Day {
    date: number;
    num: number;
    isHoliday: boolean;
    isInMonth: boolean;
    isSelected: boolean;
    isInRange: boolean;
    isDisabled: boolean;
    year: number;
    month: number;
    constructor(date: number, num?: number, isHoliday?: boolean, isInMonth?: boolean, isSelected?: boolean, isInRange?: boolean, isDisabled?: boolean, year?: number, month?: number);
}
export declare class SelectedDate {
    year: number;
    month: number;
    day: number;
    constructor(year: number, month: number, day: number);
}
export interface QuickDateBar {
    date?: Date;
    startDate?: Date;
    endDate?: Date;
    minDate?: Date;
    maxDate?: Date;
    disabledDates?: (Date | string)[];
    availableDates?: (Date | string)[];
    daysOfWeekDisabled?: number[];
    label?: string;
    value?: string;
    monthly?: true;
    children?: QuickDateBar;
}
export interface OutputDate {
    date?: Date;
    startDate?: Date;
    endDate?: Date;
    dateType?: QuickDateBar;
}
