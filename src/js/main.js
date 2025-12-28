
// =================================================================================
// INITIALIZATION & DOM ELEMENT SELECTION
// =================================================================================

// An in-memory array to store the list of team names.
let teams = [];

// Get references to all the interactive HTML elements we'll need.
const teamNameInput = document.getElementById('team-name-input');
const addTeamBtn = document.getElementById('add-team-btn');
const teamList = document.getElementById('team-list');
const startGameBtn = document.getElementById('start-game-btn');
const errorMessage = document.getElementById('error-message');


// =================================================================================
// CORE FUNCTIONS
// =================================================================================

/**
 * Clears the existing team list in the UI and re-renders it from the `teams` array.
 * This function is called whenever the team list changes.
 */
function renderTeams() {
    // Clear the current list to prevent duplicates
    teamList.innerHTML = '';

    // If there are no teams, display a placeholder message
    if (teams.length === 0) {
        teamList.innerHTML = `<li class="text-slate-500 text-center p-4">No teams added yet.</li>`;
    } else {
        // Create and append a list item for each team
        teams.forEach((team, index) => {
            const li = document.createElement('li');
            li.className = 'flex justify-between items-center bg-slate-700 p-3 rounded-lg animate-fade-in';
            
            // Team name display
            const teamNameSpan = document.createElement('span');
            teamNameSpan.className = 'font-semibold text-lg';
            teamNameSpan.textContent = team;

            // Container for action buttons (Edit, Delete)
            const buttonsDiv = document.createElement('div');
            buttonsDiv.className = 'space-x-3';
            
            // Edit Button
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.className = 'text-yellow-400 hover:text-yellow-300 font-semibold transition';
            editBtn.onclick = () => editTeam(index);

            // Delete Button
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.className = 'text-red-400 hover:text-red-300 font-semibold transition';
            deleteBtn.onclick = () => deleteTeam(index);

            buttonsDiv.appendChild(editBtn);
            buttonsDiv.appendChild(deleteBtn);
            
            li.appendChild(teamNameSpan);
            li.appendChild(buttonsDiv);

            teamList.appendChild(li);
        });
    }
    
    // Enable or disable the "Start Game" button based on whether there are any teams
    updateStartButtonState();
}

/**
 * Adds a new team to the list.
 * It validates the input to ensure it's not empty and not a duplicate.
 */
function addTeam() {
    // Trim whitespace from the input value
    const teamName = teamNameInput.value.trim();

    // Validate the team name
    if (!teamName) {
        showError("Team name cannot be empty.");
        return;
    }
    if (teams.includes(teamName)) {
        showError("This team name already exists.");
        return;
    }

    // Add the new team and update the UI
    teams.push(teamName);
    teamNameInput.value = ''; // Clear the input field
    teamNameInput.focus(); // Set focus back to the input field
    renderTeams();
    clearError();
}

/**
 * Deletes a team from the list at a given index.
 * @param {number} index - The index of the team to delete.
 */
function deleteTeam(index) {
    // Remove the team from the array
    teams.splice(index, 1);
    // Re-render the list to reflect the change
    renderTeams();
}

/**
 * Edits the name of a team at a given index.
 * Uses a prompt for simplicity to get the new name from the user.
 * @param {number} index - The index of the team to edit.
 */
function editTeam(index) {
    const currentName = teams[index];
    const newName = prompt("Enter the new name for the team:", currentName);

    // If the user provided a new name (and didn't cancel the prompt)
    if (newName && newName.trim()) {
        const trimmedNewName = newName.trim();
        // Check for duplicates, excluding the current name itself
        if (teams.includes(trimmedNewName) && trimmedNewName !== currentName) {
            alert("This team name already exists.");
            return;
        }
        // Update the name in the array
        teams[index] = trimmedNewName;
        // Re-render the list
        renderTeams();
    }
}

/**
 * Navigates to the scoring page, passing the list of teams as a URL search parameter.
 * The team names are URI-encoded to be safely included in the URL.
 */
function startGame() {
    if (teams.length > 0) {
        // Encode each team name and join them with a comma
        const encodedTeams = teams.map(team => encodeURIComponent(team)).join(',');
        // Redirect to the scoring page
        window.location.href = `scoring.html?teams=${encodedTeams}`;
    }
}

/**
 * Toggles the disabled state of the "Start Game" button.
 * The button is disabled if there are no teams.
 */
function updateStartButtonState() {
    startGameBtn.disabled = teams.length === 0;
}

/**
 * Displays an error message to the user.
 * @param {string} message - The error message to show.
 */
function showError(message) {
    errorMessage.textContent = message;
}

/**
 * Clears the error message.
 */
function clearError() {
    errorMessage.textContent = '';
}


// =================================================================================
// EVENT LISTENERS
// =================================================================================

// Add a team when the "Add Team" button is clicked.
addTeamBtn.addEventListener('click', addTeam);

// Also add a team when the "Enter" key is pressed in the input field.
teamNameInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addTeam();
    }
});

// Start the game when the "Start Game" button is clicked.
startGameBtn.addEventListener('click', startGame);


// =================================================================================
// INITIAL RENDER
// =================================================================================

// Perform an initial render to show the empty state when the page first loads.
renderTeams();
