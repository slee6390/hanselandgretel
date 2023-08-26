document.addEventListener("DOMContentLoaded", function() {
    // Initialize variables
    let currentMonthIndex = 0; 
    let stamina = 80;
    let hansel = 0;
    let gretel = 0;
    let gold = 100;
    let person = 1;

    hideAllEventScreens();
    before_adoption();

    const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 12]

    // Add event listeners to the choice buttons
    document.getElementById("work").addEventListener("click", function() {
        playerChoice("work"); // Call playerChoice with the chosen action
    });

    document.getElementById("both").addEventListener("click", function() {
        playerChoice("both"); // Call playerChoice with the chosen action
    });

    document.getElementById("hansel").addEventListener("click", function() {
        playerChoice("hansel"); // Call playerChoice with the chosen action
    });

    document.getElementById("gretel").addEventListener("click", function() {
        playerChoice("gretel"); // Call playerChoice with the chosen action
    });

    document.getElementById("rest").addEventListener("click", function() {
        playerChoice("rest"); // Call playerChoice with the chosen action
    });

    // Add event listeners for ending1 buttons
    const ending1Buttons = document.querySelectorAll(".ending1");
    ending1Buttons.forEach(button => {
        button.addEventListener("click", function() {
            showEndingScreen();
        });
    });

    // Add event listeners for continue buttons
    const continueButtons = document.querySelectorAll(".continue");
    continueButtons.forEach(button => {
        button.addEventListener("click", function() {
            person += 2;
            continueGame();
        });
    });

    // the player makes a choice --> update stamina, money, or other variables based on choice
    function playerChoice(choice) {
        if (choice === "work") {
            stamina -= 20;
            gold += 200;
        } else if (choice === "both") {
            stamina -= 20;
            gold += 120;
            hansel += 15
            gretel += 10
        } else if (choice === "hansel") {
            stamina -= 10;
            gold += 150;
            hansel += 20;
            gretel += 5;
        } else if (choice === "gretel") {
            stamina -= 10;
            gold += 150;
            hansel += 10;
            gretel += 15;
        } else if (choice === "rest") {
            stamina += 50;
            if (stamina > 100) {
                stamina = 100; // Set stamina to the maximum limit
            }
            gold += 110;
        }
        // Move to the next month after each choice
        moveToNextMonth(choice);
    }

    // Function to move to the next month
    function moveToNextMonth(choice) {
        currentMonthIndex++;
        // Add logic here to reset variables, handle transitions, etc.
        gold -= 50 * person;

        // Check if the month is 2 and show event scenarios
        if (currentMonthIndex === 1) {
            month1(choice);
        }

        if (currentMonthIndex === 5) {
            month6();
        }

        if (currentMonthIndex === 12) {
            month12();
        }

        updateContent();
    }

    // Function to update content
    function updateContent() {
        document.getElementById("current-month").textContent = `Month: ${months[currentMonthIndex]}`;
        document.getElementById("current-month-text").textContent = `${months[currentMonthIndex]}`;
        document.getElementById("stamina-text").textContent = `${stamina}`;
        document.getElementById("stamina-fill").style.width = `${stamina}%`;
        document.getElementById("hansel").textContent = `Hansel's trust: ${hansel}`;
        document.getElementById("gretel").textContent = `Gretel's trust: ${gretel}`;
        document.getElementById("gold").textContent = `Gold: ${gold}`;
    }

    // Function to show event scenarios
    function month1(choice) {
        document.getElementById("main-game").style.display = "none";

        if (choice === "work") {
            document.getElementById("hansel-gretel-work").style.display = "block";
        } else {
            document.getElementById("hansel-gretel-rest").style.display = "block";
        }
    }

    function month6() {
        document.getElementById("main-game").style.display = "none";
        document.getElementById("6mo-screen").style.display = "block";

        // hide main game after any 6mo choice 
        const choices_6mo = document.querySelectorAll(".choices-6mo");
        choices_6mo.forEach(button => {
            button.addEventListener("click", function() {
                document.getElementById("6mo-screen").style.display = "none";
            });
        });

        month6_choices();

        //continue to month 7 by displaying main game again
        const continue_6mo = document.querySelectorAll(".continue-6mo");
        continue_6mo.forEach(button => {
            button.addEventListener("click", function() {
                hideAllEventScreens(); // Call the function to hide all event screens
                document.getElementById("main-game").style.display = "block";
            });
        });
    }

    // 6 mo choices
    function month6_choices() {
        document.getElementById("candy").addEventListener("click", function() {
            hansel += 5;
            gretel += 5;
            document.getElementById("candy-screen").style.display = "block";
        });
        document.getElementById("console").addEventListener("click", function() {
            hansel += 15;
            gretel += 10;
            document.getElementById("console-screen").style.display = "block";
        });
        document.getElementById("ignore").addEventListener("click", function() {
            hansel -= 10;
            gretel -= 20;
            document.getElementById("ignore-screen").style.display = "block";
        });
    }

    function month12() {
        document.getElementById("main-game").style.display = "none";
        document.getElementById("ending-intro-screen").style.display = "block";
    }

    function before_adoption() {
        const new_choices = document.querySelectorAll(".new");
        new_choices.forEach(new_choice => {
            new_choice.style.display = "none";
        });
    }

    function adoption() {
        const new_choices = document.querySelectorAll(".new");
        new_choices.forEach(new_choice => {
            new_choice.style.display = "block";
        });
    }

    // Function to show the ending screen
    function showEndingScreen() {
        hideAllEventScreens(); // Call the function to hide all event screens
        document.getElementById("ending1-screen").style.display = "block";
    }

    // Function to continue the game
    function continueGame() {
        hideAllEventScreens(); // Call the function to hide all event screens
        document.getElementById("continue-screen").style.display = "block";
        document.getElementById("continue-continue").addEventListener("click", function() {
            hideAllEventScreens(); // Call the function to hide all event screens
            document.getElementById("main-game").style.display = "block";
            adoption();
        });
    }

    // Function to hide all event screens
    function hideAllEventScreens() {
        const eventScreens = document.querySelectorAll(".non-main");
        eventScreens.forEach(screen => {
            screen.style.display = "none";
        });
    }
});