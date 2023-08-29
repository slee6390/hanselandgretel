document.addEventListener("DOMContentLoaded", function() {
    // Initialize variables
    let currentMonthIndex = 0; 
    let stamina = 80;
    let hansel = 0;
    let gretel = 0;
    let gold = 200;
    let stepmotherEventOccur = false;
    let hanselEvent1Occur = false;
    let hanselEvent2Occur = false;
    let gretelEvent1Occur = false;
    let gretelEvent2Occur = false;
    let gretelEvent3Occur = false;

    hideAllEndingScreens();
    hideAllEventScreens();
    before_adoption();

    const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 12]

    const buttons = document.querySelectorAll(".button");
    buttons.forEach(button => {
        button.addEventListener("click", function() {
            updateContent();
        });
    });

    // Add event listeners to the choice buttons
    document.getElementById("work").addEventListener("click", function() {
        playerChoice("work");
        console.log("work");
    });

    document.getElementById("both").addEventListener("click", function() {
        playerChoice("both");
        console.log("both");
    });

    document.getElementById("hansel").addEventListener("click", function() {
        playerChoice("hansel");
        console.log("hansel");
    });

    document.getElementById("gretel").addEventListener("click", function() {
        playerChoice("gretel");
        console.log("gretel");
    });

    document.getElementById("rest").addEventListener("click", function() {
        playerChoice("rest"); 
        console.log("rest");
    });

    // Add event listeners for ending1 buttons
    const ending1Buttons = document.querySelectorAll(".ending1");
    ending1Buttons.forEach(button => {
        button.addEventListener("click", function() {
            hideAllEventScreens(); // Call the function to hide all event screens
            document.getElementById("ending1-screen").style.display = "block";
        });
    });

    // Add event listeners for continue buttons
    const continueButtons = document.querySelectorAll(".continue");
    continueButtons.forEach(button => {
        button.addEventListener("click", function() {
            continueGame();
        });
    });

    // the player makes a choice --> update stamina, money, or other variables based on choice
    function playerChoice(choice) {
        hideAllEventScreens();
        hideAllEndingScreens();
        if (choice === "work") {
            stamina -= 20;
            if (hansel > 40 && gretel > 40) {
                gold += 300
            } else if (hansel > 40 && gretel < 40) {
                gold += 250
            } else if (hansel < 40 && gretel > 40) {
                gold += 250
            } else {
                gold += 200;
            }
        } else if (choice === "both") {
            stamina -= 20;
            gold -= 100;
            hansel += 15;
            gretel += 10;
        } else if (choice === "hansel") {
            stamina -= 10;
            gold -= 50;
            hansel += 10;
            gretel += 0;
        } else if (choice === "gretel") {
            stamina -= 10;
            gold -= 50;
            hansel += 5;
            gretel += 10;
        } else if (choice === "rest") {
            gold -= 50;
            stamina += 50;
            if (stamina > 100) {
                stamina = 100; // Set stamina to the maximum limit
            }
            updateContent();
        }
        // Move to the next month after each choice
        moveToNextMonth(choice);
    }

    // Function to move to the next month
    function moveToNextMonth(choice) {
        updateContent();
        currentMonthIndex++;

        // Check if the month is 2 and show event scenarios
        if (currentMonthIndex === 1) {
            month1(choice);
        }

        if (currentMonthIndex === 12) {
            month12();
        }

        if (currentMonthIndex > 1 && stepmotherEventOccur == false && Math.random() < 0.5) {
            stepmotherEvent();
            stepmotherEventOccur == true;
        }

        if (gold <= 0) {
            ending0();
        }

        if (stamina <= 0) {
            restoreStamina();
        }
        
        if (hanselEvent1Occur === false && hansel > 40){
            hanselEvent1();
            hanselEvent1Occur = true;
        }

        if (hanselEvent2Occur === false && hansel > 40){
            hanselEvent2();
            hanselEvent2Occur = true;
        }

        if (gretelEvent1Occur === false && gretel > 40){
            gretelEvent1();
            gretelEvent1Occur = true;
        }

        if (gretelEvent2Occur === false && gretel > 20){
            gretelEvent2();
            gretelEvent2Occur = true;
        }

        if (currentMonthIndex > 1 && gretelEvent3Occur === false && gretel < 20 && Math.random() < 0.8){
            gretelEvent3();
            gretelEvent3Occur = true;
        }

        if (currentMonthIndex > 1 && gold < 150 && Math.random() < 0.8){
            goldEvent();
        }
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

    function stepmotherEvent() {
        document.getElementById("main-game").style.display = "none";
        document.getElementById("stepmother-event-screen").style.display = "block";

        // hide main game after any stepmother event choices
        const stepmotherChoices = document.querySelectorAll(".stepmother-choices");
        stepmotherChoices.forEach(button => {
            button.addEventListener("click", function() {
                document.getElementById("stepmother-event-screen").style.display = "none";
            });
        });

        // stepmother event choices
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

        //continue to month 7 by displaying main game again
        const stepmotherContinue = document.querySelectorAll(".stepmother-continue");
        stepmotherContinue.forEach(button => {
            button.addEventListener("click", function() {
                hideAllEventScreens(); // Call the function to hide all event screens
                document.getElementById("main-game").style.display = "block";
            });
        });
    }

    function month12() {
        document.getElementById("main-game").style.display = "none";
        document.getElementById("ending-intro-screen").style.display = "block";
        document.getElementById("ending-continue").addEventListener("click", function() {
            document.getElementById("ending-intro-screen").style.display = "none";
            if (hansel >= 50 && gretel >= 50) {
                console.log("ending2");
                ending2();
            } else if (hansel >= 50 && gretel < 50) {
                console.log("ending3");
                ending3();
            } else if (hansel < 50 && gretel >= 50) {
                console.log("ending4");
                ending4();
            } else {
                console.log("ending5");
                ending5();
            } 
        });
    }

    function ending0() {
        gold = 0;
        document.getElementById("main-game").style.display = "none";
        document.getElementById("ending0-screen").style.display = "block";
        hideAllEventScreens();
    }

    function ending2() {
        document.getElementById("ending2-screen1").style.display = "block";

        document.getElementById("ending2-continue1").addEventListener("click", function() {
            document.getElementById("ending2-screen1").style.display = "none";
            document.getElementById("ending2-screen2").style.display = "block";
        });

        document.getElementById("ending2-continue2").addEventListener("click", function() {
            document.getElementById("ending2-screen2").style.display = "none";
            document.getElementById("ending2-screen3").style.display = "block";
        });

        document.getElementById("ending2-continue2").addEventListener("click", function() {
            document.getElementById("ending2-screen3").style.display = "none";
            document.getElementById("ending2-screen4").style.display = "block";
        });
    }

    function ending3() {
        document.getElementById("ending3-screen1").style.display = "block";
        
        document.getElementById("ending3-continue1").addEventListener("click", function() {
            document.getElementById("ending3-screen1").style.display = "none";
            document.getElementById("ending3-screen2").style.display = "block";
        });

        document.getElementById("ending3-continue2").addEventListener("click", function() {
            document.getElementById("ending3-screen2").style.display = "none";
            document.getElementById("ending3-screen3").style.display = "block";
        });

        document.getElementById("ending3-continue3").addEventListener("click", function() {
            document.getElementById("ending3-screen3").style.display = "none";
            document.getElementById("ending3-screen4").style.display = "block";
        });

        document.getElementById("ending3-continue4").addEventListener("click", function() {
            document.getElementById("ending3-screen4").style.display = "none";
            document.getElementById("ending3-screen5").style.display = "block";
        });
    }

    function ending4() {
        document.getElementById("ending4-screen1").style.display = "block";
        
        document.getElementById("ending4-continue1").addEventListener("click", function() {
            document.getElementById("ending4-screen1").style.display = "none";
            document.getElementById("ending4-screen2").style.display = "block";
        });

        document.getElementById("ending4-continue2").addEventListener("click", function() {
            document.getElementById("ending4-screen2").style.display = "none";
            document.getElementById("ending4-screen3").style.display = "block";
        });

        document.getElementById("ending4-continue3").addEventListener("click", function() {
            document.getElementById("ending4-screen3").style.display = "none";
            document.getElementById("ending4-screen4").style.display = "block";
        });
    }

    function ending5() {
        document.getElementById("ending5-screen1").style.display = "block";
        
        document.getElementById("ending5-continue1").addEventListener("click", function() {
            document.getElementById("ending5-screen1").style.display = "none";
            document.getElementById("ending5-screen2").style.display = "block";
        });

        document.getElementById("ending5-continue2").addEventListener("click", function() {
            document.getElementById("ending5-screen2").style.display = "none";
            document.getElementById("ending5-screen3").style.display = "block";
        });
    }

    function restoreStamina() {
        stamina = 10;
        document.getElementById("main-game").style.display = "none";
        hideAllEventScreens();
        document.getElementById("restore-stamina").style.display = "block";
        document.getElementById("stamina-continue").addEventListener("click", function() {
            hideAllEventScreens(); // Call the function to hide all event screens
            document.getElementById("main-game").style.display = "block";
        });
    }

    function hanselEvent1(){
        document.getElementById("main-game").style.display = "none";
        hideAllEventScreens();
        document.getElementById("hansel-event1").style.display = "block";
        document.getElementById("hansel-event1-continue").addEventListener("click", function() {
            hideAllEventScreens(); 
            document.getElementById("main-game").style.display = "block";
        });
    }

    function hanselEvent2(){
        document.getElementById("main-game").style.display = "none";
        hideAllEventScreens();
        document.getElementById("hansel-event2").style.display = "block";
        document.getElementById("hansel-event2-continue").addEventListener("click", function() {
            hansel += 10;
            hideAllEventScreens(); 
            document.getElementById("main-game").style.display = "block";
        });
    }

    function gretelEvent1(){
        document.getElementById("main-game").style.display = "none";
        hideAllEventScreens();
        document.getElementById("gretel-event1").style.display = "block";
        document.getElementById("gretel-event1-continue").addEventListener("click", function() {
            hideAllEventScreens(); 
            document.getElementById("main-game").style.display = "block";
        });
    }

    function gretelEvent2(){
        document.getElementById("main-game").style.display = "none";
        hideAllEventScreens();
        document.getElementById("gretel-event2").style.display = "block";
        document.getElementById("gretel-event2-continue").addEventListener("click", function() {
            gretel += 10;
            hideAllEventScreens(); 
            document.getElementById("main-game").style.display = "block";
        });
    }

    function gretelEvent3(){
        document.getElementById("main-game").style.display = "none";
        hideAllEventScreens();
        document.getElementById("gretel-event3").style.display = "block";
        document.getElementById("gretel-event3-continue").addEventListener("click", function() {
            gretel += 10;
            stamina -= 10;
            hideAllEventScreens(); 
            document.getElementById("main-game").style.display = "block";
        });
    }

    function goldEvent(){
        document.getElementById("main-game").style.display = "none";
        hideAllEventScreens();
        document.getElementById("gold-event").style.display = "block";
        document.getElementById("gold-event-continue").addEventListener("click", function() {
            stamina -= 20;
            hideAllEventScreens(); 
            document.getElementById("main-game").style.display = "block";
        });
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
    function hideAllEndingScreens() {
        const eventScreens = document.querySelectorAll(".ending");
        eventScreens.forEach(screen => {
            screen.style.display = "none";
        });
    }

    // Function to hide all event screens
    function hideAllEventScreens() {
        const eventScreens = document.querySelectorAll(".non-main");
        eventScreens.forEach(screen => {
            screen.style.display = "none";
        });
    }

    // Function to update content
    function updateContent() {
        document.getElementById("current-month").textContent = `Month: ${months[currentMonthIndex]}`;
        document.getElementById("current-month-text").textContent = `${months[currentMonthIndex]}`;
        document.getElementById("stamina-text").textContent = `${stamina}`;
        document.getElementById("stamina-fill").style.width = `${stamina}%`;
        document.getElementById("hansel_trust").textContent = `Hansel's trust: ${hansel}`;
        document.getElementById("gretel_trust").textContent = `Gretel's trust: ${gretel}`;
        document.getElementById("gold").textContent = `Gold: ${gold}`;
    }
});