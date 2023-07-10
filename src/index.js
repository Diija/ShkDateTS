export class ShkDate {
    constructor(date, args) {
        this._date = { day: undefined, month: undefined, year: undefined, hours: undefined, minutes: undefined, seconds: undefined, ms: undefined };
        this._dateFormat = 'YMD';
        this._timeFormat = 'HMS';
        this._dateSeparator = '-'; //Date value separator. Examples: 01/01/0001 (/). 01.01.0001 (.)
        this._timeSeparator = ':'; //Time value separator. Examples: 15:15:00 (:). 15.15.00 (.) ; If separator set as 'tempo' it will set h to hour, m to minutes and s to seconds. Exemple: 01h02m03s. 
        this._fillZeros = true; //Add zero to values. Example 01/01/0001 or 1/1/1
        this._language = navigator.language;
        this._checkIrregular = true; //Check irregular handling on update such as leap years, this is disabled when there is need to check the date as a whole and not only one part of it while updating the date.
        this._jsYear = new Date().getFullYear();
        this._jsMonth = new Date().getMonth();
        this._jsDay = new Date().getDate();
        this._jsHour = new Date().getHours();
        this._jsMinute = new Date().getMinutes();
        this._jsSecond = new Date().getSeconds();
        this._jsMS = new Date().getMilliseconds();
        if (!date) {
            this._date.day = this._jsDay;
            this._date.month = (this._jsMonth + 1);
            this._date.year = this._jsYear;
            this._date.hours = this._jsHour;
            this._date.minutes = this._jsMinute;
            this._date.seconds = this._jsSecond;
            this._date.ms = this._jsMS;
            return;
        }
        if (date instanceof Date) {
            this._date.day = date.getDate();
            this._date.month = (date.getMonth() + 1);
            this._date.year = date.getFullYear();
            this._date.hours = date.getHours();
            this._date.minutes = date.getMinutes();
            this._date.seconds = date.getSeconds();
            this._date.ms = date.getMilliseconds();
            return;
        }
        if (typeof (date) === 'string') {
            try {
                if (args) {
                    Object.keys(args).forEach(argKey => {
                        if (args[argKey] && this['_' + argKey] != undefined)
                            this['_' + argKey] = args[argKey];
                    });
                }
                let dateSpaceSplit = date.split(' ');
                if (dateSpaceSplit.length < 1 || dateSpaceSplit.length > 2)
                    throw ('Invalid date format. The string spacing is wrong. Example: YYYY-MM-DD HH:MM:SS');
                else if (dateSpaceSplit.length == 2) {
                    this.setTime(dateSpaceSplit[1]);
                }
                else {
                    this._date.hours = this._jsHour;
                    this._date.minutes = this._jsMinute;
                    this._date.seconds = this._jsSecond;
                    this._date.ms = this._jsMS;
                }
                this.setDate(dateSpaceSplit[0]);
            }
            catch (err) {
                throw (err);
            }
            return;
        }
    }
    updateJSDate() {
        this._jsYear = new Date().getFullYear();
        this._jsMonth = new Date().getMonth();
        this._jsDay = new Date().getDate();
        this._jsHour = new Date().getHours();
        this._jsMinute = new Date().getMinutes();
        this._jsSecond = new Date().getSeconds();
        this._jsMS = new Date().getMilliseconds();
    }
    get dateFormat() { return this.getDateFormat(); }
    ;
    getDateFormat() { return this._dateFormat; }
    ;
    set dateFormat(dateFormat) { this.setDateFormat(dateFormat); }
    ;
    setDateFormat(dateFormat) { this._dateFormat = dateFormat; }
    ;
    get timeFormat() { return this.getTimeFormat(); }
    ;
    getTimeFormat() { return this._timeFormat; }
    ;
    set timeFormat(timeFormat) { this.setTimeFormat(timeFormat); }
    ;
    setTimeFormat(timeFormat) { this._timeFormat = timeFormat; }
    ;
    get dateSeparator() { return this.getDateSeparator(); }
    ;
    getDateSeparator() { return this._dateSeparator; }
    ;
    set dateSeparator(dateSeparator) { this.setDateSeparator(dateSeparator); }
    ;
    setDateSeparator(dateSeparator) { this._dateSeparator = dateSeparator; }
    ;
    get timeSeparator() { return this.getTimeSeparator(); }
    ;
    getTimeSeparator() { return this._timeSeparator; }
    ;
    set timeSeparator(timeSeparator) { this.setTimeSeparator(timeSeparator); }
    ;
    setTimeSeparator(timeSeparator) { this._timeSeparator = timeSeparator; }
    ;
    get fillZeros() { return this.getFillZeros(); }
    ;
    getFillZeros() { return this._fillZeros; }
    ;
    set fillZeros(fillZeros) { this.setFillZeros(fillZeros); }
    ;
    setFillZeros(fillZeros) { this._fillZeros = fillZeros; }
    ;
    set language(language) { this.setLanguage(language); }
    ;
    setLanguage(language) {
        if (!language)
            return;
        this._language = language;
    }
    ;
    get year() { return this.getYear(); }
    ;
    getYear() { return this._date.year < 10 ? '000' + this._date.year : this._date.year < 100 ? '00' + this._date.year : this._date.year < 1000 ? '0' + this._date.year : this._date.year.toString(); }
    ;
    set year(year) { this.setYear(year); }
    ;
    setYear(year) {
        let reYear = '^[0-9]{1,4}$';
        if (year.toString().trim() === '')
            year = this._jsYear.toString();
        year = parseInt(year.toString());
        if (new RegExp(`^${reYear}$`).test(year.toString())) {
            if (this._checkIrregular) {
                if (this._date.month % 2 === 0 && this._date.day > 30)
                    throw ('Invalid Date format. The given month don\'t have more than 30 days.');
                if (this._date.month === 2 && (this._date.day > 28 && year % 4 != 0))
                    throw (`Invalid Date format. The given month don\'t have more than 28 days. ${this._date.day === 29 ? year + ' is not a leap year.' : ''}`);
                else if (this._date.month === 2 && (this._date.day > 29))
                    throw ('Invalid Date format. The given month don\'t have more than 29 days.');
            }
            this._date.year = parseInt(year.toString());
        }
        else
            throw ('Invalid Date format. The year don\'t match a year format.');
    }
    ;
    get month() { return this.getMonth(); }
    ;
    getMonth() { return this._date.month < 10 && this._fillZeros ? '0' + this._date.month : this._date.month.toString(); }
    ;
    set month(month) { this.setMonth(month); }
    ;
    setMonth(month) {
        let reMonth = '^(0?[1-9]|1[0-2])$';
        if (month.toString().trim() === '')
            month = (this._jsMonth + 1).toString();
        month = parseInt(month.toString());
        if (new RegExp(`^${reMonth}$`).test(month.toString())) {
            if (this._checkIrregular) {
                if (month % 2 === 0 && this._date.day > 30)
                    throw ('Invalid Date format. The given month don\'t have more than 30 days.');
                if (month === 2 && (this._date.day > 28 && this._date.year % 4 != 0))
                    throw (`Invalid Date format. The given month don\'t have more than 28 days. ${this._date.day === 29 ? this._date.year + ' is not a leap year.' : ''}`);
                else if (month === 2 && (this._date.day > 29))
                    throw ('Invalid Date format. The given month don\'t have more than 29 days.');
            }
            this._date.month = parseInt(month.toString());
        }
        else
            throw ('Invalid Date format. The month don\'t match a 1 to 12 month format.');
    }
    ;
    get day() { return this.getDay(); }
    ;
    getDay() { return this._date.day < 10 && this._fillZeros ? '0' + this._date.day : this._date.day.toString(); }
    ;
    set day(day) { this.setDay(day); }
    ;
    setDay(day) {
        let reDay = '^([12]?[0-9]|0[1-9]|3[01])$';
        if (day.toString().trim() === '')
            day = this._jsDay.toString();
        day = parseInt(day.toString());
        if (new RegExp(`^${reDay}$`).test(day.toString())) {
            if (this._checkIrregular) {
                if (this._date.month % 2 === 0 && day > 30)
                    throw ('Invalid Date format. The given month don\'t have more than 30 days.');
                if (this._date.month === 2 && (day > 28 && this._date.year % 4 != 0))
                    throw (`Invalid Date format. The given month don\'t have more than 28 days. ${day === 29 ? this._date.year + ' is not a leap year.' : ''}`);
                else if (this._date.month === 2 && (day > 29))
                    throw ('Invalid Date format. The given month don\'t have more than 29 days.');
            }
            this._date.day = parseInt(day.toString());
        }
        else
            throw ('Invalid Date format. The day don\'t match a 1 to 31 days format.');
    }
    ;
    get hours() { return this.getHours(); }
    ;
    getHours() { return this._date.hours < 10 && this._fillZeros ? '0' + this._date.hours : this._date.hours.toString(); }
    ;
    set hours(hours) { this.setHours(hours); }
    ;
    setHours(hours) {
        let reHour = '^([01]?[0-9]|2[0-3])$';
        if (hours.toString().trim() === '') {
            hours = this._jsHour.toString();
        }
        ;
        if (new RegExp(`^${reHour}$`).test(hours.toString())) {
            this._date.hours = parseInt(hours.toString());
        }
        else
            throw ('Invalid Time format. The hour don\'t match a 00 to 23 hours format.');
    }
    ;
    get minutes() { return this.getMinutes(); }
    ;
    getMinutes() { return this._date.minutes < 10 && this._fillZeros ? '0' + this._date.minutes : this._date.minutes.toString(); }
    ;
    set minutes(minutes) { this.setMinutes(minutes); }
    ;
    setMinutes(minutes) {
        let reMinute = '^[0-5]?[0-9]$';
        if (minutes.toString().trim() === '') {
            minutes = this._jsMinute.toString();
        }
        ;
        if (new RegExp(`^${reMinute}$`).test(minutes.toString())) {
            this._date.minutes = parseInt(minutes.toString());
        }
        else
            throw ('Invalid Time format. The minutes don\'t match a 0 to 59 minutes format.');
    }
    ;
    get seconds() { return this.getSeconds(); }
    ;
    getSeconds() { return this._date.seconds < 10 && this._fillZeros ? '0' + this._date.seconds : this._date.seconds.toString(); }
    set seconds(seconds) { this.setSeconds(seconds); }
    ;
    setSeconds(seconds) {
        let reSecond = '^[0-5]?[0-9]$';
        if (!seconds || seconds.toString().trim() === '') {
            seconds = this._jsSecond.toString();
        }
        ;
        if (new RegExp(`^${reSecond}$`).test(seconds.toString())) {
            this._date.seconds = parseInt(seconds.toString());
        }
        else
            throw ('Invalid Time format. The seconds don\'t match a 0 to 59 seconds format.');
    }
    ;
    get ms() { return this.getMs(); }
    ;
    getMs() { return this._date.ms; }
    ;
    set ms(ms) { this.setMs(ms); }
    ;
    setMs(ms) {
        let reMs = '^[0-9]{3}$';
        if (!ms || ms.toString().trim() === '') {
            ms = this._jsMS.toString();
        }
        ;
        if (new RegExp(`^${reMs}$`).test(ms.toString())) {
            this._date.ms = parseInt(ms.toString());
        }
        else
            throw ('Invalid Time format. The ms don\'t match a 0 to 999 ms format.');
    }
    get date() { return this.getDate(); }
    ;
    getDate() {
        let sDate = '';
        let arrDateFormat = Array.from(this._dateFormat);
        arrDateFormat.forEach((letter, index) => {
            if (letter === 'Y')
                sDate += this.getYear();
            if (letter === 'M')
                sDate += this.getMonth();
            if (letter === 'D')
                sDate += this.getDay();
            if (arrDateFormat.length - 1 != index)
                sDate += this._dateSeparator;
        });
        return sDate;
    }
    ;
    set date(date) { this.setDate(date); }
    ;
    setDate(date) {
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
        if (dateDateSplit.length > 3)
            throw (`Invalid date format. The string separator is wrong. Example: YYYY-MM-DD HH:MM:SS`);
        switch (dateDateSplit.length) {
            case 3:
                if (formatPosDay === 2)
                    this.setDay(dateDateSplit[2]);
                else if (formatPosMonth === 2)
                    this.setMonth(dateDateSplit[2]);
                else
                    this.setYear(dateDateSplit[2]);
            case 2:
                if (formatPosDay === 1)
                    this.setDay(dateDateSplit[1]);
                else if (formatPosMonth === 1)
                    this.setMonth(dateDateSplit[1]);
                else
                    this.setYear(dateDateSplit[1]);
            case 1:
                if (formatPosDay === 0)
                    this.setDay(dateDateSplit[0]);
                else if (formatPosMonth === 0)
                    this.setMonth(dateDateSplit[0]);
                else
                    this.setYear(dateDateSplit[0]);
                this._checkIrregular = true;
                //SPECIFIC HANDLING - This one ignores _checkIrregular.
                if (this._date.month % 2 === 0 && this._date.day > 30)
                    throw ('Invalid Date format. The given month don\'t have more than 30 days.');
                if (this._date.month === 2 && (this._date.day > 28 && this._date.year % 4 != 0))
                    throw (`Invalid Date format. The given month don\'t have more than 28 days. ${this._date.day === 29 ? this._date.year + ' is not a leap year.' : ''}`);
                else if (this._date.month === 2 && (this._date.day > 29))
                    throw ('Invalid Date format. The given month don\'t have more than 29 days.');
        }
    }
    get time() { return this.getTime(); }
    ;
    getTime() {
        let sTime = '';
        let arrTimeFormat = Array.from(this._timeFormat);
        arrTimeFormat.forEach((letter, index) => {
            if (letter === 'H') {
                sTime += this.getHours();
                if (this._timeSeparator === 'tempo')
                    sTime += 'h';
            }
            ;
            if (letter === 'M') {
                sTime += this.getMinutes();
                if (this.timeSeparator === 'tempo')
                    sTime += 'm';
            }
            ;
            if (letter === 'S') {
                sTime += this.getSeconds();
                if (this.timeSeparator === 'tempo')
                    sTime += 's';
            }
            ;
            if (this._timeSeparator != 'tempo' && arrTimeFormat.length - 1 != index)
                sTime += this._timeSeparator;
        });
        return sTime;
    }
    set time(time) { this.setTime(time); }
    ;
    setTime(time) {
        this.updateJSDate();
        this._date.hours = this._jsHour;
        this._date.minutes = this._jsMinute;
        this._date.seconds = this._jsSecond;
        this._date.ms = this._jsMS;
        let dateTimeSplit = time.split(this._timeSeparator);
        if (dateTimeSplit.length > 4)
            throw ('Invalid date format. The string double dotting is wrong. Example: YYYY-MM-DD HH:MM:SS');
        switch (dateTimeSplit.length) {
            case 4: this.setMs(dateTimeSplit[3]);
            case 3: this.setSeconds(dateTimeSplit[2]);
            case 2: this.setMinutes(dateTimeSplit[1]);
            case 1: this.setHours(dateTimeSplit[0]);
        }
    }
    get dateTime() { return this.getDateTime(); }
    ;
    getDateTime() {
        return `${this.getDate()} ${this.getTime()}`;
    }
    set dateTime(dateTime) { this.setDateTime(dateTime); }
    ;
    setDateTime(dateTime) {
        let dateSpaceSplit = dateTime.split(' ');
        if (dateSpaceSplit.length < 1 || dateSpaceSplit.length > 2)
            throw ('Invalid date format. The string spacing is wrong. Example: YYYY-MM-DD HH:MM:SS');
        else if (dateSpaceSplit.length == 2) {
            this.setTime(dateSpaceSplit[1]);
        }
        else {
            this._date.hours = this._jsHour;
            this._date.minutes = this._jsMinute;
            this._date.seconds = this._jsSecond;
        }
        this.setDate(dateSpaceSplit[0]);
    }
    get extMonth() { return this.getExtMonth(); }
    ;
    getExtMonth() {
        let hFillZeros = this._fillZeros === true;
        let hFormat = ('' + this._dateFormat);
        this._fillZeros = false;
        this._dateFormat = 'YMD';
        let date = new Date(this.getDate());
        this._fillZeros = hFillZeros;
        this._dateFormat = hFormat;
        return new Intl.DateTimeFormat(this._language, { month: "long" }).format(date);
    }
    get weekDay() { return this.getWeekDay(); }
    ;
    getWeekDay() {
        let hFillZeros = this._fillZeros === true;
        let hFormat = ('' + this._dateFormat);
        this._fillZeros = false;
        this._dateFormat = 'YMD';
        let date = new Date(this.getDate());
        this._fillZeros = hFillZeros;
        this._dateFormat = hFormat;
        return new Intl.DateTimeFormat(this._language, { weekday: "long" }).format(date);
    }
    add() {
    }
}
