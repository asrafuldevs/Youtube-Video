const celsiusInput = document.getElementById('celsius');
const fahrenheitInput = document.getElementById('fahrenheit');
const kelvinInput = document.getElementById('kelvin');
const feelEl = document.getElementById('feel');
const meterFillEl = document.getElementById('meterFill');
const errorEl = document.getElementById('error');
const clearBtn = document.getElementById('clear');
const chips = document.querySelectorAll('.chip');

// Every field is first converted to Celsius, then to the other two
const toCelsius = {
    celsius: function (v) {
        return v;
    },
    fahrenheit: function (v) {
        return ((v - 32) * 5) / 9;
    },
    kelvin: function (v) {
        return v - 273.15;
    },
};

function format(n) {
    return String(Number(n.toFixed(2)));
}

function updateFeel(c) {
    let name = 'Freezing';
    let cls = 'freezing';

    if (c > 0) {
        name = 'Cold';
        cls = 'cold';
    }
    if (c >= 15) {
        name = 'Mild';
        cls = 'mild';
    }
    if (c >= 25) {
        name = 'Warm';
        cls = 'warm';
    }
    if (c >= 35) {
        name = 'Hot';
        cls = 'hot';
    }

    // meter goes from -40°C (empty) to 120°C (full)
    const percent = Math.min(100, Math.max(4, ((c + 40) / 160) * 100));

    feelEl.textContent = name;
    meterFillEl.className = `meter-fill ${cls}`;
    meterFillEl.style.width = `${percent}%`;
}

function resetFeel() {
    feelEl.textContent = 'Type a temperature';
    meterFillEl.className = 'meter-fill';
    meterFillEl.style.width = '0';
}

function convertFrom(source, value) {
    const c = toCelsius[source](value);

    if (c < -273.15) {
        errorEl.textContent = 'That is below absolute zero (−273.15 °C).';
        resetFeel();
        return;
    }

    errorEl.textContent = '';

    if (source !== 'celsius') celsiusInput.value = format(c);
    if (source !== 'fahrenheit')
        fahrenheitInput.value = format((c * 9) / 5 + 32);
    if (source !== 'kelvin') kelvinInput.value = format(c + 273.15);

    updateFeel(c);
}

function clearAll() {
    celsiusInput.value = '';
    fahrenheitInput.value = '';
    kelvinInput.value = '';
    errorEl.textContent = '';
    resetFeel();
}

[celsiusInput, fahrenheitInput, kelvinInput].forEach(function (input) {
    input.addEventListener('input', function () {
        const value = parseFloat(input.value);

        if (Number.isNaN(value)) {
            clearAll();
            return;
        }

        convertFrom(input.id, value);
    });
});

chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
        const c = Number(chip.dataset.celsius);
        celsiusInput.value = c;
        convertFrom('celsius', c);
    });
});

clearBtn.addEventListener('click', clearAll);
