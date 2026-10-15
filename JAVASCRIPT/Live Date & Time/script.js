const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const months = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
];

const hourEl = document.getElementById('hour');
const minuteEl = document.getElementById('minute');
const secondEl = document.getElementById('second');
const weekdayEl = document.getElementById('weekday');
const dayEl = document.getElementById('day');
const monthEl = document.getElementById('month');
const yearEl = document.getElementById('year');

function pad(n) {
    return n.toString().padStart(2, '0');
}

function setFlap(el, value) {
    if (el.textContent === value) return;

    el.classList.add('flipping');

    setTimeout(function () {
        el.textContent = value;
    }, 150);

    setTimeout(function () {
        el.classList.remove('flipping');
    }, 360);
}

function main() {
    const now = new Date();

    setFlap(hourEl, pad(now.getHours()));
    setFlap(minuteEl, pad(now.getMinutes()));
    setFlap(secondEl, pad(now.getSeconds()));

    setFlap(weekdayEl, weekdays[now.getDay()]);
    setFlap(dayEl, pad(now.getDate()));
    setFlap(monthEl, months[now.getMonth()]);
    setFlap(yearEl, now.getFullYear().toString());
}

main();

setInterval(main, 1000);
