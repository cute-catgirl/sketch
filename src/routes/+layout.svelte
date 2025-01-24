<script>
	import '../app.css';
	export const prerender = true;
	let { children } = $props();
</script>

<svelte:head>
	<title>Sketch</title>
</svelte:head>
{@render children()}
