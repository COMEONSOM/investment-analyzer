// 📌 Show Lump Sum Form
function showLumpSumForm() {
    toggleForms("lumpSumForm");
}

// 📌 Show SIP Form
function showSipForm() {
    toggleForms("sipForm");
}

// 📌 Toggle Forms (helper function)
function toggleForms(activeFormId) {
    const forms = ["lumpSumForm", "sipForm"];
    forms.forEach(formId => {
        const form = document.getElementById(formId);
        if (formId === activeFormId) {
            form.classList.add("active");
            form.setAttribute("aria-hidden", "false");
        } else {
            form.classList.remove("active");
            form.setAttribute("aria-hidden", "true");
        }
    });
    clearResult();
}

// 📌 Calculate Lump Sum Maturity
function calculateLumpSum() {
    const amount = parseFloat(document.getElementById("lumpSumAmount").value);
    const years = parseFloat(document.getElementById("lumpSumYears").value);
    const annualRate = parseFloat(document.getElementById("lumpSumInterestRate").value);

    if (isNaN(amount) || isNaN(years) || isNaN(annualRate)) {
        showResult("Please fill in all fields with valid numbers.");
        return;
    }

    const futureValue = amount * Math.pow(1 + (annualRate / 100), years);

    const formattedValue = formatNumber(futureValue);
    const resultText = `Your investment of ₹${formatNumber(amount)} will grow to ₹${formattedValue} in ${years} years at ${annualRate}% annual interest.`;
    showResult(resultText);
}

// 📌 Calculate SIP Maturity
function calculateSip() {
    const monthlyAmount = parseFloat(document.getElementById("sipMonthlyAmount").value);
    const years = parseFloat(document.getElementById("sipYears").value);
    const annualRate = parseFloat(document.getElementById("sipInterestRate").value);

    if (isNaN(monthlyAmount) || isNaN(years) || isNaN(annualRate)) {
        showResult("Please fill in all fields with valid numbers.");
        return;
    }

    const months = years * 12;
    const monthlyRate = annualRate / 12 / 100;

    // Correct SIP Future Value Formula
    const futureValue = monthlyAmount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);

    const totalInvestment = monthlyAmount * months;
    const formattedValue = formatNumber(futureValue);
    const formattedInvestment = formatNumber(totalInvestment);

    const resultText = `You invested ₹${formattedInvestment} over ${years} years (₹${formatNumber(monthlyAmount)} per month). It will grow to ₹${formattedValue} at ${annualRate}% annual interest.`;
    showResult(resultText);
}

// 📌 Clear Form Inputs and Result
function clearForm() {
    const inputs = document.querySelectorAll("input");
    inputs.forEach(input => input.value = "");
    clearResult();
}

// 📌 Hide Both Forms
function goBack() {
    toggleForms(""); // Hide all forms
}

// 📌 Show Result in Result Section
function showResult(message) {
    const resultDiv = document.getElementById("resultValue");
    resultDiv.textContent = message;
}

// 📌 Clear Result
function clearResult() {
    const resultDiv = document.getElementById("resultValue");
    resultDiv.textContent = "";
}

// 📌 Format Numbers with Commas (Indian style)
function formatNumber(num) {
    return num.toLocaleString('en-IN', {
        maximumFractionDigits: 2
    });
}
