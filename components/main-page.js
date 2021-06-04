import { calendar } from './calendar.js';
import { router } from '../scripts/router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

class MainPage extends HTMLElement {
    constructor() {
        super();

        const template = document.createElement('template');
        template.innerHTML = `
        <style>
        .main-page {
            width: 100%;
            height: 95vh;
            background-color: rgb(202, 235, 204);
        }

        .main-setting {
            margin-top:10px;
            height: 30px;
            width:30px;
            margin-left:30px;
            z-index: 100;
        }

        .page-title {
            margin-top:-18px;
            height: 5vh;
            text-align: center;
            font-size: 1.4rem;
            color: black;
        }
        
        .main-page  .record_view {
            float: left;
            width: 50%;
            height: 100%;
            max-height: 120%;
            overflow:scroll;
            border-top-left-radius: 25px;
        }

        .main-page  .record_view .record_label{
            font-size:16px;
            color:gray;
            margin-left:5px;
        }
        
        .main-page  .right_view {
            align-self: top right;
            width: 50%;
            height: 100%;
            max-height:100%;
            border: 1px;
            border-color: black;
            border-width: 3px;
            float: right;
            border-top-right-radius: 25px;
        }
        
        .right_view .month_container {
            align-self: top center;
            background-color: rgb(157, 201, 160);
            min-height: 50%;
            max-height: 68%;
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
            margin-bottom: 3%;
            margin-left: 0%;
            margin-right: 0%;
            display: flex;
        }
        
        .right_view .month_container .review_label {
            width: 20%;
            text-align: left;
            font-size: 1.0rem;
            margin-left: 3%;
            margin-top: 2%;
            float: left;
            color: rgb(48, 47, 47);
        }
        .right_view .month_container .Week_btn {
            width: 55%;
            text-align: right;
            margin-top: 3%;
            font-size: 0.9rem;
            float: right;
        }
        
        .right_view .month_container .Month_btn {
            text-align: right;
            width: 15%;
            margin-right: 20px;
            margin-top: 3%;
            color: green;
            font-size: 0.9rem;
            float: right;
            margin-right: 10px;
        }
        
        .right_view .month_container .day_label {
            font-weight:100;
            text-align: left;
            margin-left: 3%;
            font-size: 1.1rem;
            width: 100%;
        }
        
        .right_view .month_container .week_view {
            display: flex;
            flex-wrap: wrap;
            flex: 0 0 15.36%;
            margin-top:1%;
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
        
        
        .right_view .month_container .week_body  {
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
            height: 35px;
            width: 35px;
        }
        
        .right_view .month_container .week_body .calender-date--label{
            margin-top: 4px;
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
            height: 43%;
            overflow: scroll;
        }

        .right_view .plan_view .plan_label {
            width: 20%;
            text-align: left;
            font-size: 1.0rem;
            margin-left: 3%;
            margin-top: 2%;
            color: rgb(48, 47, 47);
        }


        .right_view .plan_view .plan_create {
            margin-top: 0%;
            width: 60%;
            margin-top: 2%;
            margin-bottom:20px;
            margin-left:10%;
            position: relative;
            display: inline-block;
            border: 1.5px solid gray;
            border-radius: 15px;
            height:40px;
        }

        .right_view .plan_view .plan_create .plan_create_img {
            margin-top: 5px;
            margin-left:10px;
            width: 30px;
            height:30px;
        }

        .right_view .plan_view .plan_create  .create_label{
            position: absolute;
            z-index: 999;
            margin-left:20px;
            margin-top:10px;
            font-size:16px;
            left: 0;
            right: 0;
            top: 0%; 
            text-align: center;
            width: 60%; 
        }

        </style>
        <img class="main-setting" src="./src/images/setting.png"></img>
        <div class="page-title">ChimPlanzee</div>
        <div class="main-page">
            <div class="record_view"> 
                <p class="record_label">RECORD</p>
            </div>
            <div class="sep"></div>
            <div class="right_view">
                <div class="month_container">
                    <div class="btn" >
                         <div class = "review_label">REVIEW</div>
                        <div class="Week_btn" >WEEK</div>
                        <div class="Month_btn">MONTH</div>
                    </div>
    
                     <div class="day_label" data-calendar-label="month"></div>
                    <div class="week_view"></div>
                    <div class="week_body" data-calendar-area="month"></div>
                </div>
                <div class = "plan_view">
                    <p class="plan_label">PLAN</p>
                    <div class="plan_create">
                        <img class="plan_create_img" src="./src/images/create.png"> </img>
                        <p class="create_label">Create task or goals here</p>
                    </div>
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
    set calender(dates) {
        calendar.init({
            disablePastDays: true,
            details: dates,
            root: this.shadowRoot
        });

        this.shadowRoot.querySelector('.main-setting').addEventListener('click', function () {
            alert("click setting button" );

        })


        this.shadowRoot.querySelector('.plan_create').addEventListener('click', function () {
            setState("createPage");
        })
    
    }
}

customElements.define('main-page', MainPage);
