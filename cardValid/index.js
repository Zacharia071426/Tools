document.querySelector('.search-button').addEventListener('click', function() {
    let cardNumber = document.getElementById('card-input').value.trim();
    const resultBox = document.querySelector('.result-box');

    resultBox.innerHTML = '';  // Clear previous results

    // Remove spaces from the input for validation
    cardNumber = cardNumber.replace(/\s+/g, '');

    if (!cardNumber) {
        resultBox.textContent = 'Please enter a card number';
        return;
    }

    const cardType = getCardType(cardNumber);
    const isValid = validateCardNumber(cardNumber);
    const statusText = isValid ? 'Valid' : 'Invalid';

    const cardTypeElement = document.createElement('div');
    cardTypeElement.classList.add('card-type');
    cardTypeElement.textContent = cardType;

    const cardNumberElement = document.createElement('div');
    cardNumberElement.classList.add('card-number');
    cardNumberElement.textContent = formatCardNumber(cardNumber);

    const cardStatusElement = document.createElement('div');
    cardStatusElement.classList.add('card-status');
    cardStatusElement.textContent = `Status: ${statusText}`;

    resultBox.appendChild(cardTypeElement);
    resultBox.appendChild(cardNumberElement);
    resultBox.appendChild(cardStatusElement);
});

function getCardType(cardNumber) {
    if (/^4/.test(cardNumber)) return 'Visa';
    if (/^5[1-5]/.test(cardNumber)) return 'MasterCard';
    if (/^6[0-9]/.test(cardNumber)) return 'RuPay';
    return 'Unknown';
}

function formatCardNumber(cardNumber) {
    return cardNumber.replace(/(\d{4})(?=\d)/g, '$1 ');
}

function validateCardNumber(cardNumber) {
    let sum = 0;
    let shouldDouble = false;

    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber[i], 10);

        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }

        sum += digit;
        shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
}
