// Which of the 9 grid cells (0-8) show a dot for each face
const patterns = {
    1: [4],
    2: [0, 8],
    3: [0, 4, 8],
    4: [0, 2, 6, 8],
    5: [0, 2, 4, 6, 8],
    6: [0, 2, 3, 5, 6, 8],
};

const totalEl = document.getElementById('total');
const diceEl = document.getElementById('dice');
const rollBtn = document.getElementById('roll');
const clearBtn = document.getElementById('clear');
const historyEl = document.getElementById('history');
const chips = document.querySelectorAll('.chip');

let diceCount = 1;
let history = [];
let rolling = false;
let faces = [1];

function rollOne() {
    return Math.floor(Math.random() * 6) + 1;
}

function dieHtml(value) {
    let pips = '';

    for (let i = 0; i < 9; i++) {
        const on = patterns[value].includes(i) ? ' on' : '';
        pips += `<span class="pip${on}"></span>`;
    }

    return `<div class="die">${pips}</div>`;
}

function renderDice(extraClass) {
    diceEl.innerHTML = faces.map(dieHtml).join('');

    if (extraClass) {
        diceEl.querySelectorAll('.die').forEach(function (die) {
            die.classList.add(extraClass);
        });
    }
}

function renderHistory() {
    if (history.length === 0) {
        historyEl.innerHTML = '<span class="empty">No rolls yet</span>';
        return;
    }

    historyEl.innerHTML = history
        .map(function (text, i) {
            const cls = i === 0 ? 'history-item latest' : 'history-item';
            return `<span class="${cls}">${text}</span>`;
        })
        .join('');
}

function finish() {
    const total = faces.reduce(function (sum, n) {
        return sum + n;
    }, 0);

    totalEl.textContent = total;
    renderDice();

    const text = faces.length > 1 ? `${faces.join(' + ')} = ${total}` : total;
    history.unshift(text);
    if (history.length > 8) history.pop();
    renderHistory();

    rolling = false;
    rollBtn.disabled = false;
}

function roll() {
    if (rolling) return;

    rolling = true;
    rollBtn.disabled = true;

    const finalFaces = [];
    for (let i = 0; i < diceCount; i++) {
        finalFaces.push(rollOne());
    }

    const reduceMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    ).matches;

    if (reduceMotion) {
        faces = finalFaces;
        finish();
        return;
    }

    // shuffle faces while the dice shake, then show the real result
    const timer = setInterval(function () {
        faces = faces.map(rollOne);
        renderDice('rolling');
    }, 90);

    setTimeout(function () {
        clearInterval(timer);
        faces = finalFaces;
        finish();
    }, 540);
}

function setDiceCount(count) {
    if (rolling) return;

    diceCount = count;
    faces = [];
    for (let i = 0; i < count; i++) {
        faces.push(1);
    }

    totalEl.textContent = '–';
    renderDice();
}

rollBtn.addEventListener('click', roll);

clearBtn.addEventListener('click', function () {
    history = [];
    renderHistory();
});

chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
        chips.forEach(function (c) {
            c.classList.remove('active');
        });
        chip.classList.add('active');

        setDiceCount(Number(chip.dataset.count));
    });
});

// Space bar rolls the dice
document.addEventListener('keydown', function (e) {
    if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        roll();
    }
});

renderDice();
