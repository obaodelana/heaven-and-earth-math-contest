<script lang="ts">
    /**
     * Scoreboard Component
     *
     * This is the main view of the active game. It acts as a "Controller" that:
     * 1. Initializes the game state.
     * 2. Passes data to the sub-components (Header, Leaderboard, Controls).
     * 3. Handles user interactions by calling methods on the game state.
     */
    import { GameState } from "./gameState.svelte";
    import ScoreboardHeader from "./components/ScoreboardHeader.svelte";
    import Leaderboard from "./components/Leaderboard.svelte";
    import ScoringControls from "./components/ScoringControls.svelte";

    let { teamNames }: { teamNames: string[] } = $props();

    // Initialize the game logic and state using our extracted module
    // This keeps the UI component clean and focused on display.
    const game = new GameState(teamNames);

    let selectedTeamName = $state("");
    let questionNumber = $state<number | null>(null);
    let isFullscreen = $state(false);

    // Set the initial selected team
    if (teamNames.length > 0) {
        selectedTeamName = teamNames[0];
    }

    function toggleFullscreen() {
        isFullscreen = !isFullscreen;
    }

    // sort teams for the leaderboard
    // We use a derived value here so it updates automatically when scores change.
    let sortedTeams = $derived(
        [...game.teams].sort((a, b) => b.score - a.score),
    );
</script>

<main class="bg-slate-900 text-white min-h-screen p-4 sm:p-6 md:p-8">
    <div id="app-container" class="max-w-7xl mx-auto">
        {#if !isFullscreen}
            <ScoreboardHeader
                onReset={() => game.resetGame()}
                onExit={() => game.exitGame()}
                onToggleFullscreen={toggleFullscreen}
            />
        {/if}

        <Leaderboard
            teams={sortedTeams}
            {isFullscreen}
            onToggleFullscreen={toggleFullscreen}
        />

        {#if !isFullscreen}
            <ScoringControls
                {teamNames}
                bind:selectedTeamName
                bind:questionNumber
                statusMessage={game.statusMessage}
                isStatusError={game.isStatusError}
                onCorrect={() => {
                    game.handleCorrect(selectedTeamName, questionNumber);
                    if (
                        questionNumber &&
                        questionNumber >= 1 &&
                        questionNumber <= 25
                    ) {
                        questionNumber = null;
                    }
                }}
                onIncorrect={() => {
                    game.handleIncorrect(selectedTeamName, questionNumber);
                    questionNumber = null;
                }}
            />
        {/if}
    </div>
</main>
