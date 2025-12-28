<script lang="ts">
    /**
     * ScoreboardHeader Component
     *
     * The top bar of the scoreboard page.
     * Contains the title and the global action buttons (Reset, Fullscreen).
     */
    let {
        onReset,
        onExit,
        onToggleFullscreen,
    }: {
        onReset: () => void;
        onExit: () => void;
        onToggleFullscreen: () => void;
    } = $props();
</script>

<header class="flex justify-between items-center mb-6">
    <h1 class="text-3xl sm:text-4xl font-bold text-[#007c41]">
        Live Scoreboard
    </h1>
    <div class="flex gap-4">
        <button
            id="exit-game-btn"
            class="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-lg transition-transform transform hover:scale-105"
            onclick={onExit}
        >
            Exit Game
        </button>
        <button
            id="reset-game-btn"
            class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-transform transform hover:scale-105"
            onclick={onReset}
        >
            Reset Game
        </button>
        <button
            id="fullscreen-btn"
            class="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-lg transition-transform transform hover:scale-105"
            onclick={onToggleFullscreen}
        >
            Fullscreen
        </button>
    </div>
</header>
