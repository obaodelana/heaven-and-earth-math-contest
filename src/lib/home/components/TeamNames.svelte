<script lang="ts">
	/**
	 * TeamNames Component
	 *
	 * This component displays the list of all registered teams.
	 * It allows users to edit or delete individual teams.
	 */
	let {
		teamNames,
		onDelete,
		onEdit,
	}: {
		teamNames: string[];
		// Callback function to remove a team
		onDelete: (index: number) => void;
		// Callback function to edit a team's name
		onEdit: (index: number) => void;
	} = $props();
</script>

<ul id="team-list" class="space-y-3">
	{#if teamNames.length === 0}
		<li class="text-slate-500 text-center p-4">No teams added yet.</li>
	{:else}
		{#each teamNames as team, index}
			<li
				class="flex justify-between items-center bg-slate-700 p-3 rounded-lg"
			>
				<span class="font-semibold">{team}</span>
				<div class="space-x-2">
					<button
						class="text-yellow-400 hover:text-yellow-300 font-semibold transition"
						onclick={() => onEdit(index)}
					>
						Edit
					</button>
					<button
						class="text-red-400 hover:text-red-300 font-semibold transition"
						onclick={() => onDelete(index)}
					>
						Delete
					</button>
				</div>
			</li>
		{/each}
	{/if}
</ul>
