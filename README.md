# ShkDate Library

A TypeScript class for handling date and time with customizable formats and validations, designed to manage dates and times in a flexible way.

# Features

    Custom date formats (DMY, YMD, etc.) and separators.
    Custom time formats (HMS, MHS, etc.) and separators.
    Support for various languages.
    Validation for date irregularities, such as leap years and month-specific day limits.
    Easy-to-use methods for getting and setting date and time components.
    Option to fill zeros in date and time (e.g., 01/01/2024 vs. 1/1/2024).

# Types

    allowedDateFormat: Type for specifying accepted date formats.
    allowedTimeFormat: Type for specifying accepted time formats.
    allowedLanguages: Type representing supported languages for date localization.

# Constructor

constructor(date?: string)

    Creates a ShkDate instance, optionally accepting a date string in a specific format.

# Properties

    dateFormat: The format of the date (e.g., YMD, DMY).
    timeFormat: The format of the time (e.g., HMS, MSH).
    dateSeparator: Character(s) separating date components (e.g., -, /).
    timeSeparator: Character(s) separating time components or custom indicators (h, m, s).
    fillZeros: Boolean indicating if leading zeros should be added to date and time components.
    language: The language for date localization (e.g., en-US, fr-FR).

# Methods
## Getters and Setters

    getYear(), setYear(year: number | string): Get or set the year.
    getMonth(), setMonth(month: IntRange<1,13> | string): Get or set the month.
    getDay(), setDay(day: IntRange<1,32> | string): Get or set the day.
    getHours(), setHours(hours: IntRange<0,24> | string): Get or set the hour.
    getMinutes(), setMinutes(minutes: IntRange<0,60> | string): Get or set the minutes.
    getSeconds(), setSeconds(seconds: IntRange<0,60> | string): Get or set the seconds.

## Date and Time Handling

    getDate(), setDate(date: string): Get or set the full date as a string.
    getTime(), setTime(time: string): Get or set the time as a string.

# Example Usage

    const myDate = new ShkDate('2024-11-05 14:30:00');
    myDate.dateFormat = 'DMY';
    myDate.dateSeparator = '/';
    myDate.fillZeros = true;

    console.log(myDate.date); // Outputs: "05/11/2024"
    console.log(myDate.time); // Outputs: "14:30:00"

# License

This project is licensed under the MIT License.
