import { calendar } from './calendar.js';
import { router } from '../scripts/router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

class MainPage extends HTMLElement {
    constructor() {
        super();

        const template = document.createElement('template');
        template.innerHTML = `
        <style>
        
        *{
            user-select:none;
        }

        .main-page {
            width: 100%;
            height: 95vh;
        }

        .main-setting {
            margin-top:10px;
            height: 30px;
            width:30px;
            margin-left:30px;
            z-index: 100;
        }

        .page-title {
            user-select: none;
            text-align: center;
            font-size: 1.4rem;
            color: #F7FFF6;
            margin-bottom: 12px;
        }
        
        .main-page .record_view {
            background-color: rgb(157, 201, 160);
            float: left;
            width: 50%;
            height: 100%;
            max-height: 100%;
            overflow-y: scroll;
        }

        .sec-label {
            padding-left: 1rem;
            font-size: 0.85rem;
            font-family: 'Noto Sans', sans-serif;
            color: #888;
        }
        
        .main-page .right_view {
            align-self: top right;
            width: 50%;
            height: 100%;
            border: 1px;
            border-color: black;
            border-width: 3px;
            float: right;
            border-top-right-radius: 25px;
        }
        
        .right_view .month_container {
            align-self: top center;
            background-color: rgb(157, 201, 160);
            min-height: 60%;
            max-width: 52rem;
            min-width: 30rem;
            text-align: center;
            margin-top: 0%;
        }
        
        .right_view .sep {
            margin-top: 0%;
            width: 100%;
            background-color: gray;
            height: 2px;
            z-index:100;
        }
        
        .right_view .month_container .btn {
            width: 100%;
            font-size: 1.2rem;
            margin-top: 0%;
            display: flex;
            justify-content:space-between;
        }

        .right_view .month_container .btn .btns {
            display: flex;
            justify-content:space-around;
            margin-top: 2%;
            padding-right: 6%;
        }
        
        .right_view .month_container .review_label {
            align-self:auto;
            width: 20%;
            text-align: left;
            font-size: 1.0rem;
            margin-left: 3%;
            margin-top: 2%; 
            float: left;
            color: rgb(48, 47, 47);
        }

        .right_view .month_container .Week_btn {
            align-self:auto;
            width: 55%;
            text-align: right;
            padding-right: 10px;
            float: right;
            user-select:none;
            cursor: pointer;

            font-size: 0.85rem;
            font-family: 'Noto Sans', sans-serif;
            color: #888;
        }
        
        .right_view .month_container .Month_btn {
            align-self: auto;
            text-align: right;
            width: 15%;
            margin-right: 1rem;
            color: #888;
            float: right;
            margin-right: 10px;
            user-select:none;
            cursor: pointer;

            font-size: 0.85rem;
            font-family: 'Noto Sans', sans-serif;
            color: #888;
        }

        .cal-selected {
            color: green !important;
        }
        
        .right_view .month_container .day_label {
            text-align: left;
            padding-left: 1rem;
            font-size: 1.5rem;
            margin-top: 0;
        }
        
        .right_view .month_container .week_view {
            display: flex;
            flex-wrap: wrap;
            flex: 0 0 15.36%;
        }
        
        .right_view .month_container .week_view span {
            flex-direction: column;
            flex: 0 0 15.36%;
            font-size: 0.8rem;
            font-weight: normal;
            max-width: 9.88%;
            min-width: 6.48%;
            padding: 0.8% 2.08%;
            text-align: center;
            text-transform: uppercase;
        }
        
        
        .right_view .month_container .week_body {
            display: flex;
            flex-wrap: wrap;
            font-size: 0.2rem;
            background-color: rgb(198, 226, 200);
        }
        
        .right_view .month_container .week_body .calender-date {
            align-items: center;
            display: flex;
            flex-direction: column;
            flex: 0 0 14.08%;
            max-width: 15.08%;
            padding: 0.15rem 0;
            min-height: 10.8%;
            text-align: center;
        }
        
        
        .right_view .month_container .week_body .calender-date--today {
            background-color: rgb(231, 169, 133);
            border-radius: 50%;
            margin-top: 0px;
            height: 30px;
            width: 30px;
        }
        
        .right_view .month_container .week_body .calender-date--label{
            margin-top: 3px;
            font-size:  15px;
            margin-bottom: 5px;
        }
        
        .right_view .month_container .week_body .calender-date--detail{
            font-size: 12px;
            width: 70%;
            min-height: 30px;
        }
        
        /* .demo .month_container .week_body .calender-date--active {
          
        } */
        
        .right_view .month_container .week_body .calender-date--disabled {
            border-radius: 0;
        }

        .right_view .plan_view {
            margin-top: 0%;
            width: 100%;
            background-color: antiquewhite;
            height: 40%;
            overflow-y: scroll;
        }

        .right_view .plan_view .plan_label {
            width: 20%;
            text-align: left;
            font-size: 1.0rem;
            margin-left: 3%;
            margin-top: 2%;
            color: rgb(48, 47, 47);
            user-select:none;
        }

        .right_view .plan_view .plan_create {
            cursor: pointer;
            margin-left: 1rem;
            margin-right: 1rem;
            padding-left: 0.75rem;
            padding-right: 0.75rem;
            border: 1px solid gray; 
            border-style: dashed;
            border-radius: 0.5rem;
            line-height: 3;
            margin-top: 0;
            width: 90%;
        }

        .right_view .plan_view .plan_create:hover {
            border-style: solid;
        }

        </style>
        <div class="page-title">Chimplanzee</div>
        <div class="main-page">
            <div class="record_view"> 
                <p class="sec-label">RECORD</p>
            </div>
            <div class="sep"></div>
            <div class="right_view">
                <div class="month_container">
                    <div class="btn" >
                         <p class="sec-label">REVIEW</p>
                         <div class="btns">
                            <div class="Week_btn">WEEK</div>
                            <div class="Month_btn cal-selected">MONTH</div>
                         </div>
                    </div>
    
                    <div class="day_label" data-calendar-label="month"></div>
                    <div class="week_view"></div>
                    <div class="week_body" data-calendar-area="month"></div>
                </div>
                <div class="plan_view">
                    <p class="sec-label">PLAN</p>
                    <div class="plan_view_content"></div>
                    <p class="plan_create">+ Create task or goals here</p>
                </div>
            </div>
        </div>
        `;
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(template.content.cloneNode(true))

    }

    get page() {

    }

    set page(entry) { // page object includes users nodes, goals, tasks to fill the view
        this.shadowRoot.querySelector('.entry-title').innerText = entry.title;
        this.shadowRoot.querySelector('.entry-date').innerText = entry.date;
        this.shadowRoot.querySelector('.entry-content').innerText = entry.content;
        if (entry.image) {
            let entryImage = document.createElement('img');
            entryImage.classList.add('entry-image');
            entryImage.src = entry.image.src;
            entryImage.alt = entry.image.alt;
            this.shadowRoot.querySelector('.entry').appendChild(entryImage);
        }
    }


    // Just like the entry-page  Update the days's tasks ----- on router.js file's  "gotoPage" function state "mainPage"
    set calender(cal) {
        calendar.init({
            disablePastDays: true,
            details: cal,
            root: this.shadowRoot
        });

        this.shadowRoot.querySelector('.plan_create').addEventListener('click', function () {
            setState({ state: 'create' });
        })
        
    }
}

customElements.define('main-page', MainPage);
