type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>

type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>
type allowedDateFormat = 'DMY' | 'DYM' | 'MDY' | 'MYD' | 'YDM' | 'YMD';
type allowedTimeFormat = 'HMS' | 'HSM' | 'MHS' | 'MSH' | 'SHM' | 'SMH';

interface shkDateI {
    year: number;
    month: IntRange<1,13>
    day: IntRange<1,32>

    hours: IntRange<0,24>
    minutes: IntRange<0,60>
    seconds: IntRange<0,60>
}

class ShkDate {
    private _date: shkDateI = {day: undefined, month: undefined, year: undefined, hours: undefined, minutes: undefined, seconds: undefined};
    
    private _dateFormat: allowedDateFormat = 'YMD';
    private _timeFormat: allowedTimeFormat = 'HMS';
    private _dateSeparator = '-'; //Date value separator. Examples: 01/01/0001 (/). 01.01.0001 (.)
    private _timeSeparator = ':'; //Time value separator. Examples: 15:15:00 (:). 15.15.00 (.) ; If separator set as 'tempo' it will set h to hour, m to minutes and s to seconds. Exemple: 01h02m03s. 
    private _fillZeros = true; //Add zero to values. Example 01/01/0001 or 1/1/1
    private _checkIrregular = true; //Check irregular handling on update such as leap years, this is disabled when there is need to check the date as a whole and not only one part of it while updating the date.

    private _jsYear = new Date().getFullYear();
    private _jsMonth = new Date().getMonth();
    private _jsDay = new Date().getDate();
    private _jsHour = new Date().getHours();
    private _jsMinute = new Date().getMinutes();
    private _jsSecond = new Date().getSeconds();

    private _dicMonth = {
        1:'Jan',
        2:'Feb',
        3:'Mar',
        4:'Apr',
        5:'May',
        6:'Jun',
        7:'Jul',
        8:'Aug',
        9:'Sep',
        10:'Oct',
        11:'Nov',
        12:'Dec'
    }

    constructor(date?: string) {
        if(!date) {
            this._date.day = <IntRange<1,32>>this._jsDay;
            this._date.month = <IntRange<1,13>>(this._jsMonth+1);
            this._date.year = this._jsYear;
            this._date.hours = <IntRange<0,24>>this._jsHour;
            this._date.minutes = <IntRange<0,60>>this._jsMinute;
            this._date.seconds = <IntRange<0,60>>this._jsSecond;
            return;
        }
        
        if(typeof(date) === 'string') {
            try {
                let dateSpaceSplit = date.split(' ');

                if(dateSpaceSplit.length < 1 || dateSpaceSplit.length > 2) throw('Invalid date format. The string spacing is wrong. Example: YYYY-MM-DD HH:MM:SS');
                else if(dateSpaceSplit.length == 2) {
                    this.setTime(dateSpaceSplit[1]);
                } else {  
                    this._date.hours = <IntRange<0,24>>this._jsHour;
                    this._date.minutes = <IntRange<0,60>>this._jsMinute;
                    this._date.seconds = <IntRange<0,60>>this._jsSecond;
                }
                
                this.setDate(dateSpaceSplit[0]);
                
            } catch(err) {
                throw(err);
            }

            return;
        }
    }

    private updateJSDate(): void {
        this._jsYear = new Date().getFullYear();
        this._jsMonth = new Date().getMonth();
        this._jsDay = new Date().getDate();
        this._jsHour = new Date().getHours();
        this._jsMinute = new Date().getMinutes();
        this._jsSecond = new Date().getSeconds();
    }

    public get dateFormat(): allowedDateFormat { return this.getDateFormat() };
    public getDateFormat(): allowedDateFormat { return this._dateFormat };
    public set dateFormat(dateFormat: allowedDateFormat) { this.setDateFormat(dateFormat) };
    public setDateFormat(dateFormat: allowedDateFormat) { this._dateFormat = dateFormat };

    public get timeFormat(): allowedTimeFormat { return this.getTimeFormat() };
    public getTimeFormat(): allowedTimeFormat { return this._timeFormat };
    public set timeFormat(timeFormat: allowedTimeFormat) { this.setTimeFormat(timeFormat) };
    public setTimeFormat(timeFormat: allowedTimeFormat) { this._timeFormat = timeFormat };

