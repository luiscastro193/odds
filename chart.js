"use strict";
const chartElement = document.getElementById('chart');

function waitForGlobal(name) {
	return new Promise(resolve => {
		if (window[name])
			return resolve();
		
		document.head.querySelector(`[data-id=${name}]`).addEventListener('load', () => resolve());
	});
}

let config;

let vegaLoaded = (async () => {
	await waitForGlobal("vl");
	vl.register(vega, vegaLite, {view: {renderer: "svg"}});
	config = vegaThemes.dark;
	config.legend = {disable: true};
	config.background = "#000"
})();

let lastDraw = 0;

async function drawProbs(pos, neg) {
	let drawId = ++lastDraw;
	chartElement.innerHTML = '';
	
	let data = [
		{type: "+", value: pos},
		{type: "-", value: neg}
	];
	
	await vegaLoaded;
	let chart = await vl.markArc().data(data).encode(
		vl.theta().fieldQ('value'),
		vl.color().fieldN('type')
	).config(config).render();
	
	if (drawId == lastDraw)
		chartElement.append(chart);
}
