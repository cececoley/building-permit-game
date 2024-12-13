document.addEventListener("DOMContentLoaded", () => {
    let score = 0;
    let currentApplication = 0;

    const screens = {
        welcomePage: document.getElementById("screen-welcome-page"),
        intro: document.getElementById("screen-intro"),
        welcome: document.getElementById("screen-welcome"),
        director: document.getElementById("screen-director"),
        desk: document.getElementById("screen-desk"),
        score: document.getElementById("screen-score"),
    };

    const playerNameInput = document.getElementById("playerName");
    const playerNameDisplays = document.querySelectorAll(".playerNameDisplay");
    const applicationsContainer = document.getElementById("applications");
    const viewScoreButton = document.getElementById("viewScore");
    const finalScore = document.getElementById("finalScore");
    const detailedFeedback = document.getElementById("detailedFeedback");

    const applications = [
        {
            id: 1,
            scenario: "A developer wants to build a housing project in a small residential neighborhood prone to flooding.",
            description: "The proposed residential building has a plot size of 480 sqm, a building height of 12 meters, and no storm drains.",
            correct: "reject",
            feedbackCorrect: "Great job! This application violates the minimum plot size and lacks storm drains, which are critical in a flood-prone area.",
            feedbackIncorrect: "Ok, maybe not quite. This application violates the minimum plot size and lacks storm drains.",
            hint: "Check the minimum plot size and whether storm drains are included.",
        },
        {
            id: 2,
            scenario: "A homeowner is expanding their property and includes landscaping improvements to reduce water runoff.",
            description: "The proposed residential building has a plot size of 550 sqm, a building height of 9 meters, and proper storm drains.",
            correct: "approve",
            feedbackCorrect: "Awesome! This application meets all guidelines, including proper storm drainage and landscaping improvements.",
            feedbackIncorrect: "Not quite. This application actually meets all guidelines, including storm drainage and landscaping requirements.",
            hint: "Does it comply with plot size, building height, and storm drain requirements?",
        },
    ];

    function showScreen(screen) {
        Object.values(screens).forEach((s) => s.classList.remove("active"));
        screen.classList.add("active");
    }

    function provideFeedback(isCorrect, app) {
        const feedbackItem = document.createElement("li");
        feedbackItem.className = "list-group-item";
        feedbackItem.innerHTML = `
            <strong>Application #${app.id}:</strong> 
            ${isCorrect ? app.feedbackCorrect : app.feedbackIncorrect}
        `;
        detailedFeedback.appendChild(feedbackItem);
    }

    function generateApplication() {
        if (currentApplication >= applications.length) {
            viewScoreButton.classList.remove("d-none");
            return;
        }

        const app = applications[currentApplication];
        applicationsContainer.innerHTML = `
            <div class="application">
                <img src="images/scenario${app.id}.jpg" alt="Scenario Image" class="img-fluid mb-3">
                <p><strong>Scenario:</strong> ${app.scenario}</p>
                <p><strong>Application:</strong> ${app.description}</p>
                <button id="approve" class="btn btn-success me-2">Approve</button>
                <button id="reject" class="btn btn-danger">Reject</button>
                <button id="hint" class="btn btn-secondary mt-2">Show Hint</button>
            </div>
        `;

        document.getElementById("hint").addEventListener("click", () => {
            alert(app.hint);
        });

        document.getElementById("approve").addEventListener("click", () => handleDecision("approve", app));
        document.getElementById("reject").addEventListener("click", () => handleDecision("reject", app));
    }

    function handleDecision(choice, app) {
        const isCorrect = choice === app.correct;

        if (isCorrect) {
            score++;
        }

        provideFeedback(isCorrect, app);
        currentApplication++;
        generateApplication();
    }

    document.getElementById("startIntroduction").addEventListener("click", () => {
        showScreen(screens.intro);
    });

    document.getElementById("submitName").addEventListener("click", () => {
        const playerName = playerNameInput.value.trim();
        if (playerName) {
            playerNameDisplays.forEach(el => el.textContent = playerName);
            showScreen(screens.welcome);
        } else {
            alert("Please enter your name.");
        }
    });

    document.getElementById("toDirectorOffice").addEventListener("click", () => {
        showScreen(screens.director);
    });

    document.getElementById("toDesk").addEventListener("click", () => {
        showScreen(screens.desk);
        generateApplication();
    });

    viewScoreButton.addEventListener("click", () => {
        finalScore.textContent = `You scored ${score} out of ${applications.length}!`;
        showScreen(screens.score);
    });

    document.getElementById("restartGame").addEventListener("click", () => {
        score = 0;
        currentApplication = 0;
        playerNameInput.value = "";
        playerNameDisplays.forEach(el => el.textContent = "");
        detailedFeedback.innerHTML = "";
        viewScoreButton.classList.add("d-none");
        showScreen(screens.welcomePage);
    });
});
