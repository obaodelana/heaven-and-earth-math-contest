<script lang="ts">
    /**
     * AddTeamForm Component
     *
     * This component provides the input field and button for users to register
     * new teams into the contest.
     */

    // Props: Function to call when a new team is added
    let { onAddTeam }: { onAddTeam: (name: string) => void } = $props();

    let newTeamName = $state("");

    /**
     * Handles the creation of a new team.
     * It validates that the input is not empty before triggering the callback.
     */
    function handleAdd() {
        if (newTeamName.trim()) {
            onAddTeam(newTeamName.trim());
            newTeamName = "";
        }
    }
</script>

<div class="flex flex-col sm:flex-row gap-4">
    <input
        type="text"
        id="team-name-input"
        autocomplete="off"
        placeholder="Enter a team name"
        class="grow bg-slate-700 text-white placeholder-slate-400 border-2 border-slate-600 rounded-lg p-3 focus:ring-2 focus:ring-[#007c41] focus:border-[#007c41] focus:outline-none transition"
        bind:value={newTeamName}
        onkeydown={(e) => {
            if (e.key === "Enter") {
                handleAdd();
            }
        }}
    />
    <button
        id="add-team-btn"
        class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105"
        onclick={handleAdd}
    >
        Add Team
    </button>
</div>
