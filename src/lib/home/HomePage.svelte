<script lang="ts">
	/**
	 * HomePage Component
	 *
	 * This is the landing page of the application. It allows the user to:
	 * 1. Register new teams.
	 * 2. View the list of registered teams.
	 * 3. Edit or delete teams.
	 * 4. Start the game once teams are added.
	 */
	import TeamNames from "./components/TeamNames.svelte";
	import AddTeamForm from "./components/AddTeamForm.svelte";

	let {
		setTeamsCallback,
	}: { setTeamsCallback: (teamNames: string[]) => void } = $props();

	let teams = $state<string[]>([]);
	let errorMessage = $state("");

	/**
	 * Adds a new team to the list.
	 * Includes validation to check for duplicate names.
	 *
	 * @param name - The name of the team to add.
	 */
	function addTeam(name: string) {
		if (teams.includes(name)) {
			errorMessage = "This team name already exists.";
			return;
		}

		teams.push(name);
		errorMessage = "";
	}

	/**
	 * Removes a team from the list by its index.
	 *
	 * @param index - The index of the team in the 'teams' array.
	 */
	function deleteTeam(index: number) {
		teams.splice(index, 1);
	}

	/**
	 * Edits an existing team's name.
	 * Prompts the user for a new name and validates it.
	 *
	 * @param index - The index of the team to edit.
	 */
	function editTeam(index: number) {
		const currentName = teams[index];
		const newName = prompt("Enter the new name for the team:", currentName);

		if (newName && newName.trim()) {
			const trimmedNewName = newName.trim();
			if (
				teams.includes(trimmedNewName) &&
				trimmedNewName !== currentName
			) {
				alert("This team name already exists.");
				return;
			}
			teams[index] = trimmedNewName;
		}
	}
</script>

<main
	class="bg-slate-900 text-white min-h-screen flex items-center justify-center p-4"
>
	<div
		class="w-full max-w-2xl bg-slate-800 rounded-2xl shadow-2xl p-8 space-y-8"
	>
		<div>
			<h1 class="text-4xl font-bold text-center text-[#007c41]">
				Heaven & Earth Challenge
			</h1>
			<p class="text-center text-slate-400 mt-2">
				Create your teams to begin the game.
			</p>
		</div>

		<AddTeamForm onAddTeam={addTeam} />

		<p id="error-message" class="text-red-400 text-center h-5">
			{errorMessage}
		</p>

		<div>
			<h2 class="text-2xl font-semibold mb-4 text-slate-300">
				Registered Teams
			</h2>
			<TeamNames
				teamNames={teams}
				onDelete={deleteTeam}
				onEdit={editTeam}
			/>
		</div>

		<div class="pt-4">
			<button
				id="start-game-btn"
				class="w-full bg-[#007c41] hover:bg-[#006032] text-white font-bold py-4 px-6 rounded-lg transition-transform transform hover:scale-105 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:transform-none"
				disabled={teams.length === 0}
				onclick={() => setTeamsCallback(teams)}
			>
				Start Game
			</button>
		</div>
	</div>
</main>
