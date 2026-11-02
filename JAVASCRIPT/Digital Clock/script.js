let use24Hour = false;

const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const greetingEl = document.getElementById('greeting');
const toggleBtn = document.getElementById('toggle');

const weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

function pad(n) {
    return n.toString().padStart(2, '0');
}

function greetingFor(hour) {
    if (hour < 5) return 'Still Up? Good Night';
    if (hour < 12) return 'Dood Morning';
    if (hour < 17) return 'Good Afternoon';
    if (hour < 21) return 'Good Evening';
    return 'Good Night';
}

function main() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = pad(now.getMinutes());
    const seconds = now.getSeconds();

    const showColon = seconds % 2 === 0;
    const colonClass = showColon ? 'colon' : 'colon dim';

    let meridiem = '';

    if (!use24Hour) {
        meridiem = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        if (hours === 0) {
            hours = 12;
        }
    }

    timeEl.innerHTML = `
    ${pad(hours)}
    <span class="${colonClass}">:</span>
    ${minutes} <span class="${colonClass}">:</span>
    ${pad(seconds)}
    ${meridiem ? `<span class='meridiem'>${meridiem}</span>` : ''}`;

    dateEl.textContent = `${weekdays[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;

    greetingEl.textContent = greetingFor(now.getHours());
}

toggleBtn.addEventListener('click', function () {
    use24Hour = !use24Hour;
    toggleBtn.textContent = use24Hour ? 'Switch to 12H' : 'Switch to 24H';

    main();
});

main();

setInterval(main, 1000);
