import {
    POINTS_FIRST_CORRECT,
    POINTS_PER_STREAK,
    MAX_QUESTIONS,
    LOCAL_STORAGE_KEY,
    type Team,
} from "../constants";

/**
 * GameState Class
 * 
 * Manages the core business logic and state for the Heaven & Earth Math Contest.
 * Uses Svelte 5 runes for fine-grained reactivity.
 */
export class GameState {
    // Current list of all teams and their stats
    teams = $state<Team[]>([]);

    // Status message information
    statusMessage = $state("");
    isStatusError = $state(false);

    // Initial team names used for resetting
    private initialTeamNames: string[];

    constructor(initialTeamNames: string[]) {
        this.initialTeamNames = initialTeamNames;
        this.init();
    }

    /**
     * Initializes the game by loading from storage or starting fresh.
     */
    private init() {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);

            // Handle loading and migration from older formats
            let savedTeams: Team[] = [];

            if (Array.isArray(parsed)) {
                // Oldest format: just an array of teams
                savedTeams = parsed;
            } else if (parsed && typeof parsed === 'object') {
                savedTeams = parsed.teams || [];
            }

            // Migration: Ensure all teams have the new array properties if missing
            savedTeams = savedTeams.map(t => ({
                ...t,
                usedEarthQuestions: t.usedEarthQuestions || [],
                usedHeavenQuestions: t.usedHeavenQuestions || []
            }));

            const savedNames = savedTeams
                .map((t: Team) => t.name)
                .sort()
                .join(",");
            const currentNames = this.initialTeamNames.sort().join(",");

            if (savedNames === currentNames) {
                this.teams = savedTeams;
                return;
            }
        }
        this.resetTeams();
    }

    /**
     * Resets all teams to their starting state.
     */
    private resetTeams() {
        this.teams = this.initialTeamNames.map((name) => ({
            name,
            score: 0,
            location: "Earth",
            streak: 0,
            usedEarthQuestions: [],
            usedHeavenQuestions: []
        }));
        this.saveState();
    }

    /**
     * Persists the current state to localStorage.
     */
    private saveState() {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({
            teams: this.teams
        }));
    }

    /**
     * Updates the temporary status message.
     */
    private setStatus(msg: string, isError = false) {
        this.statusMessage = msg;
        this.isStatusError = isError;
        setTimeout(() => {
            this.statusMessage = "";
        }, 3000);
    }

    /**
     * Handles a correct answer submission.
     */
    handleCorrect(teamName: string, questionNumber: number | null) {
        if (!questionNumber || questionNumber < 1 || questionNumber > MAX_QUESTIONS) {
            this.setStatus(`Please enter a question number between 1 and ${MAX_QUESTIONS}.`, true);
            return;
        }

        const team = this.teams.find((t) => t.name === teamName);
        if (!team) return;

        // Determine which used list to check (per team now)
        const usedList = team.location === "Earth" ? team.usedEarthQuestions : team.usedHeavenQuestions;

        if (usedList.includes(questionNumber)) {
            this.setStatus(`${team.name} has already solved ${team.location} Question #${questionNumber}!`, true);
            return;
        }

        if (team.location === "Earth") {
            team.location = "Heaven";
            this.setStatus(`${team.name} solved an Earth problem (#${questionNumber}) and moved to Heaven!`);
            team.usedEarthQuestions.push(questionNumber);
        } else {
            const pointsEarned = POINTS_FIRST_CORRECT + team.streak * POINTS_PER_STREAK;
            team.score += pointsEarned;
            team.streak += 1;
            this.setStatus(`${team.name} earned ${pointsEarned} points on Heaven Question #${questionNumber}! Streak: ${team.streak}`);
            team.usedHeavenQuestions.push(questionNumber);
        }
        this.saveState();
    }

    /**
     * Handles an incorrect answer submission.
     */
    handleIncorrect(teamName: string, questionNumber: number | null) {
        if (!questionNumber || questionNumber < 1 || questionNumber > MAX_QUESTIONS) {
            this.setStatus(`Please enter a question number between 1 and ${MAX_QUESTIONS}.`, true);
            return;
        }

        const team = this.teams.find((t) => t.name === teamName);
        if (!team) return;

        // Determine which used list to check (per team now)
        const usedList = team.location === "Earth" ? team.usedEarthQuestions : team.usedHeavenQuestions;

        if (usedList.includes(questionNumber)) {
            this.setStatus(`${team.name} has already attempted ${team.location} Question #${questionNumber}!`, true);
            return;
        }

        this.setStatus(`${team.name} answered ${team.location} Question #${questionNumber} incorrectly. Sent back to Earth.`, true);

        // Record the used question and update team state
        if (team.location === "Earth") {
            team.usedEarthQuestions.push(questionNumber);
        } else {
            team.usedHeavenQuestions.push(questionNumber);
            team.streak = 0;
            team.location = "Earth";
        }

        // Ensure team is back to Earth (idempotent if already on Earth)
        team.location = "Earth";

        this.saveState();
    }

    /**
     * Triggers a full game reset.
     */
    resetGame() {
        if (confirm("Are you sure you want to reset the entire game?")) {
            this.resetTeams();
            this.setStatus("Game has been reset.");
        }
    }

    /**
     * Clears all progress and returns to the home page.
     */
    exitGame() {
        if (
            confirm(
                "Are you sure you want to exit the game? This will clear all progress and return to the home page.",
            )
        ) {
            localStorage.removeItem(LOCAL_STORAGE_KEY);
            window.location.href = "?";
        }
    }
}
