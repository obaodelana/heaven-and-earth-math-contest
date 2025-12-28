<script lang="ts">
	import HomePage from "./lib/home/HomePage.svelte";
	import Scoreboard from "./lib/scoreboard/Scoreboard.svelte";

	// Application Entry Point
	// This component handles the simple routing between the Home Page (Setup)
	// and the Scoreboard (Game) based on the URL query parameters.

	let teamNames: string[] = $state([]);

	// Check if teams are passed in the URL (e.g., ?teams=Alpha,Beta)
	// If so, populate the teamNames state.
	const urlParams = new URLSearchParams(window.location.search);
	const teamsFromUrl = urlParams.get("teams");
	if (teamsFromUrl) {
		teamsFromUrl.split(",").forEach((team) => {
			teamNames.push(team);
		});
	}
</script>

<div>
	{#if teamNames.length === 0}
		<HomePage
			setTeamsCallback={(teams) => {
				teamNames = teams;
				const encodedTeamNames = teamNames.map(encodeURI).join(",");
				window.location.href = `?teams=${encodedTeamNames}`;
			}}
		/>
	{:else}
		<Scoreboard {teamNames} />
	{/if}
</div>
