<script>
	import { redirect } from '@sveltejs/kit';
	import { Palette } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { fade, slide } from 'svelte/transition';
    import { tailwindColor, getContrastColor } from '$lib';

	let isOpen = $state(false);
	let { value = $bindable() } = $props();

	const presetColorNames = ['red-400', 'orange-400', 'amber-400', 'yellow-400', 'lime-400', 'green-400', 'emerald-400', 'teal-400', 'cyan-400', 'sky-400', 'blue-400', 'indigo-400', 'violet-400', 'purple-400', 'fuchsia-400', 'pink-400', 'rose-400', 'white'];

	let presetColors = [];

	function toggleOpen() {
		isOpen = !isOpen;
	}

	function selectPresetColor(color) {
		value = color;
	}

	onMount(() => {
		for (let i = 0; i < presetColorNames.length; i++) {
			presetColors.push(tailwindColor(presetColorNames[i]));
		}
	});

	$inspect(value);
</script>

<div class="absolute top-0 left-0 p-2">
	<button
		class="group flex h-12 w-12 items-center justify-center rounded-lg border border-slate-600 bg-slate-800 transition-all duration-200 hover:border-slate-500 hover:bg-slate-700"
		onclick={toggleOpen}
	>
		<div class="relative h-6 w-6">
			<Palette class="text-slate-200 transition-transform duration-200 group-hover:scale-110" />
			<div
				class="absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-slate-800 transition-colors"
				style="background-color: {value}"
			></div>
		</div>
	</button>

	{#if isOpen}
		<div
			class="absolute top-16 left-0 w-64 rounded-lg border border-slate-600 bg-slate-800 p-4 shadow-xl"
			transition:fade={{ duration: 150 }}
		>
			<div class="flex flex-col gap-4">
				<div
					class="group relative h-12 w-full overflow-hidden rounded-lg border border-slate-600 transition-all duration-200 hover:border-slate-500"
				>
					<input
						type="color"
						id="color-select"
						class="absolute top-[-50%] left-[-50%] h-[200%] w-[200%] cursor-pointer"
						bind:value
					/>
					<div
						class="pointer-events-none absolute inset-0 flex items-center justify-center text-slate-600 group-hover:text-slate-500"
						style="color: {getContrastColor(value)};background-color: {value}"
					>
						{value.toUpperCase()}
					</div>
				</div>

				<div class="grid grid-cols-6 gap-2">
					{#each presetColors as color}
						<button
                            aria-label={color}
							class="aspect-square rounded-lg border-2 border-transparent shadow-sm transition-all duration-200 hover:scale-110 hover:border-slate-500"
							style="background-color: {color}"
							onclick={() => selectPresetColor(color)}
						></button>
					{/each}
				</div>
			</div>
		</div>
	{/if}
</div>
