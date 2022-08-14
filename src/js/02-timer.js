import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let timerId = null;
let deltaTime = 0;
let selectedDatesRef = null;
let convertTime = {};

const refs = {
    startBtn: document.querySelector('button[data-start]'),
    inputData: document.querySelector('input[type="text"]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
};

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);
        if (selectedDates[0] > options.defaultDate) {
            enableBtn(refs.startBtn);
            selectedDatesRef = selectedDates[0];
        } else {
            Notify.failure('Please choose a date in the future',
                {
                    timeout: 3500,
                    clickToClose: true,
                    cssAnimationDuration: 400,
                    cssAnimationStyle: 'from-right',
                })
        };

    },
};

flatpickr(refs.inputData, options)

disableBtn(refs.startBtn);

refs.startBtn.addEventListener('click', onClickStartBtn);

function onClickStartBtn(e) {
    refs.inputData.disabled = true;
    e.target.disabled = true;
    let realTime = new Date();
    if (selectedDatesRef < realTime) {
        Notify.warning('The real time is already greater than the set time',
            {
                timeout: 5500,
                clickToClose: true,
                cssAnimationDuration: 400,
                cssAnimationStyle: 'from-right',
            })
    }
    timerStart();
    timerId = setInterval(timerStart, 1000);

}

function timerStart() {
    let realTime = new Date();

    if (selectedDatesRef < realTime) {
        clearInterval(timerId)
    } else {
        deltaTime = selectedDatesRef - realTime;
    }

    convertMs(deltaTime);
    render();
}

function disableBtn(btnRef) {
    btnRef.disabled = true
}

function enableBtn(btnRef) {
    btnRef.disabled = false
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = String(Math.floor(ms / day)).padStart(2, "0");
    // Remaining hours
    const hours = String(Math.floor((ms % day) / hour)).padStart(2, "0");
    // Remaining minutes
    const minutes = String(Math.floor(((ms % day) % hour) / minute)).padStart(2, "0");
    // Remaining seconds
    const seconds = String(Math.floor((((ms % day) % hour) % minute) / second)).padStart(2, "0");

    convertTime = {
        days
        // : formatDays
        ,
        hours,
        minutes,
        seconds,
    };

    return convertTime;
}

function render() {
    refs.days.textContent = convertTime.days;
    refs.hours.textContent = convertTime.hours;
    refs.minutes.textContent = convertTime.minutes;
    refs.seconds.textContent = convertTime.seconds;
}