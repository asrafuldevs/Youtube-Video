let count = 0;
let step = 1;

const countEl = document.getElementById('count');
const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');
const resetBtn = document.getElementById('reset');
const chips = document.querySelectorAll('.chip');

function render() {
    countEl.textContent = count;
    countEl.classList.toggle('negative', count < 0);

    countEl.classList.remove('bump');
    void countEl.offsetWidth;
    countEl.classList.add('bump');
}

function increase() {
    count += step;
    render();
}

function decrease() {
    count -= step;
    render();
}

function reset() {
    count = 0;
    render();
}

increaseBtn.addEventListener('click', increase);
decreaseBtn.addEventListener('click', decrease);
resetBtn.addEventListener('click', reset);

chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
        step = Number(chip.dataset.step);

        chips.forEach(function (c) {
            c.classList.remove('active');
        });
        chip.classList.add('active');
    });
});
