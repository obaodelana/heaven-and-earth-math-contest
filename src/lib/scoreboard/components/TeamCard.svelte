<script lang="ts">
    /**
     * TeamCard Component
     *
     * Renders the individual card for a team on the scoreboard.
     * Visualizes their current score, location (with color coding), and streak.
     */
    import type { Team } from "../../constants";

    let { team }: { team: Team } = $props();
</script>

<div
    class="p-4 rounded-lg text-center transition-all duration-300 transform hover:scale-105 shadow-lg {team.location ===
    'Heaven'
        ? 'bg-[#004d2a]'
        : 'bg-slate-700'}"
>
    <h3
        class="text-xl font-bold truncate {team.location === 'Heaven'
            ? 'text-[#269b61]'
            : 'text-yellow-300'}"
    >
        {team.name}
    </h3>
    <p class="text-5xl font-bold my-2">{team.score}</p>
    <p class="text-sm text-slate-400">
        Location: {team.location} | Streak: {team.streak}
    </p>
</div>
