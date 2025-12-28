<script lang="ts">
    /**
     * Leaderboard Component
     *
     * Displays the grid of TeamCards.
     * Handling the layout and the fullscreen presentation mode.
     */
    import type { Team } from "../../constants";
    import TeamCard from "./TeamCard.svelte";

    let {
        teams,
        isFullscreen,
        onToggleFullscreen,
    }: {
        teams: Team[];
        isFullscreen: boolean;
        onToggleFullscreen: () => void;
    } = $props();
</script>

<section
    id="scoreboard"
    class="bg-slate-800 rounded-2xl shadow-lg p-6 mb-8 {isFullscreen
        ? 'fullscreen-scoreboard'
        : ''}"
>
    {#if isFullscreen}
        <div class="flex justify-between items-center mb-8">
            <h1 class="text-4xl font-bold text-[#007c41]">Live Leaderboard</h1>
            <button
                class="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-lg"
                onclick={onToggleFullscreen}
            >
                Exit Fullscreen
            </button>
        </div>
    {/if}

    <div
        id="scoreboard-body"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
        {#each teams as team}
            <TeamCard {team} />
        {/each}
    </div>
</section>

<style>
    .fullscreen-scoreboard {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 50;
        background: #0f172a; /* bg-slate-900 */
        padding: 2rem;
        overflow-y: auto;
    }
</style>
