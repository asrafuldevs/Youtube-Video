const resultEl = document.getElementById('result');
const errorEl = document.getElementById('error');
const minInput = document.getElementById('min');
const maxInput = document.getElementById('max');
const generateBtn = document.getElementById('generate');
const clearBtn = document.getElementById('clear');
const historyEl = document.getElementById('history');

let history = [];
let rolling = false;

function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function showError(message) {
    errorEl.textContent = message;
}

function renderHistory() {
    if (history.length === 0) {
        historyEl.innerHTML = '<span class="empty">No numbers yet</span>';
        return;
    }

    historyEl.innerHTML = history
        .map(function (n, i) {
            const cls = i === 0 ? 'history-item latest' : 'history-item';
            return `<span class="${cls}">${n}</span>`;
        })
        .join('');
}

function finish(value) {
    resultEl.textContent = value;
    resultEl.classList.remove('rolling');
    resultEl.classList.add('done');

    history.unshift(value);
    if (history.length > 8) history.pop();
    renderHistory();

    rolling = false;
    generateBtn.disabled = false;
}

function generate() {
    if (rolling) return;

    const min = parseInt(minInput.value, 10);
    const max = parseInt(maxInput.value, 10);

    if (Number.isNaN(min) || Number.isNaN(max)) {
        showError('Enter both a min and a max number.');
        return;
    }

    if (min > max) {
        showError('Min must be less than or equal to max.');
        return;
    }

    showError('');
    rolling = true;
    generateBtn.disabled = true;
    resultEl.classList.remove('done');

    const finalValue = randomBetween(min, max);
    const reduceMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    ).matches;

    if (reduceMotion) {
        finish(finalValue);
        return;
    }

    // quickly shuffle numbers, then show the real one
    resultEl.classList.add('rolling');
    const timer = setInterval(function () {
        resultEl.textContent = randomBetween(min, max);
    }, 50);

    setTimeout(function () {
        clearInterval(timer);
        finish(finalValue);
    }, 500);
}

generateBtn.addEventListener('click', generate);

clearBtn.addEventListener('click', function () {
    history = [];
    renderHistory();
});

[minInput, maxInput].forEach(function (input) {
    input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') generate();
    });
});
