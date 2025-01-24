<script>
	import { Brush, BrushIcon, Circle, CircleDashed } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { fade, slide } from 'svelte/transition';
	import { brushes } from './brushes';

	let isOpen = $state(false);
	let { value = $bindable() } = $props();

	let Icon = $derived(value.icon);

	$inspect(value);

	function toggleOpen() {
		isOpen = !isOpen;
	}
</script>

<div class="absolute top-2 left-16">
	<button
		class="group flex h-12 w-12 items-center justify-center rounded-lg border border-slate-600 bg-slate-800 transition-all duration-200 hover:border-slate-500 hover:bg-slate-700"
		onclick={toggleOpen}
	>
		<div class="relative h-6 w-6">
			<Icon class="text-slate-200 transition-transform duration-200 group-hover:scale-110" />
		</div>
	</button>

	{#if isOpen}
		<div
			class="relative top-2 left-0 w-64 rounded-lg border border-slate-600 bg-slate-800 p-4 shadow-xl"
			transition:fade={{ duration: 150 }}
		>
			<div class="flex flex-col gap-4">
				<div class="grid grid-cols-3 gap-2">
					{#each Object.entries(brushes) as [key, brush]}
						<button
							aria-label={brush.name}
							class="flex aspect-square items-center justify-center rounded-lg border-2 border-transparent bg-slate-900 shadow-sm transition-all duration-200 hover:scale-110 hover:border-slate-500"
							onclick={() => {
								console.log(brush)
								value = brush
							}}
							><brush.icon
								class="text-slate-200 transition-transform duration-200 group-hover:scale-110"
							/>
						</button>
					{/each}
				</div>
			</div>
		</div>
	{/if}
</div>
