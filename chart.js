"use strict";
const chartElement = document.getElementById('chart');
let config;

let vegaLoaded = new Promise(resolve => {
	document.head.querySelector("[data-id=vl]").onload = () => {
		vl.register(vega, vegaLite, {view: {renderer: "svg"}});
		config = vegaThemes.dark;
		config.legend = {disable: true};
		config.background = "#000";
		resolve();
	};
});

let lastDraw = 0;

async function drawProbs(pos, neg) {
	const drawId = lastDraw = (lastDraw + 1) % Number.MAX_SAFE_INTEGER;
	chartElement.innerHTML = '';
	
	let data = [
		{type: "+", value: pos},
		{type: "-", value: neg}
	];
	
	await vegaLoaded;
	
	if (drawId != lastDraw)
		return;
	
	let chart = await vl.markArc().data(data).encode(
		vl.theta().fieldQ('value'),
		vl.color().fieldN('type')
	).config(config).render();
	
	if (drawId == lastDraw)
		chartElement.append(chart);
}