    public get dateSeparator(): string { return this.getDateSeparator() };
    public getDateSeparator(): string { return this._dateSeparator };
    public set dateSeparator(dateSeparator: string) { this.setDateSeparator(dateSeparator) };
    public setDateSeparator(dateSeparator: string): void { this._dateSeparator = dateSeparator };

    public get timeSeparator(): string { return this.getTimeSeparator() };
    public getTimeSeparator(): string { return this._timeSeparator };
    public set timeSeparator(timeSeparator: string) { this.setTimeSeparator(timeSeparator) };
    public setTimeSeparator(timeSeparator: string): void { this._timeSeparator = timeSeparator };

    public get fillZeros(): boolean { return this.getFillZeros() };
    public getFillZeros(): boolean { return this._fillZeros };
    public set fillZeros(fillZeros: boolean) { this.setFillZeros(fillZeros) };
    public setFillZeros(fillZeros: boolean) { this._fillZeros = fillZeros };

    public get year(): number | string { return this.getYear() };
    public getYear(): number | string  { return this._date.year < 10 ? '000' + this._date.year : this._date.year < 100 ? '00' + this._date.year : this._date.year < 1000 ? '0' + this._date.year : this._date.year.toString() };
    public set year(year: number | string ) { this.setYear(year) };
    public setYear(year: number | string ) {
        let reYear = '^[0-9]{1,4}$';
        if(year.toString().trim() === '') year = (<IntRange<0,24>>this._jsYear).toString();
        year = parseInt(year.toString());
        if(new RegExp(`^${reYear}$`).test(year.toString())) {
            if(this._checkIrregular) {
                if(this._date.month % 2 === 0 && this._date.day > 30) throw('Invalid Date format. The given month don\'t have more than 30 days.');
                if(this._date.month === 2 && (this._date.day > 28 && year % 4 != 0) ) throw(`Invalid Date format. The given month don\'t have more than 28 days. ${this._date.day === 29 ? year + ' is not a leap year.' : ''}`);
                else if(this._date.month === 2 && (this._date.day > 29 ) ) throw('Invalid Date format. The given month don\'t have more than 29 days.');
            }
            this._date.year = parseInt(year.toString());
        } else throw('Invalid Date format. The year don\'t match a year format.');
    };
    
    public get month(): IntRange<1,13> | string { return this.getMonth() };
    public getMonth(): IntRange<1,13> | string { return this._date.month < 10 && this._fillZeros ? '0' + this._date.month : this._date.month.toString() };
    public set month(month: IntRange<1,13> | string) { this.setMonth(month) };
    public setMonth(month: IntRange<1,13> | string) {
        let reMonth = '^(0?[1-9]|1[0-2])$';
        if(month.toString().trim() === '') month = (<IntRange<0,24>>this._jsMonth+1).toString();
        month = <IntRange<1,13>>parseInt(month.toString());
        if(new RegExp(`^${reMonth}$`).test(month.toString())) {
            if(this._checkIrregular) {
                if(month % 2 === 0 && this._date.day > 30) throw('Invalid Date format. The given month don\'t have more than 30 days.');
                if(month === 2 && (this._date.day > 28 && this._date.year % 4 != 0) ) throw(`Invalid Date format. The given month don\'t have more than 28 days. ${this._date.day === 29 ? this._date.year + ' is not a leap year.' : ''}`);
                else if(month === 2 && (this._date.day > 29) ) throw('Invalid Date format. The given month don\'t have more than 29 days.');
            }
            this._date.month = <IntRange<1,13>>parseInt(month.toString());
        } else throw('Invalid Date format. The month don\'t match a 1 to 12 month format.');
    };

    public get day(): IntRange<1,32> | string { return this.getDay() };
    public getDay(): IntRange<1,32> | string { return this._date.day < 10 && this._fillZeros ? '0' + this._date.day : this._date.day.toString() };
    public set day(day: IntRange<1,32> | string) { this.setDay(day) };
    public setDay(day: IntRange<1,32> | string) {
        let reDay = '^([12]?[0-9]|0[1-9]|3[01])$';
        if(day.toString().trim() === '') day = (<IntRange<0,24>>this._jsDay).toString();
        day = <IntRange<1,32>>parseInt(day.toString());
        if(new RegExp(`^${reDay}$`).test(day.toString())) {
            if(this._checkIrregular) {
                if(this._date.month % 2 === 0 && day > 30) throw('Invalid Date format. The given month don\'t have more than 30 days.');
                if(this._date.month === 2 && (day > 28 && this._date.year % 4 != 0) ) throw(`Invalid Date format. The given month don\'t have more than 28 days. ${day === 29 ? this._date.year + ' is not a leap year.' : ''}`);
                else if(this._date.month === 2 && (day > 29) ) throw('Invalid Date format. The given month don\'t have more than 29 days.');
            }
            this._date.day = <IntRange<1,32>>parseInt(day.toString());
        } else throw('Invalid Date format. The day don\'t match a 1 to 31 days format.');
    };

