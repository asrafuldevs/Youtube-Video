const otp = document.getElementById('otp');
const inputs = otp.querySelectorAll('input');
const verifyBtn = document.getElementById('verify');

inputs.forEach((input, i) => {
    input.addEventListener('input', () => {
        input.value = input.value.replace(/[^0-9]/g, '');
        if (input.value && i < inputs.length - 1) {
            inputs[i + 1].focus();
        }
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !input.value && i > 0) {
            inputs[i - 1].focus();
        }
    });

    input.addEventListener('paste', (e) => {
        e.preventDefault();
        const code = e.clipboardData
            .getData('text')
            .replace(/[^0-9]/g, '')
            .slice(0, inputs.length);
        code.split('').forEach((digit, index) => {
            inputs[index].value = digit;
        });
        inputs[Math.min(code.length, inputs.length - 1)].focus();
    });
});

verifyBtn.addEventListener('click', () => {
    const code = Array.from(inputs)
        .map((input) => input.value)
        .join('');

    if (code.length < inputs.length) {
        otp.classList.add('shake');
        setTimeout(() => otp.classList.remove('shake'), 400);
    } else {
        verifyBtn.textContent = 'Verified ✓';
        verifyBtn.classList.add('done');
    }
});

inputs[0].focus();
