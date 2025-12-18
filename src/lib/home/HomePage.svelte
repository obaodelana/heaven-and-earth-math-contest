<script lang="ts">
	import TeamNames from './components/TeamNames.svelte'

	let { setTeamsCallback }: { setTeamsCallback: (teamNames: string[]) => void } = $props();

	let teams: string[] = $state([]);
	let newTeamName = $state("");

	function addTeam() {
		if (newTeamName) {
			if (!teams.includes(newTeamName)) {
				teams.push(newTeamName);
			}
			newTeamName = "";
		}
	}
</script>

<main class="bg-slate-900 text-white min-h-screen flex items-center justify-center p-4">
    <!-- Main container for the setup form -->
    <div class="w-full max-w-2xl bg-slate-800 rounded-2xl shadow-2xl p-8 space-y-8">
        
        <!-- Header Section -->
        <div>
            <h1 class="text-4xl font-bold text-center text-cyan-400">Heaven & Earth Challenge</h1>
            <p class="text-center text-slate-400 mt-2">Create your teams to begin the game.</p>
        </div>

        <!-- Team Input Section -->
        <div class="flex flex-col sm:flex-row gap-4">
            <input
				type="text"
				id="team-name-input"
				autocomplete="off"
				placeholder="Enter a team name"
				class="grow bg-slate-700 text-white placeholder-slate-400 border-2 border-slate-600 rounded-lg p-3 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 focus:outline-none transition"
				bind:value={newTeamName}
				onkeydown={(e) => {
					if (e.key === "Enter") {
						addTeam();
					}
				}}
			>
            <button
				id="add-team-btn"
				class="bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105"
				onclick={addTeam}
				
			>
				Add Team
			</button>
        </div>
        
        <!-- Error message display -->
        <p id="error-message" class="text-red-400 text-center h-5"></p>

        <!-- Team List Section -->
        <div>
            <h2 class="text-2xl font-semibold mb-4 text-slate-300">Registered Teams</h2>
            <TeamNames teamNames={teams}/>
        </div>
        
        <!-- Action Button to Start the Game -->
        <div class="pt-4">
            <button
				id="start-game-btn" 
				class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg transition-transform transform hover:scale-105 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:transform-none"
				onclick={() => setTeamsCallback(teams)}
			>
                Start Game
            </button>
        </div>

    </div>
</main>
