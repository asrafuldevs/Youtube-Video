const steps = document.querySelectorAll('.step');
const circles = document.querySelectorAll('.circle');
const fill = document.querySelector('.progress-fill');
const backBtn = document.querySelector('.back-btn');
const nextBtn = document.querySelector('.next-btn');

let current = 0;

function showStep() {
    steps.forEach((step, i) => {
        step.classList.toggle('active', i === current);
    });

    circles.forEach((circle, i) => {
        circle.classList.toggle('active', i <= current);
    });

    fill.style.width = (current / (steps.length - 1)) * 100 + '%';

    backBtn.classList.toggle('hide', current === 0);
    nextBtn.textContent = current === steps.length - 1 ? 'Submit' : 'Next';
}


nextBtn.addEventListener('click', () => {
    if (current < steps.length - 1) {
        current++;
        showStep();
    } else {
        document.querySelector('.step.active').classList.remove('active');
        document.querySelector('.buttons').style.display = 'none';
        document.querySelector('.success').classList.add('show');
    }
});

backBtn.addEventListener('click', () => {
    current--;
    showStep();
});
