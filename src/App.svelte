<script lang="ts">
	import HomePage from "./lib/home/HomePage.svelte";
	import Scoreboard from "./lib/scoreboard/Scoreboard.svelte";

	let teamNames: string[] = $state([]);
	
	const urlParams = new URLSearchParams(window.location.search);
	const teamsFromUrl = urlParams.get('teams');
	if (teamsFromUrl) {
		teamsFromUrl.split(",").forEach((team) => {
			teamNames.push(team);
		})
	}
</script>

<div>
	{#if teamNames.length === 0}
		<HomePage
			setTeamsCallback={(teams) => {
				teamNames = teams;
				const encodedTeamNames = teamNames.map(encodeURI).join(",");
				window.location.href = `?teams=${encodedTeamNames}`
			}}
		/>
	{:else}
		<Scoreboard teamNames={teamNames}/>
	{/if}
</div>
