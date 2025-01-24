<script>
	import { onMount } from 'svelte';
	import { getStroke } from 'perfect-freehand';
	import { getSvgPathFromStroke } from './utils';

	let { color, brush } = $props();

	let brushOptions = $derived(brush.options);

	let pathIndex = 0;
	let inputPaths = $state([]);
	let strokes = $derived.by(() => {
		let strokeList = [];
		for (let i = 0; i < inputPaths.length; i++) {
			// Use the stored pen options for each path
			strokeList.push(getStroke(inputPaths[i].points, inputPaths[i].brushOptions));
		}
		return strokeList;
	});

	let outputPaths = $derived.by(() => {
		let pathList = [];
		// Use strokes[i] to get the actual stroke
		for (let i = 0; i < strokes.length; i++) {
			pathList.push(getSvgPathFromStroke(strokes[i]));
		}
		return pathList;
	});

	let isMouseDown = $state(false);

	function mouseMove(event) {
		if (isMouseDown) {
			const mouseX = event.offsetX;
			const mouseY = event.offsetY;
			// Add points to the points array within the object
			inputPaths[pathIndex].points.push([mouseX, mouseY]);
		}
	}

	function mouseDown(event) {
		pathIndex = inputPaths.length;
		// Store both the empty points array and the current pen options
		inputPaths[pathIndex] = {
			points: [],
			color: color,
			brushOptions: { ...brushOptions } // Create a copy of the current pen options
		};
		isMouseDown = true;
	}

	function mouseUp(event) {
		isMouseDown = false;
	}
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<svg
	role="application"
	class="bg-slate-900 h-screen w-screen"
	onmousemove={mouseMove}
	onmousedown={mouseDown}
	onmouseup={mouseUp}
>
	{#each outputPaths as outputPath, i}
		<path d={outputPath} fill={inputPaths[i].color}/>
	{/each}
</svg>
