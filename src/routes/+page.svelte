<script>
    import Canvas from '$lib/Canvas.svelte';
	import PenOptions from '$lib/PenOptions.svelte';

    let color = $state("#ffffff");
</script>

<div class="fixed inset-0">
    <Canvas {color}/>
    <PenOptions bind:value={color}></PenOptions>
</div>