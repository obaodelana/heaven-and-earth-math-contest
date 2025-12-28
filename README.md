# Heaven & Earth Math Contest 🧮

Hello Sean! This is a simple scoreboard app built for the "Heaven & Earth Math Contest". It's designed to be used by the game master to keep track of team scores, streaks, and where they are in the "world."

## How the Game Works

The game is split into two places: **Earth** and **Heaven**.

1.  **Starting Out**: Everyone starts on **Earth**.
2.  **Moving Up**: If a team on Earth gets a question right, they don't get points yet—they just move up to **Heaven**!
3.  **Scoring in Heaven**: Once a team is in Heaven, every correct answer earns them points. 
    -   A correct answer is worth **3 points**.
    -   If they get multiple questions right in a row (a "streak"), they get **bonus points** (+1 for every extra correct answer in the streak).
4.  **Falling Back Down**: If a team gets a question **wrong** (no matter where they are), they are immediately sent back to **Earth**. If they were in Heaven, their streak is also reset to zero.

## How to Use the App

1.  **Add Teams**: On the home page, just type in the team names one by one.
2.  **Start the Game**: Hit "Start Game" to go to the scoreboard.
3.  **Logging Answers**: 
    -   Select the team from the dropdown.
    -   Type in the question number they just did.
    -   Click **Correct** or **Incorrect**.
4.  **Buttons at the Top**:
    -   **Exit Game**: Wipes everything and takes you back to the start.
    -   **Reset Game**: Keeps the teams but clears all scores and progress.
    -   **Fullscreen**: Makes the board big for everyone to see.

## Where Everything Lives

If you want to poke around the code, here’s where I put everything:

-   **`src/lib/home`**: This is the "Lobby." It contains the code for adding teams and the first page you see.
-   **`src/lib/scoreboard`**: The "Main Stage." This is where the actual contest scoreboard and the buttons for the Game Master live.
    -   **`gameState.svelte.ts`**: The "Rulebook." This is the most important file. It’s where the app decides how many points to give and how teams move between Heaven and Earth.
-   **`src/lib/constants.ts`**: The "Settings." This is a tiny file where you can change the point values (like making a correct answer worth 10 points instead of 3).

## Making Quick Edits

-   **Change the points**: Open `src/lib/constants.ts` and change `POINTS_FIRST_CORRECT` or `POINTS_PER_STREAK`.
-   **Change the words "Heaven" and "Earth"**: Open `src/lib/constants.ts` and edit the `location` types, then do a "Find and Replace" (Cmd+F) in the whole project to update the labels.
-   **Change colors**: Most colors come from "Tailwind CSS." Look for things like `bg-emerald-500` (green) or `bg-indigo-600` (purple) in the files and swap them for other colors (like `bg-red-500` or `bg-blue-600`).

## Technical Stuff

If you want to run the code on your personal computer and makes changes:

1.  **Install Node.js**: Go to [nodejs.org](https://nodejs.org/) and download the "LTS" version. This is the engine that runs the code.
2. Download the code to your computer.
2.  **Install required packages**: Open your terminal in the downloaded folder and run `npm install`.
3.  **Run it with**: Run `npm run dev` and click the link it gives you (usually `localhost:5173`).

---

Built with **Svelte 5**, **TypeScript**, and **Tailwind CSS**.
