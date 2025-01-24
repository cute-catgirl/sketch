<script>
	import '../app.css';
	let { children } = $props();
</script>

<svelte:head>
	<title>Sketch</title>
</svelte:head>
{@render children()}