    public get hours(): IntRange<0,24> | string { return this.getHours() };
    public getHours(): IntRange<0,24> | string { return this._date.hours < 10 && this._fillZeros ? '0' + this._date.hours : this._date.hours.toString() };
    public set hours(hours: IntRange<0,24> | string) { this.setHours(hours) };
    public setHours(hours: IntRange<0,24> | string) {
        let reHour = '^([01]?[0-9]|2[0-3])$';
        if(hours.toString().trim() === '') hours = (<IntRange<0,24>>this._jsHour).toString();
        if(new RegExp(`^${reHour}$`).test(hours.toString())) {
            this._date.hours = <IntRange<0,24>>parseInt(hours.toString());
        } else throw('Invalid Time format. The hour don\'t match a 00 to 23 hours format.');
    };

    public get minutes(): IntRange<0,60> | string { return this.getMinutes() };
    public getMinutes(): IntRange<0,60> | string { return this._date.minutes < 10 && this._fillZeros ? '0' + this._date.minutes : this._date.minutes.toString() };
    public set minutes(minutes: IntRange<0,60> | string) { this.setMinutes(minutes) };
    public setMinutes(minutes: IntRange<0,60> | string) {
        let reMinute = '^[0-5]?[0-9]$';
        if(minutes.toString().trim() === '') minutes = (<IntRange<0,60>>this._jsMinute).toString();
        if(new RegExp(`^${reMinute}$`).test(minutes.toString())) {
            this._date.minutes = <IntRange<0,60>>parseInt(minutes.toString());
        } else throw('Invalid Time format. The minutes don\'t match a 0 to 59 minutes format.');
    };

    public get seconds(): IntRange<0,60> | string { return this.getSeconds() };
    public getSeconds(): IntRange<0,60> | string { return this._date.seconds < 10 && this._fillZeros ? '0' + this._date.seconds : this._date.seconds.toString() }
    public set seconds(seconds: IntRange<0,60> | string) { this.setSeconds(seconds) };
    public setSeconds(seconds: IntRange<0,60> | string) {
        let reSecond = '^[0-5]?[0-9]$';
        if(!seconds || seconds.toString().trim() === '') seconds = (<IntRange<0,60>>this._jsSecond).toString();
        if(new RegExp(`^${reSecond}$`).test(seconds.toString())) {
            this._date.seconds = <IntRange<0,60>>parseInt(seconds.toString());
        } else throw('Invalid Time format. The seconds don\'t match a 0 to 59 seconds format.');
    };

