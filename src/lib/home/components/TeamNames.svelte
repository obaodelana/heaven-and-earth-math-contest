<script lang="ts">
	let { teamNames }: { teamNames: string[] } = $props();
</script>


<ul id="team-list" class="space-y-3">
	{#each teamNames as team}
		<li class="flex justify-between items-center bg-slate-700 p-3 rounded-lg">
			<span class="font-semibold">{team}</span>
			<div class="space-x-2">
				<button class="text-yellow-400 hover:text-yellow-300">Edit</button>
				<button class="text-red-400 hover:text-red-300">Delete</button>
			</div>
		</li>
	{/each}
</ul>

