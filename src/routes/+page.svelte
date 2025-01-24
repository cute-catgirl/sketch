<script>
    import Canvas from '$lib/Canvas.svelte';
	import ColorOptions from '$lib/ColorOptions.svelte';
    import BrushOptions from '$lib/BrushOptions.svelte';
    import { brushes } from '$lib/brushes';

    let color = $state("#ffffff");
    let brush = $state(brushes["basic"]);

</script>

<div class="fixed inset-0">
    <Canvas {color} {brush}/>
    <ColorOptions bind:value={color}></ColorOptions>
    <BrushOptions bind:value={brush}></BrushOptions>
</div>