    public get date(): string { return this.getDate() };
    public getDate(): string {
        let sDate = '';
        let arrDateFormat = Array.from(this._dateFormat);
        arrDateFormat.forEach((letter, index) => {
            if(letter === 'Y') sDate += this.getYear();
            if(letter === 'M') sDate += this.getMonth();
            if(letter === 'D') sDate += this.getDay();

            if(arrDateFormat.length-1 != index) sDate += this._dateSeparator; 
        })

        return sDate;
    };
    public set date(date: string) { this.setDate(date) };
    public setDate(date: string) {
        //This part validation cannot be set individually like Time because the Date is being validated as a whole,
        //so irregular details like leap years has to be in account with the whole Date and not the parts itself
        // as is done in the individual set's.

        let reDay = '^([12]?[0-9]|0[1-9]|3[01])$';
        let reMonth = '^(0?[1-9]|1[0-2])$';
        let reYear = '^[0-9]{1,4}$';

        let dateDateSplit = date.split(this._dateSeparator);
        this._checkIrregular = false;

        let formatPosYear = this._dateFormat.indexOf('Y');
        let formatPosMonth = this._dateFormat.indexOf('M');
        let formatPosDay = this._dateFormat.indexOf('D');

        if(dateDateSplit.length > 3) throw('Invalid date format. The string dashing is wrong. Example: YYYY-MM-DD HH:MM:SS');

        switch (dateDateSplit.length) {
            case 3:
                if(formatPosDay === 2) this.setDay(dateDateSplit[2]);
                else if(formatPosMonth === 2) this.setMonth(dateDateSplit[2]);
                else this.setYear(dateDateSplit[2]);
            case 2:
                if(formatPosDay === 1) this.setDay(dateDateSplit[1]);
                else if(formatPosMonth === 1) this.setMonth(dateDateSplit[1]);
                else this.setYear(dateDateSplit[1]);
            case 1:
                if(formatPosDay === 0) this.setDay(dateDateSplit[0]);
                else if(formatPosMonth === 0) this.setMonth(dateDateSplit[0]);
                else this.setYear(dateDateSplit[0]);
            
            this._checkIrregular = true;
            //SPECIFIC HANDLING - This one ignores _checkIrregular.
            if(this._date.month % 2 === 0 && this._date.day > 30) throw('Invalid Date format. The given month don\'t have more than 30 days.');
            if(this._date.month === 2 && (this._date.day > 28 && this._date.year % 4 != 0) ) throw(`Invalid Date format. The given month don\'t have more than 28 days. ${this._date.day === 29 ? this._date.year + ' is not a leap year.' : ''}`);
            else if(this._date.month === 2 && (this._date.day > 29 ) ) throw('Invalid Date format. The given month don\'t have more than 29 days.');
        }
    }

    public get time(): string { return this.getTime() };
    public getTime(): string {
        let sTime = '';
        let arrTimeFormat = Array.from(this._timeFormat);
        arrTimeFormat.forEach((letter, index) => {
            if(letter === 'H') { sTime += this.getHours(); if(this._timeSeparator === 'tempo') sTime += 'h'};
            if(letter === 'M') { sTime += this.getMinutes(); if(this.timeSeparator === 'tempo') sTime += 'm' };
            if(letter === 'S') { sTime += this.getSeconds(); if(this.timeSeparator === 'tempo') sTime += 's' };

            if(this._timeSeparator != 'tempo' && arrTimeFormat.length-1 != index) sTime += this._timeSeparator;
        })

        return sTime;
    }
    public set time(time: string) { this.setTime(time) };
    public setTime(time: string) {
        this.updateJSDate();
        this._date.hours = <IntRange<0,24>>this._jsHour;
        this._date.minutes = <IntRange<0,60>>this._jsMinute;
        this._date.seconds = <IntRange<0,60>>this._jsSecond;

        let dateTimeSplit = time.split(this._timeSeparator);
        if(dateTimeSplit.length > 3) throw('Invalid date format. The string double dotting is wrong. Example: YYYY-MM-DD HH:MM:SS');
        switch (dateTimeSplit.length) {
            case 3: this.setSeconds(dateTimeSplit[2]);
            case 2: this.setMinutes(dateTimeSplit[1]);
            case 1: this.setHours(dateTimeSplit[0]);
        }
    }

    public get dateTime(): string { return this.getDateTime() };
    public getDateTime(): string {
        return `${this.getDate()} ${this.getTime()}`;
    }
    public set dateTime(dateTime: string) { this.setDateTime(dateTime) };
    public setDateTime(dateTime: string) {
        let dateSpaceSplit = dateTime.split(' ');

        if(dateSpaceSplit.length < 1 || dateSpaceSplit.length > 2) throw('Invalid date format. The string spacing is wrong. Example: YYYY-MM-DD HH:MM:SS');
        else if(dateSpaceSplit.length == 2) {
            this.setTime(dateSpaceSplit[1]);
        } else {  
            this._date.hours = <IntRange<0,24>>this._jsHour;
            this._date.minutes = <IntRange<0,60>>this._jsMinute;
            this._date.seconds = <IntRange<0,60>>this._jsSecond;
        }

        this.setDate(dateSpaceSplit[0]);
    }

    public get extMonth(): string { return this.getExtMonth() };
    public getExtMonth(): string { return this._dicMonth[this._date.month]}

}

let date = new ShkDate();
console.log(date.dateTime);

module.exports = { ShkDate };