 // Global variables to track application and score
        let currentApplication = 0;
        let score = 0;

        // List of applications for the game
        const applications = [
            {
                id: 1,
                scenario: "A developer wants to build a housing project in a small residential neighborhood prone to flooding.",
                description: "The proposed residential building has a plot size of 480 sqm, a building height of 12 meters, and no storm drains.",
                correct: "reject",
                feedbackCorrect: "Great job! This application violates the minimum plot size and lacks storm drains, which are critical in a flood-prone area.",
                feedbackIncorrect: "Ok, maybe not quite. This application violates the minimum plot size and lacks storm drains.",
                hint: "Check the minimum plot size and whether storm drains are included.",
                image: "application_1.jpg"
            },
            {
                id: 2,
                scenario: "A homeowner is expanding their property and includes landscaping improvements to reduce water runoff.",
                description: "The proposed residential building has a plot size of 550 sqm, a building height of 9 meters, and proper storm drains.",
                correct: "approve",
                feedbackCorrect: "Awesome! This application meets all guidelines, including proper storm drainage and landscaping improvements.",
                feedbackIncorrect: "Not quite. This application actually meets all guidelines, including storm drainage and landscaping requirements.",
                hint: "Does it comply with plot size, building height, and storm drain requirements?",
                image: "application_2.jpg"
            },
            {
                id: 3,
                scenario: "A residential developer proposes a new family home with minimal setbacks in a high-traffic area.",
                description: "The residential building has a plot size of 600 sqm, a frontage setback of 5 meters, and one tree included.",
                correct: "reject",
                feedbackCorrect: "Well done! This application violates the minimum frontage setback of 6 meters, which is crucial in a high-traffic area.",
                feedbackIncorrect: "Close, but this application violates the minimum frontage setback of 6 meters.",
                hint: "Frontage setback is an important guideline to check.",
                image: "application_3.jpg"
            },
            {
                id: 4,
                scenario: "A developer plans a small housing project with an emphasis on environmental sustainability.",
                description: "The proposed residential building has a plot size of 700 sqm, proper storm drains, and 50% permeable landscaping.",
                correct: "approve",
                feedbackCorrect: "Fantastic! This application meets all guidelines, including landscaping and storm drain requirements, ensuring sustainability.",
                feedbackIncorrect: "Hmm, not quite. This application meets all guidelines, making it a strong approval candidate.",
                hint: "Does it meet all landscaping and storm drain requirements?",
                image: "application_4.jpg"
            },
            {
                id: 5,
                scenario: "An ambitious developer proposes a tall residential building to maximize space on a smaller plot.",
                description: "The residential building has a plot size of 500 sqm, a building height of 11 meters, and proper storm drains.",
                correct: "reject",
                feedbackCorrect: "Excellent! This application exceeds the maximum building height of 10 meters, which violates regulations.",
                feedbackIncorrect: "Not this time. This application exceeds the maximum building height of 10 meters.",
                hint: "Check if the building height complies with the maximum limit.",
                image: "application_6.jpg"
            }
        ];

        // Show a specific screen by ID
        function showScreen(screenId) {
            const screens = document.querySelectorAll('.screen');
            screens.forEach(screen => screen.classList.remove('active'));
            document.getElementById(screenId).classList.add('active');
        }

        // Start the introduction screen
        function startIntroduction() {
            showScreen('screen-intro');
        }

        // Handle name submission
        function submitName() {
            const playerName = document.getElementById('playerName').value.trim();
            const feedbackMessage = document.getElementById('nameFeedback');
            if (playerName) {
                document.querySelectorAll('.playerNameDisplay').forEach(span => span.textContent = playerName);
                feedbackMessage.textContent = ""; // Clear feedback message
                showScreen('screen-welcome');
            } else {
                feedbackMessage.textContent = "Jack: I need your name to introduce you to the director. Please enter your name below.";
            }
        }

        // Proceed to guidelines
        function goToGuidelines() {
            showScreen('screen-guidelines');
        }

        // Start reviewing applications
        function goToDesk() {
            showScreen('screen-desk');
            renderApplications();
        }

        // Render the current application
        function renderApplications() {
            const appContainer = document.getElementById('applications');
            appContainer.innerHTML = '';
            const app = applications[currentApplication];
            appContainer.innerHTML = `
                <div class="application-card">
                    <div class="application-header">
                        <img src="${app.image}" alt="Application Image">
                        <h3>Application ${app.id}</h3>
                        <p>${app.description}</p>
                    </div>
                    <div class="scenario">
                        <h4>Scenario:</h4>
                        <p>${app.scenario}</p>
                    </div>
                    <div class="btn-group">
                        <button onclick="handleDecision('approve')">Approve</button>
                        <button onclick="handleDecision('reject')">Reject</button>
                        <button onclick="showHint()">Hint</button>
                    </div>
                    <div id="feedback" class="feedback"></div>
                </div>`;
        }

        // Handle the player's decision
        function handleDecision(action) {
            const app = applications[currentApplication];
            const feedbackElement = document.getElementById('feedback');
            if (action === app.correct) {
                score++;
                feedbackElement.textContent = app.feedbackCorrect;
                feedbackElement.className = 'feedback success';
            } else {
                feedbackElement.textContent = app.feedbackIncorrect;
                feedbackElement.className = 'feedback error';
            }
            setTimeout(() => {
                currentApplication++;
                if (currentApplication < applications.length) {
                    renderApplications();
                } else {
                    showScore();
                }
            }, 3000);
        }

        // Show a hint for the current application
        function showHint() {
            const app = applications[currentApplication];
            const feedbackElement = document.getElementById('feedback');
            feedbackElement.textContent = app.hint;
            feedbackElement.className = 'feedback hint';
        }

        // Display the final score
        function showScore() {
            const appContainer = document.getElementById('applications');
            appContainer.innerHTML = `
                <h2>Your Final Score: ${score} / ${applications.length}</h2>
                <button onclick="restartGame()">Restart Game</button>
            `;
        }

        // Restart the game
        function restartGame() {
            currentApplication = 0;
            score = 0;
            showScreen('screen-welcome-page');
        }

        // Initialize the game on page load
        document.addEventListener('DOMContentLoaded', () => {
            showScreen('screen-welcome-page');
        });
