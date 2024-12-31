"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShkDate = void 0;
var ShkDate = /** @class */ (function () {
    function ShkDate(date, args) {
        var _this = this;
        this._date = { day: undefined, month: undefined, year: undefined, hours: undefined, minutes: undefined, seconds: undefined, ms: undefined };
        this._dateFormat = 'YMD';
        this._timeFormat = 'HMS';
        this._dateSeparator = '-'; //Date value separator. Examples: 01/01/0001 (/). 01.01.0001 (.)
        this._timeSeparator = ':'; //Time value separator. Examples: 15:15:00 (:). 15.15.00 (.) ; If separator set as 'tempo' it will set h to hour, m to minutes and s to seconds. Exemple: 01h02m03s. 
        this._fillZeros = true; //Add zero to values. Example 01/01/0001 or 1/1/1
        this._language = navigator.language;
        this._checkIrregular = true; //Check irregular handling on update such as leap years, this is disabled when there is need to check the date as a whole and not only one part of it while updating the date.
        this._monthsWith31d = [1, 3, 5, 7, 8, 10, 12];
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
                    Object.keys(args).forEach(function (argKey) {
                        if (args[argKey] && _this['_' + argKey] != undefined)
                            _this['_' + argKey] = args[argKey];
                    });
                }
                var dateSpaceSplit = date.split(' ');
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
    ShkDate.prototype.updateJSDate = function () {
        this._jsYear = new Date().getFullYear();
        this._jsMonth = new Date().getMonth();
        this._jsDay = new Date().getDate();
        this._jsHour = new Date().getHours();
        this._jsMinute = new Date().getMinutes();
        this._jsSecond = new Date().getSeconds();
        this._jsMS = new Date().getMilliseconds();
    };
    Object.defineProperty(ShkDate.prototype, "dateFormat", {
        get: function () { return this.getDateFormat(); },
        set: function (dateFormat) { this.setDateFormat(dateFormat); },
        enumerable: false,
        configurable: true
    });
    ;
    ShkDate.prototype.getDateFormat = function () { return this._dateFormat; };
    ;
    ;
    ShkDate.prototype.setDateFormat = function (dateFormat) { this._dateFormat = dateFormat; };
    ;
    Object.defineProperty(ShkDate.prototype, "timeFormat", {
        get: function () { return this.getTimeFormat(); },
        set: function (timeFormat) { this.setTimeFormat(timeFormat); },
        enumerable: false,
        configurable: true
    });
    ;
    ShkDate.prototype.getTimeFormat = function () { return this._timeFormat; };
    ;
    ;
    ShkDate.prototype.setTimeFormat = function (timeFormat) { this._timeFormat = timeFormat; };
    ;
    Object.defineProperty(ShkDate.prototype, "dateSeparator", {
        get: function () { return this.getDateSeparator(); },
        set: function (dateSeparator) { this.setDateSeparator(dateSeparator); },
        enumerable: false,
        configurable: true
    });
    ;
    ShkDate.prototype.getDateSeparator = function () { return this._dateSeparator; };
    ;
    ;
    ShkDate.prototype.setDateSeparator = function (dateSeparator) { this._dateSeparator = dateSeparator; };
    ;
    Object.defineProperty(ShkDate.prototype, "timeSeparator", {
        get: function () { return this.getTimeSeparator(); },
        set: function (timeSeparator) { this.setTimeSeparator(timeSeparator); },
        enumerable: false,
        configurable: true
    });
    ;
    ShkDate.prototype.getTimeSeparator = function () { return this._timeSeparator; };
    ;
    ;
    ShkDate.prototype.setTimeSeparator = function (timeSeparator) { this._timeSeparator = timeSeparator; };
    ;
    Object.defineProperty(ShkDate.prototype, "fillZeros", {
        get: function () { return this.getFillZeros(); },
        set: function (fillZeros) { this.setFillZeros(fillZeros); },
        enumerable: false,
        configurable: true
    });
    ;
    ShkDate.prototype.getFillZeros = function () { return this._fillZeros; };
    ;
    ;
    ShkDate.prototype.setFillZeros = function (fillZeros) { this._fillZeros = fillZeros; };
    ;
    Object.defineProperty(ShkDate.prototype, "language", {
        set: function (language) { this.setLanguage(language); },
        enumerable: false,
        configurable: true
    });
    ;
    ShkDate.prototype.setLanguage = function (language) {
        if (!language)
            return;
        this._language = language;
    };
    ;
    Object.defineProperty(ShkDate.prototype, "year", {
        get: function () { return this.getYear(); },
        set: function (year) { this.setYear(year); },
        enumerable: false,
        configurable: true
    });
    ;
    ShkDate.prototype.getYear = function () { return this._date.year < 10 ? '000' + this._date.year : this._date.year < 100 ? '00' + this._date.year : this._date.year < 1000 ? '0' + this._date.year : this._date.year.toString(); };
    ;
    ;
    ShkDate.prototype.setYear = function (year) {
        var reYear = '^[0-9]{1,4}$';
        if (year.toString().trim() === '')
            year = this._jsYear.toString();
        year = parseInt(year.toString());
        if (new RegExp("^".concat(reYear, "$")).test(year.toString())) {
            if (this._checkIrregular) {
                if (!this._monthsWith31d.includes(this._date.month) && this._date.day > 30)
                    throw ('Invalid Date format. The given month don\'t have more than 30 days.');
                if (this._date.month === 2 && (this._date.day > 28 && year % 4 != 0))
                    throw ("Invalid Date format. The given month don't have more than 28 days. ".concat(this._date.day === 29 ? year + ' is not a leap year.' : ''));
                else if (this._date.month === 2 && (this._date.day > 29))
                    throw ('Invalid Date format. The given month don\'t have more than 29 days.');
            }
            this._date.year = parseInt(year.toString());
        }
        else
            throw ('Invalid Date format. The year don\'t match a year format.');
    };
    ;
    Object.defineProperty(ShkDate.prototype, "month", {
        get: function () { return this.getMonth(); },
        set: function (month) { this.setMonth(month); },
        enumerable: false,
        configurable: true
    });
    ;
    ShkDate.prototype.getMonth = function () { return this._date.month < 10 && this._fillZeros ? '0' + this._date.month : this._date.month.toString(); };
    ;
    ;
    ShkDate.prototype.setMonth = function (month) {
        var reMonth = '^(0?[1-9]|1[0-2])$';
        if (month.toString().trim() === '')
            month = (this._jsMonth + 1).toString();
        month = parseInt(month.toString());
        if (new RegExp("^".concat(reMonth, "$")).test(month.toString())) {
            if (this._checkIrregular) {
                if (!this._monthsWith31d.includes(this._date.month) && this._date.day > 30)
                    throw ('Invalid Date format. The given month don\'t have more than 30 days.');
                if (month === 2 && (this._date.day > 28 && this._date.year % 4 != 0))
                    throw ("Invalid Date format. The given month don't have more than 28 days. ".concat(this._date.day === 29 ? this._date.year + ' is not a leap year.' : ''));
                else if (month === 2 && (this._date.day > 29))
                    throw ('Invalid Date format. The given month don\'t have more than 29 days.');
            }
            this._date.month = parseInt(month.toString());
        }
        else
            throw ('Invalid Date format. The month don\'t match a 1 to 12 month format.');
    };
    ;
    Object.defineProperty(ShkDate.prototype, "day", {
        get: function () { return this.getDay(); },
        set: function (day) { this.setDay(day); },
        enumerable: false,
        configurable: true
    });
    ;
    ShkDate.prototype.getDay = function () { return this._date.day < 10 && this._fillZeros ? '0' + this._date.day : this._date.day.toString(); };
    ;
    ;
    ShkDate.prototype.setDay = function (day) {
        var reDay = '^([12]?[0-9]|0[1-9]|3[01])$';
        if (day.toString().trim() === '')
            day = this._jsDay.toString();
        day = parseInt(day.toString());
        if (new RegExp("^".concat(reDay, "$")).test(day.toString())) {
            if (this._checkIrregular) {
                if (!this._monthsWith31d.includes(this._date.month) && this._date.day > 30)
                    throw ('Invalid Date format. The given month don\'t have more than 30 days.');
                if (this._date.month === 2 && (day > 28 && this._date.year % 4 != 0))
                    throw ("Invalid Date format. The given month don't have more than 28 days. ".concat(day === 29 ? this._date.year + ' is not a leap year.' : ''));
                else if (this._date.month === 2 && (day > 29))
                    throw ('Invalid Date format. The given month don\'t have more than 29 days.');
            }
            this._date.day = parseInt(day.toString());
        }
        else
            throw ('Invalid Date format. The day don\'t match a 1 to 31 days format.');
    };
    ;
    Object.defineProperty(ShkDate.prototype, "hours", {
        get: function () { return this.getHours(); },
        set: function (hours) { this.setHours(hours); },
        enumerable: false,
        configurable: true
    });
    ;
    ShkDate.prototype.getHours = function () { return this._date.hours < 10 && this._fillZeros ? '0' + this._date.hours : this._date.hours.toString(); };
    ;
    ;
    ShkDate.prototype.setHours = function (hours) {
        var reHour = '^([01]?[0-9]|2[0-3])$';
        if (hours.toString().trim() === '') {
            hours = this._jsHour.toString();
        }
        ;
        if (new RegExp("^".concat(reHour, "$")).test(hours.toString())) {
            this._date.hours = parseInt(hours.toString());
        }
        else
            throw ('Invalid Time format. The hour don\'t match a 00 to 23 hours format.');
    };
    ;
    Object.defineProperty(ShkDate.prototype, "minutes", {
        get: function () { return this.getMinutes(); },
        set: function (minutes) { this.setMinutes(minutes); },
        enumerable: false,
        configurable: true
    });
    ;
    ShkDate.prototype.getMinutes = function () { return this._date.minutes < 10 && this._fillZeros ? '0' + this._date.minutes : this._date.minutes.toString(); };
    ;
    ;
    ShkDate.prototype.setMinutes = function (minutes) {
        var reMinute = '^[0-5]?[0-9]$';
        if (minutes.toString().trim() === '') {
            minutes = this._jsMinute.toString();
        }
        ;
        if (new RegExp("^".concat(reMinute, "$")).test(minutes.toString())) {
            this._date.minutes = parseInt(minutes.toString());
        }
        else
            throw ('Invalid Time format. The minutes don\'t match a 0 to 59 minutes format.');
    };
    ;
    Object.defineProperty(ShkDate.prototype, "seconds", {
        get: function () { return this.getSeconds(); },
        set: function (seconds) { this.setSeconds(seconds); },
        enumerable: false,
        configurable: true
    });
    ;
    ShkDate.prototype.getSeconds = function () { return this._date.seconds < 10 && this._fillZeros ? '0' + this._date.seconds : this._date.seconds.toString(); };
    ;
    ShkDate.prototype.setSeconds = function (seconds) {
        var reSecond = '^[0-5]?[0-9]$';
        if (!seconds || seconds.toString().trim() === '') {
            seconds = this._jsSecond.toString();
        }
        ;
        if (new RegExp("^".concat(reSecond, "$")).test(seconds.toString())) {
            this._date.seconds = parseInt(seconds.toString());
        }
        else
            throw ('Invalid Time format. The seconds don\'t match a 0 to 59 seconds format.');
    };
    ;
    Object.defineProperty(ShkDate.prototype, "ms", {
        get: function () { return this.getMs(); },
        set: function (ms) { this.setMs(ms); },
        enumerable: false,
        configurable: true
    });
    ;
    ShkDate.prototype.getMs = function () { return this._date.ms; };
    ;
    ;
    ShkDate.prototype.setMs = function (ms) {
        var reMs = '^[0-9]{3}$';
        if (!ms || ms.toString().trim() === '') {
            ms = this._jsMS.toString();
        }
        ;
        if (new RegExp("^".concat(reMs, "$")).test(ms.toString())) {
            this._date.ms = parseInt(ms.toString());
        }
        else
            throw ('Invalid Time format. The ms don\'t match a 0 to 999 ms format.');
    };
    Object.defineProperty(ShkDate.prototype, "date", {
        get: function () { return this.getDate(); },
        set: function (date) { this.setDate(date); },
        enumerable: false,
        configurable: true
    });
    ;
    ShkDate.prototype.getDate = function () {
        var _this = this;
        var sDate = '';
        var arrDateFormat = Array.from(this._dateFormat);
        arrDateFormat.forEach(function (letter, index) {
            if (letter === 'Y')
                sDate += _this.getYear();
            if (letter === 'M')
                sDate += _this.getMonth();
            if (letter === 'D')
                sDate += _this.getDay();
            if (arrDateFormat.length - 1 != index)
                sDate += _this._dateSeparator;
        });
        return sDate;
    };
    ;
    ;
    ShkDate.prototype.setDate = function (date) {
        //This part validation cannot be set individually like Time because the Date is being validated as a whole,
        //so irregular details like leap years has to be in account with the whole Date and not the parts itself
        // as is done in the individual set's.
        var reDay = '^([12]?[0-9]|0[1-9]|3[01])$';
        var reMonth = '^(0?[1-9]|1[0-2])$';
        var reYear = '^[0-9]{1,4}$';
        var dateDateSplit = date.split(this._dateSeparator);
        this._checkIrregular = false;
        var formatPosYear = this._dateFormat.indexOf('Y');
        var formatPosMonth = this._dateFormat.indexOf('M');
        var formatPosDay = this._dateFormat.indexOf('D');
        if (dateDateSplit.length > 3)
            throw ("Invalid date format. The string separator is wrong. Example: YYYY-MM-DD HH:MM:SS");
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
                if (!this._monthsWith31d.includes(this._date.month) && this._date.day > 30)
                    throw ('Invalid Date format. The given month don\'t have more than 30 days.');
                if (this._date.month === 2 && (this._date.day > 28 && this._date.year % 4 != 0))
                    throw ("Invalid Date format. The given month don't have more than 28 days. ".concat(this._date.day === 29 ? this._date.year + ' is not a leap year.' : ''));
                else if (this._date.month === 2 && (this._date.day > 29))
                    throw ('Invalid Date format. The given month don\'t have more than 29 days.');
        }
    };
    Object.defineProperty(ShkDate.prototype, "time", {
        get: function () { return this.getTime(); },
        set: function (time) { this.setTime(time); },
        enumerable: false,
        configurable: true
    });
    ;
    ShkDate.prototype.getTime = function () {
        var _this = this;
        var sTime = '';
        var arrTimeFormat = Array.from(this._timeFormat);
        arrTimeFormat.forEach(function (letter, index) {
            if (letter === 'H') {
                sTime += _this.getHours();
                if (_this._timeSeparator === 'tempo')
                    sTime += 'h';
            }
            ;
            if (letter === 'M') {
                sTime += _this.getMinutes();
                if (_this.timeSeparator === 'tempo')
                    sTime += 'm';
            }
            ;
            if (letter === 'S') {
                sTime += _this.getSeconds();
                if (_this.timeSeparator === 'tempo')
                    sTime += 's';
            }
            ;
            if (_this._timeSeparator != 'tempo' && arrTimeFormat.length - 1 != index)
                sTime += _this._timeSeparator;
        });
        return sTime;
    };
    ;
    ShkDate.prototype.setTime = function (time) {
        this.updateJSDate();
        this._date.hours = this._jsHour;
        this._date.minutes = this._jsMinute;
        this._date.seconds = this._jsSecond;
        this._date.ms = this._jsMS;
        var dateTimeSplit = time.split(this._timeSeparator);
        if (dateTimeSplit.length > 4)
            throw ('Invalid date format. The string double dotting is wrong. Example: YYYY-MM-DD HH:MM:SS');
        switch (dateTimeSplit.length) {
            case 4: this.setMs(dateTimeSplit[3]);
            case 3: this.setSeconds(dateTimeSplit[2]);
            case 2: this.setMinutes(dateTimeSplit[1]);
            case 1: this.setHours(dateTimeSplit[0]);
        }
    };
    Object.defineProperty(ShkDate.prototype, "dateTime", {
        get: function () { return this.getDateTime(); },
        set: function (dateTime) { this.setDateTime(dateTime); },
        enumerable: false,
        configurable: true
    });
    ;
    ShkDate.prototype.getDateTime = function () {
        return "".concat(this.getDate(), " ").concat(this.getTime());
    };
    ;
    ShkDate.prototype.setDateTime = function (dateTime) {
        var dateSpaceSplit = dateTime.split(' ');
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
    };
    Object.defineProperty(ShkDate.prototype, "extMonth", {
        get: function () { return this.getExtMonth(); },
        enumerable: false,
        configurable: true
    });
    ;
    ShkDate.prototype.getExtMonth = function () {
        var hFillZeros = this._fillZeros === true;
        var hFormat = ('' + this._dateFormat);
        this._fillZeros = false;
        this._dateFormat = 'YMD';
        var date = new Date(this.getDate());
        this._fillZeros = hFillZeros;
        this._dateFormat = hFormat;
        return new Intl.DateTimeFormat(this._language, { month: "long" }).format(date);
    };
    Object.defineProperty(ShkDate.prototype, "weekDay", {
        get: function () { return this.getWeekDay(); },
        enumerable: false,
        configurable: true
    });
    ;
    ShkDate.prototype.getWeekDay = function () {
        var hFillZeros = this._fillZeros === true;
        var hFormat = ('' + this._dateFormat);
        this._fillZeros = false;
        this._dateFormat = 'YMD';
        var date = new Date(this.getDate());
        this._fillZeros = hFillZeros;
        this._dateFormat = hFormat;
        return new Intl.DateTimeFormat(this._language, { weekday: "long" }).format(date);
    };
    return ShkDate;
}());
exports.ShkDate = ShkDate;
