"use strict";
const posOdds = document.getElementById('pos-odds');
const negOdds = document.getElementById('neg-odds');
const posProb = document.getElementById('pos-prob');
const negProb = document.getElementById('neg-prob');
const commission = document.getElementById('commission');

function selectInput(input) {
	setTimeout(function() {
		try {
			input.setSelectionRange(0, input.value.length);
		}
		catch(e) {
			input.select();
		}
	}, 0);
}

function update() {
	let odds = [parseFloat(posOdds.value), parseFloat(negOdds.value)];
	let sum = odds[0] + odds[1];
	posProb.textContent = (odds[1] / sum * 100).toFixed();
	negProb.textContent = (odds[0] / sum * 100).toFixed();
	commission.textContent = ((odds[0] * odds[1] / sum - 1) * -100).toFixed();
	
	localStorage.posOdds = posOdds.value;
	localStorage.negOdds = negOdds.value;
}

for (let input of [posOdds, negOdds]) {
	input.addEventListener('mouseenter', () => input.focus());
	input.addEventListener('focus', () => selectInput(input));
	input.addEventListener('input', update);
}

document.addEventListener('keydown', function(event) {
	if (event.key == 'Enter') {
		if (document.activeElement && document.activeElement.nodeName.toLowerCase() == 'input')
			document.activeElement.blur();
		else
			posOdds.focus();
	}
});

if (localStorage.posOdds)
	posOdds.value = localStorage.posOdds;
if (localStorage.negOdds)
	negOdds.value = localStorage.negOdds;

update();
