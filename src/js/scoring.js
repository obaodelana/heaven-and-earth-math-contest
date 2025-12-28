
// Import game constants from the rules file
import { POINTS_FIRST_CORRECT, POINTS_PER_STREAK, MAX_QUESTIONS, LOCAL_STORAGE_KEY } from './game-rules.js';

// =================================================================================
// INITIALIZATION & DOM ELEMENT SELECTION
// =================================================================================

// Get references to all the interactive HTML elements
const appContainer = document.getElementById('app-container');
const errorContainer = document.getElementById('error-container');
const errorText = document.getElementById('error-text');
const scoreboardBody = document.getElementById('scoreboard-body');
const teamSelect = document.getElementById('team-select');
const questionNumberInput = document.getElementById('question-number');
const correctBtn = document.getElementById('correct-btn');
const incorrectBtn = document.getElementById('incorrect-btn');
const statusMessage = document.getElementById('status-message');
const fullscreenBtn = document.getElementById('fullscreen-btn');
const scoreboard = document.getElementById('scoreboard');
const resetGameBtn = document.getElementById('reset-game-btn');

// Initialize the game state variable
let gameState = [];


// =================================================================================
// STATE MANAGEMENT FUNCTIONS
// =================================================================================

/**
 * Saves the current game state to the browser's localStorage.
 */
function saveState() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(gameState));
}

/**
 * Loads the game state from localStorage.
 * @returns {Array|null} The parsed game state, or null if none exists.
 */
function loadState() {
    const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedState ? JSON.parse(savedState) : null;
}


// =================================================================================
// UI RENDERING FUNCTIONS
// =================================================================================

/**
 * Renders the entire scoreboard based on the current game state.
 * It sorts teams by score in descending order.
 */
function renderScoreboard() {
    // Clear the existing scoreboard
    scoreboardBody.innerHTML = '';

    // Sort teams by score (highest first)
    const sortedTeams = [...gameState].sort((a, b) => b.score - a.score);
    
    // Create and append a card for each team
    sortedTeams.forEach(team => {
        const teamCard = document.createElement('div');
        teamCard.className = `p-4 rounded-lg text-center transition-all duration-300 transform hover:scale-105 shadow-lg ${team.location === 'Heaven' ? 'bg-cyan-800' : 'bg-slate-700'}`;

        const locationColor = team.location === 'Heaven' ? 'text-cyan-300' : 'text-yellow-300';
        
        teamCard.innerHTML = `
            <h3 class="text-xl font-bold ${locationColor} truncate">${team.name}</h3>
            <p class="text-5xl font-bold my-2">${team.score}</p>
            <p class="text-sm text-slate-400">Location: ${team.location} | Streak: ${team.streak}</p>
        `;
        scoreboardBody.appendChild(teamCard);
    });
}

/**
 * Populates the team selection dropdown with the names of the teams.
 */
function renderTeamSelector() {
    teamSelect.innerHTML = ''; // Clear previous options
    gameState.forEach(team => {
        const option = document.createElement('option');
        option.value = team.name;
        option.textContent = team.name;
        teamSelect.appendChild(option);
    });
}

/**
 * Displays a temporary status message to the user.
 * @param {string} message - The message to display.
 * @param {boolean} isError - If true, displays the message in red.
 */
function showStatus(message, isError = false) {
    statusMessage.textContent = message;
    statusMessage.className = `text-center mt-6 h-6 ${isError ? 'text-red-400' : 'text-yellow-300'}`;
    
    // Clear the message after 3 seconds
    setTimeout(() => {
        statusMessage.textContent = '';
    }, 3000);
}


// =================================================================================
// GAME LOGIC FUNCTIONS
// =================================================================================

/**
 * Processes a scoring update for a team.
 * @param {boolean} isCorrect - Whether the team's answer was correct.
 */
