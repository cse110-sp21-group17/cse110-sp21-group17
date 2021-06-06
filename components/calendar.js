// The MIT License (MIT)

// Copyright (c) 2021 Juan Ding
// Copyright (c) 2017 Chris Collins

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
import { router } from '../scripts/router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

function fmtDate(d) {
    let options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return d.toLocaleString('en', options);
}

export var calendar = {
    month: null,
    label: null,
    activeDates: null,
    date: new Date(),
    todaysDate: new Date(),
    root: null,

    init: function (options) {
        this.options = options
        this.details = options.details
        this.createWeekHeader()
        this.date.setDate(1)
        this.createMonth()
        this.createListeners()
        this.root =  document.querySelector("main-page").shadowRoot
        
    },

    createWeekHeader: function() {
        let week =document.querySelector("main-page").shadowRoot.querySelector(".week_view")
        var weeks = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        for (var i = 0; i < weeks.length; i++) {
            var w = document.createElement('span')
            w.innerHTML = weeks[i]
            week.appendChild(w)
        }
    },
    
    createListeners: function () {
        var _this = this
        let weekButton = document.querySelector("main-page").shadowRoot.querySelector('.Week_btn');
        let monthButton = document.querySelector("main-page").shadowRoot.querySelector('.Month_btn');
        
        weekButton.addEventListener('click', function () {
            console.log("click weekButton");
            _this.clearCalendar()
            var nextMonth = _this.date.getMonth() + 1
            _this.createWeek()

            weekButton.className = "Week_btn cal-selected";
            monthButton.className = "Month_btn";
        })

        monthButton.addEventListener('click', function () {
            console.log("click monthButton");
            _this.clearCalendar()
            var curMonth = _this.date.getMonth()
            _this.createMonth()

            weekButton.className = "Week_btn";
            monthButton.className = "Month_btn cal-selected";
        })
    },
    
    createDay: function (num, day, year, isMonth) {
        var newDay = document.createElement('div')
        var dateEl = document.createElement('div')
        var detailEl = document.createElement('div')

        dateEl.innerHTML = num
        dateEl.classList.add('calender-date--label')
        detailEl.classList.add('calender-date--detail')

        newDay.className = 'calender-date'
        newDay.setAttribute('data-calendar-date', this.date)
        if (isMonth) {
            if (num === 1) {
                if (day === 0) {
                    newDay.style.marginLeft = (6 * 14.15) + '%'
                } else {
                    newDay.style.marginLeft = ((day) * 14.15) + '%'
                }
            }
        } else {
            let num_day = day.getDay();
            if (num_day == 1) {
                if (num_day === 0) {
                    newDay.style.marginLeft = (6 * 14.15) + '%'
                } else {
                    newDay.style.marginLeft = ((num_day) * 14.15) + '%'
                }
            }
        }


        if (this.options.disablePastDays && this.date.getTime() <= this.todaysDate.getTime() - 1) {
            newDay.classList.add('calender-date--disabled')
        } else {
            newDay.classList.add('calender-date--active')
            newDay.setAttribute('data-calendar-status', 'active')
        }
        
        if (this.date.toString() === this.todaysDate.toString()) { // current day
            var circleEl = document.createElement('div')
            circleEl.classList.add('calender-date--today')
            newDay.appendChild(circleEl)

            circleEl.appendChild(dateEl);
            newDay.appendChild(detailEl);
        } else {
            newDay.appendChild(dateEl)
            newDay.appendChild(detailEl);
        }


        let key = fmtDate(this.date);
        if (this.details[key] != undefined) {
            detailEl.innerHTML = this.details[key];
        }
        
        
        document.querySelector("main-page").shadowRoot.querySelector('.week_body').appendChild(newDay)
    },
    
    dateClicked: function () {
        var _this = this
        this.activeDates = document.querySelector("main-page").shadowRoot.querySelectorAll(
            '[data-calendar-status="active"]'
        )

        for (var i = 0; i < this.activeDates.length; i++) {
            this.activeDates[i].addEventListener('click', function (event) {
                console.log("tap one active date " + this.dataset.calendarDate)
                alert("Create new note on " + this.dataset.calendarDate);

                setState("createPage" + this.dataset.calendarDate.toString());

                _this.removeActiveClass()
                this.classList.add('calender-date--selected')
            })
        }
    },
    
    createMonth: function () {
        var currentMonth = this.date.getMonth()
        this.date.setDate(1)

        while (this.date.getMonth() === currentMonth ) {
            this.createDay(
                this.date.getDate(),
                this.date.getDay(),
                this.date.getFullYear(),
                true
            )

            this.date.setDate(this.date.getDate() + 1)
        }
        // while loop trips over and day is at 30/31, bring it back
        this.date.setMonth(this.date.getMonth() - 1)
        
        document.querySelector("main-page").shadowRoot.querySelector('.day_label').innerHTML =
            this.monthsAsString(this.date.getMonth()) + ' ' + this.date.getFullYear()
        this.dateClicked()
    },

    createWeek: function () {
        let curr = new Date()
        for (let i = 1; i <= 7; i++) {
            let first = curr.getDate() - curr.getDay() + i 
            this.date.setDate(first)
            let day = new Date(curr.setDate(first))

            if (day.getMonth() < this.todaysDate.getMonth() ) {
                first += 31;
            } 
            if (first > 31) first -= 31;

            this.createDay(
                first,
                day,
                this.date.getFullYear(),
                false
            )
        }
        // while loop trips over and day is at 30/31, bring it back
        
        document.querySelector("main-page").shadowRoot.querySelector('.day_label').innerHTML =
            this.monthsAsString(this.date.getMonth()) + ' ' + this.date.getFullYear()
        this.dateClicked()
    },

    clearCalendar: function () {
        let month =document.querySelector("main-page").shadowRoot.querySelector(".week_body")

        month.innerHTML = ''
    },

    monthsAsString: function (monthIndex) {
        return [
            'January',
            'Febuary',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ][monthIndex]
    },
    
    removeActiveClass: function () {
        for (var i = 0; i < this.activeDates.length; i++) {
            this.activeDates[i].classList.remove('calender-date--selected')
        }
    }
}
