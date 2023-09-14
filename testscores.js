document.addEventListener("DOMContentLoaded", function () {
    // Get references to HTML elements
    const scoreForm = document.getElementById("scoreForm");
    const scoreInput = document.getElementById("score");
    const scoreTableBody = document.querySelector("#scoreTable tbody");
    const averageSection = document.getElementById("averageSection");
    const averageValue = document.getElementById("averageValue");
    const resetButton = document.getElementById("resetButton");

    // Initialize an array to store scores
    const scores = [];

    // Handle form submission
    scoreForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Parse the input value as an integer
        const entry = parseInt(scoreInput.value);
        
        // Validate the input
        if (isValidScore(entry)) {
            // Add the score to the array and update the table
            scores.push(entry);
            addScoreToTable(entry);

            // Clear the input field
            scoreInput.value = "";

            // Calculate and display the average
            calculateAverage();
        } else {
            alert("Entry must be a valid number from 0 through 100");
        }
    });

    // Validate if a score is within the valid range
    function isValidScore(score) {
        return score >= 0 && score <= 100 && !isNaN(score);
    }

    // Add a score to the table
    function addScoreToTable(score) {
        const row = document.createElement("tr");
        const cell = document.createElement("td");
        cell.textContent = score;
        row.appendChild(cell);
        scoreTableBody.appendChild(row);
    }

    // Calculate and display the average
    function calculateAverage() {
        if (scores.length > 0) {
            const total = scores.reduce((acc, score) => acc + score, 0);
            const average = total / scores.length;
            averageValue.textContent = average.toFixed(2);
            averageSection.style.display = "block";
        }
    }

    // Handle reset button click event
    resetButton.addEventListener("click", function () {
        // Clear the scores array
        scores.length = 0;

        // Remove all rows from the table
        while (scoreTableBody.firstChild) {
            scoreTableBody.removeChild(scoreTableBody.firstChild);
        }

        // Reset the average section
        averageValue.textContent = "";
        averageSection.style.display = "none";

        // Clear the input field
        scoreInput.value = "";
    });
});
