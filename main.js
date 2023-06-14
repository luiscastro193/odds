"use strict";
const posOdds = document.getElementById('pos-odds');
const negOdds = document.getElementById('neg-odds');
const aggregate = document.getElementById('aggregate');
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
	let odds = [Number(posOdds.value), Number(negOdds.value)];
	let sum = odds[0] + odds[1];
	let probs = [odds[1] / sum * 100, odds[0] / sum * 100];
	posProb.textContent = probs[0].toFixed();
	negProb.textContent = probs[1].toFixed();
	commission.textContent = ((odds[0] * odds[1] / sum - 1) * -100).toFixed();
	
	drawProbs(probs[0], probs[1]);
	localStorage.posOdds = posOdds.value;
	localStorage.negOdds = negOdds.value;
}

for (let input of [posOdds, negOdds]) {
	input.addEventListener('mouseenter', () => input.focus());
	input.addEventListener('focus', () => selectInput(input));
	input.addEventListener('input', update);
}

aggregate.onclick = function() {
	let odds = [Number(posOdds.value), Number(negOdds.value)];
	negOdds.value = odds[0] * odds[1] / (odds[0] + odds[1]);
	posOdds.value = "";
	update();
}

document.addEventListener('keydown', function(event) {
	if (event.key == 'Enter') {
		if (document.activeElement && document.activeElement.nodeName.toLowerCase() == 'input')
			document.activeElement.blur();
		else
			setTimeout(() => posOdds.focus(), 0);
	}
});

if (localStorage.posOdds)
	posOdds.value = localStorage.posOdds;
if (localStorage.negOdds)
	negOdds.value = localStorage.negOdds;

update();
