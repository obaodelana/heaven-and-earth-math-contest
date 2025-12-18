<script lang="ts">
	let { teamNames }: { teamNames: string[] } = $props();
	
	let teams: Record<string, {
		score: number,
		location: string,
		streak: number 
	}> = $state({});
	// svelte-ignore state_referenced_locally
	for (const teamName of teamNames) {
		teams[teamName] = { score: 0, location: "Earth", streak: 0 };
	}

	let selectedTeamName = $state("");

	function correct() {
		if (selectedTeamName in teams) {
			const team = teams[selectedTeamName];
			if (team.location === "Earth") {
				team.location = "Heaven";
			} else {
				team.score = 3 + team.streak;
				team.streak += 1;
			}
		}
	}
</script>

<main class="bg-slate-900 text-white min-h-screen p-4 sm:p-6 md:p-8">
    
    <!-- Main container that holds the entire application layout -->
    <div id="app-container" class="max-w-7xl mx-auto">
        
        <!-- Header: Title and Fullscreen Button -->
        <header class="flex justify-between items-center mb-6">
            <h1 class="text-3xl sm:text-4xl font-bold text-cyan-400">Live Scoreboard</h1>
            <div class="flex gap-4">
                 <button id="reset-game-btn" class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-transform transform hover:scale-105">Reset Game</button>
                <button id="fullscreen-btn" class="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-lg transition-transform transform hover:scale-105">Fullscreen</button>
            </div>
        </header>

        <!-- Scoreboard Section -->
        <section id="scoreboard" class="bg-slate-800 rounded-2xl shadow-lg p-6 mb-8">
            <div id="scoreboard-body" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{#each Object.entries(teams) as team}
					<div class="bg-slate-700 p-4 rounded-lg text-center">
						<h3 class="text-xl font-bold text-cyan-300">{team[0]}</h3>
						<p class="text-5xl font-bold my-2">{team[1].score}</p>
						<p class="text-sm text-slate-400">Location: {team[1].location} | Streak: {team[1].streak}</p>
					</div>
				{/each}
            </div>
        </section>

        <!-- Scoring Controls Section -->
        <main id="scoring-controls" class="bg-slate-800 rounded-2xl shadow-lg p-6">
            <h2 class="text-2xl font-semibold mb-6 text-center text-slate-300">Update Scores</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                <!-- Team Selection Dropdown -->
                <div class="flex flex-col">
                    <label for="team-select" class="mb-2 font-semibold text-slate-400">1. Select Team</label>
                    <select
						id="team-select"
						class="bg-slate-700 text-white border-2 border-slate-600 rounded-lg p-3 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 focus:outline-none transition"
						bind:value={selectedTeamName}
					>
						{#each teamNames as teamName}
							<option value={teamName}>
								{teamName}
							</option>
						{/each}
                    </select>
                </div>

                <!-- Question Number Input -->
                <div class="flex flex-col">
                    <label for="question-number" class="mb-2 font-semibold text-slate-400">2. Enter Question Number (1-25)</label>
                    <input type="number" id="question-number" min="1" max="25" placeholder="e.g., 17" class="bg-slate-700 text-white placeholder-slate-400 border-2 border-slate-600 rounded-lg p-3 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 focus:outline-none transition">
                </div>

                <!-- Correct / Incorrect Buttons -->
                <div class="flex flex-col">
                    <p class="mb-2 font-semibold text-slate-400 text-center">3. Mark Result</p>
                    <div class="grid grid-cols-2 gap-4">
                        <button
							class="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105"
							onclick={correct}
						>
							Correct
						</button>
                        <button id="incorrect-btn" class="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105">Incorrect</button>
                    </div>
                </div>
            </div>
            <!-- Area for showing status messages (e.g., score updates, errors) -->
            <p id="status-message" class="text-center mt-6 h-6 text-yellow-300"></p>
        </main>
    </div>

</main>