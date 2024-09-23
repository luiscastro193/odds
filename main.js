"use strict";
const posOdds = document.getElementById('pos-odds');
const negOdds = document.getElementById('neg-odds');
const aggregate = document.getElementById('aggregate');
const posProb = document.getElementById('pos-prob');
const negProb = document.getElementById('neg-prob');
const commission = document.getElementById('commission');
const posRealOdds = document.getElementById('pos-real-odds');
const negRealOdds = document.getElementById('neg-real-odds');

function update() {
	let odds = [Number(posOdds.value), Number(negOdds.value)];
	let sum = odds[0] + odds[1];
	let probs = [odds[1] / sum * 100, odds[0] / sum * 100];
	posProb.textContent = probs[0].toFixed();
	negProb.textContent = probs[1].toFixed();
	commission.textContent = ((odds[0] * odds[1] / sum - 1) * -100).toFixed();
	posRealOdds.textContent = (sum / odds[1]).toFixed(1);
	negRealOdds.textContent = (sum / odds[0]).toFixed(1);
	
	drawProbs(probs[0], probs[1]);
	localStorage.posOdds = posOdds.value;
	localStorage.negOdds = negOdds.value;
}

for (let input of [posOdds, negOdds]) {
	input.addEventListener('mouseenter', () => input.focus());
	input.addEventListener('focus', () => input.select());
	input.addEventListener('input', update);
}

aggregate.onclick = function() {
	let odds = [Number(posOdds.value), Number(negOdds.value)];
	posOdds.value = odds[0] * odds[1] / (odds[0] + odds[1]);
	negOdds.value = "";
	update();
	negOdds.focus();
}

document.addEventListener('keydown', function(event) {
	if (event.key == 'Enter') {
		let activeElement = document.activeElement?.nodeName.toLowerCase();
		
		if (activeElement == 'input')
			document.activeElement.blur();
		else if (activeElement != 'button')
			setTimeout(() => posOdds.focus());
	}
});

if (localStorage.posOdds)
	posOdds.value = localStorage.posOdds;
if (localStorage.negOdds)
	negOdds.value = localStorage.negOdds;

update();