function handleSubmit(isCorrect) {
    const teamName = teamSelect.value;
    const questionNumber = parseInt(questionNumberInput.value, 10);

    // Validate the question number input
    if (isNaN(questionNumber) || questionNumber < 1 || questionNumber > MAX_QUESTIONS) {
        showStatus(`Please enter a question number between 1 and ${MAX_QUESTIONS}.`, true);
        return;
    }

    // Find the team in the game state
    const team = gameState.find(t => t.name === teamName);
    if (!team) return; // Should not happen

    let message = '';
    if (isCorrect) {
        // Handle correct answers
        if (team.location === 'Earth') {
            team.location = 'Heaven';
            message = `${team.name} solved an Earth problem and moved to Heaven!`;
        } else { // Team is in Heaven
            const pointsEarned = POINTS_FIRST_CORRECT + (team.streak * POINTS_PER_STREAK);
            team.score += pointsEarned;
            team.streak += 1;
            message = `${team.name} earned ${pointsEarned} points! Their streak is now ${team.streak}.`;
        }
    } else {
        // Handle incorrect answers
        message = `${team.name} answered incorrectly. They are sent back to Earth.`;
        if (team.location === 'Heaven') {
            team.streak = 0; // Reset streak only if they were in heaven
        }
        team.location = 'Earth';
    }

    // Update state, UI, and show confirmation
    saveState();
    renderAll();
    showStatus(message);
    questionNumberInput.value = ''; // Clear input for next entry
}

/**
 * Toggles the scoreboard's fullscreen mode.
 */
function toggleFullscreen() {
    scoreboard.classList.toggle('fullscreen-scoreboard');
    
    // Change button text and hide/show other elements
    if (scoreboard.classList.contains('fullscreen-scoreboard')) {
        fullscreenBtn.textContent = 'Exit Fullscreen';
        document.getElementById('scoring-controls').style.display = 'none';
        document.querySelector('header').style.display = 'none';
    } else {
        fullscreenBtn.textContent = 'Fullscreen';
        document.getElementById('scoring-controls').style.display = 'block';
        document.querySelector('header').style.display = 'flex';
    }
}

/**
 * Resets the entire game state to its initial configuration.
 */
function resetGame() {
    if (confirm("Are you sure you want to reset the entire game? All scores and progress will be lost.")) {
        // Re-initialize state based on original teams, but set scores etc. to 0
        const initialTeams = gameState.map(team => team.name);
        initializeGameState(initialTeams);
        // Save the fresh state and re-render everything
        saveState();
        renderAll();
        showStatus("Game has been reset.");
    }
}

/**
 * Main function to initialize the game state from URL parameters.
 * @param {string[]} teams - An array of team names.
 */
function initializeGameState(teams) {
    gameState = teams.map(name => ({
        name: name,
        score: 0,
        streak: 0,
        location: 'Earth', // All teams start on Earth
    }));
}


// =================================================================================
// INITIALIZATION AND EVENT LISTENERS
// =================================================================================

/**
 * A wrapper function to re-render all dynamic UI components.
 */
function renderAll() {
    renderScoreboard();
    renderTeamSelector();
}

/**
 * Main entry point for the scoring page script.
 */
function main() {
    // Try to load state from localStorage first
    const savedState = loadState();
    const urlParams = new URLSearchParams(window.location.search);
    const teamsFromUrl = urlParams.get('teams');

    // Determine the source of truth for teams
    let teamNames = [];
    if (teamsFromUrl) {
         teamNames = teamsFromUrl.split(',').map(decodeURIComponent);
    }
   
    // If there's a saved state, check if its teams match the URL.
    // If they don't, the URL takes precedence (new game started).
    if (savedState && teamsFromUrl && savedState.map(t => t.name).join(',') === teamNames.join(',')) {
        gameState = savedState;
    } else if (teamNames.length > 0) {
        // Initialize a new game state if teams are in URL
        initializeGameState(teamNames);
        saveState();
    } else if(savedState) {
        // If no URL params but state exists, load it (page refresh scenario)
        gameState = savedState;
    } else {
        // No teams from URL and no saved state, show error.
        appContainer.classList.add('hidden');
        errorContainer.classList.remove('hidden');
        return;
    }
    
    // Set up event listeners
    correctBtn.addEventListener('click', () => handleSubmit(true));
    incorrectBtn.addEventListener('click', () => handleSubmit(false));
    fullscreenBtn.addEventListener('click', toggleFullscreen);
    resetGameBtn.addEventListener('click', resetGame);
    
    // Perform the initial render of the page
    renderAll();
}

// Run the main function when the script loads
main();
