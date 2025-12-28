<script lang="ts">
    /**
     * ScoringControls Component
     *
     * The control panel at the bottom of the screen.
     * Used by the game master to select a team, input the question number,
     * and record the result (Correct/Incorrect).
     */
    let {
        teamNames,
        selectedTeamName = $bindable(),
        questionNumber = $bindable(),
        statusMessage,
        isStatusError,
        onCorrect,
        onIncorrect,
    }: {
        teamNames: string[];
        selectedTeamName: string;
        questionNumber: number | null;
        statusMessage: string;
        isStatusError: boolean;
        onCorrect: () => void;
        onIncorrect: () => void;
    } = $props();
</script>

<section id="scoring-controls" class="bg-slate-800 rounded-2xl shadow-lg p-6">
    <h2 class="text-2xl font-semibold mb-6 text-center text-slate-300">
        Update Scores
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
        <div class="flex flex-col">
            <label for="team-select" class="mb-2 font-semibold text-slate-400"
                >1. Select Team</label
            >
            <select
                id="team-select"
                class="bg-slate-700 text-white border-2 border-slate-600 rounded-lg p-3 focus:ring-2 focus:ring-[#007c41] focus:border-[#007c41] focus:outline-none transition"
                bind:value={selectedTeamName}
            >
                {#each teamNames as teamName}
                    <option value={teamName}>{teamName}</option>
                {/each}
            </select>
        </div>

        <div class="flex flex-col">
            <label
                for="question-number"
                class="mb-2 font-semibold text-slate-400"
                >2. Question Number (1-25)</label
            >
            <input
                type="number"
                id="question-number"
                min="1"
                max="25"
                placeholder="e.g., 17"
                class="bg-slate-700 text-white placeholder-slate-400 border-2 border-slate-600 rounded-lg p-3 focus:ring-2 focus:ring-[#007c41] focus:border-[#007c41] focus:outline-none transition"
                bind:value={questionNumber}
            />
        </div>

        <div class="flex flex-col">
            <p class="mb-2 font-semibold text-slate-400 text-center">
                3. Mark Result
            </p>
            <div class="grid grid-cols-2 gap-4">
                <button
                    class="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105"
                    onclick={onCorrect}
                >
                    Correct
                </button>
                <button
                    class="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105"
                    onclick={onIncorrect}
                >
                    Incorrect
                </button>
            </div>
        </div>
    </div>
    <p
        id="status-message"
        class="text-center mt-6 h-6 {isStatusError
            ? 'text-red-400'
            : 'text-yellow-300'}"
    >
        {statusMessage}
    </p>
</section>
