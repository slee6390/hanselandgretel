document.addEventListener("DOMContentLoaded", function() {
    // Initialize variables
    let currentMonthIndex = 1; 
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
    let restoreEventsOccur = false;
    let necessaryEventsOccur = false;

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

    hideAllEndingScreens();
    hideAllEventScreens();
    before_adoption();

    const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    // Add event listeners to the choice buttons
    document.getElementById("work").addEventListener("click", function() {
        playerChoice("work");
    });

    document.getElementById("both").addEventListener("click", function() {
        playerChoice("both");
    });

    document.getElementById("hansel").addEventListener("click", function() {
        playerChoice("hansel");
    });

    document.getElementById("gretel").addEventListener("click", function() {
        playerChoice("gretel");
    });

    document.getElementById("rest").addEventListener("click", function() {
        playerChoice("rest"); 
    });

    // the player makes a choice --> update stamina, money, or other variables based on choice
    function playerChoice(choice) {
        console.log(stamina);
        if (stamina > 10 && gold > 10) {
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
            }
        }

        if (choice === "rest") {
            gold -= 50;
            stamina += 50;
            if (stamina > 100) {
                stamina = 100; 
            }
        }

        if (currentMonthIndex === 1) {
            month1(choice);
        } else if (currentMonthIndex === 13) {
            month12();
        } else {
            console.log("working");
            month2_11();
            currentMonthIndex++;
        }

        updateContent();
        restoreEventsOccur = false;
        necessaryEventsOccur = false;
    }

    // Function to show event scenarios
    function month1(choice) {
        document.getElementById("main-game").style.display = "none";

        if (choice === "work") {
            document.getElementById("hansel-gretel-work").style.display = "block";
        } else {
            document.getElementById("hansel-gretel-rest").style.display = "block";
        }

        updateContent();

        document.querySelectorAll(".ending1").forEach(button => {
            button.addEventListener("click", function() {
                hideAllEventScreens(); 
                document.getElementById("ending1-screen").style.display = "block";
            }); 
        });

        // Add event listeners for continue buttons
        document.querySelectorAll(".continue").forEach(button => {
            button.addEventListener("click", function() {
                hideAllEventScreens();
                document.getElementById("continue-screen").style.display = "block";
                document.getElementById("continue-continue").addEventListener("click", function() {
                    hideAllEventScreens();
                    document.getElementById("main-game").style.display = "block";
                    adoption();
                    currentMonthIndex++;
                    updateMonth();
                });
            });
        });
    }

    function month2_11() {
        if (gold <= 0) {
            restoreGold();
            restoreEventsOccur = true;
            console.log("gold restore");
        }

        if (stamina <= 10) {
            restoreStamina();
            restoreEventsOccur = true;
            console.log("stamina restore");
        }

        if (hanselEvent1Occur === false && hansel > 40) {
            hanselEvent1();
            hanselEvent1Occur = true;
            necessaryEventsOccur = true;
            console.log("hansel1");
        }

        if (hanselEvent2Occur === false && hansel > 20) {
            hanselEvent2();
            hanselEvent2Occur = true;
            necessaryEventsOccur = true;
            console.log("hansel2");
        }

        if (gretelEvent1Occur === false && gretel > 40) {
            gretelEvent1();
            gretelEvent1Occur = true;
            necessaryEventsOccur = true;
            console.log("gretel1");
        }

        if (gretelEvent2Occur === false && gretel > 20) {
            gretelEvent2();
            gretelEvent2Occur = true;
            necessaryEventsOccur = true;
            console.log("gretel2");
        }

        if (restoreEventsOccur === false && necessaryEventsOccur === false) {
            if (currentMonthIndex > 1 && gold < 150 && Math.random() < 0.8) {
                goldEvent();
                console.log("gold, special");
            } else if (currentMonthIndex > 1 && gretelEvent3Occur === false && gretel < 20 && Math.random() < 0.8) {
                gretelEvent3();
                gretelEvent3Occur = true;
                console.log("gretel3, special");
            } else if (currentMonthIndex > 1 && stepmotherEventOccur == false && Math.random() < 0.5) {
                stepmotherEvent();
                stepmotherEventOccur = true;
                console.log("stepmother, special");
            } else {
                updateMonth();
            }
        }
    }

    function month12() {
        document.getElementById("main-game").style.display = "none";
        document.getElementById("ending-intro-screen").style.display = "block";
        document.getElementById("ending-continue").addEventListener("click", function() {
            document.getElementById("ending-intro-screen").style.display = "none";
            if (hansel >= 80 && gretel >= 80) {
                ending2();
            } else if (hansel >= 80 && gretel < 80) {
                ending3();
            } else if (hansel < 80 && gretel >= 80) {
                ending4();
            } else {
                ending5();
            } 
        });
    }

    function restoreGold() {
        gold = 100;
        document.getElementById("main-game").style.display = "none";
        document.getElementById("restore-gold").style.display = "block";
        document.getElementById("gold-continue").addEventListener("click", function() {
            hideAllEventScreens(); 
            document.getElementById("main-game").style.display = "block";
            updateMonth();
        });
    }

    function restoreStamina() {
        stamina = 10;
        document.getElementById("main-game").style.display = "none";
        document.getElementById("restore-stamina").style.display = "block";
        document.getElementById("stamina-continue").addEventListener("click", function() {
            hideAllEventScreens(); 
            document.getElementById("main-game").style.display = "block";
            updateMonth();
        });
    }

    function hanselEvent1(){
        document.getElementById("main-game").style.display = "none";
        document.getElementById("hansel-event1").style.display = "block";
        document.getElementById("hansel-event1-continue").addEventListener("click", function() {
            hideAllEventScreens(); 
            document.getElementById("main-game").style.display = "block";
            updateMonth();
        });
    }

    function hanselEvent2(){
        document.getElementById("main-game").style.display = "none";
        document.getElementById("hansel-event2").style.display = "block";
        document.getElementById("hansel-event2-continue").addEventListener("click", function() {
            hideAllEventScreens(); 
            hansel += 10;
            document.getElementById("main-game").style.display = "block";
            updateMonth();
        });
    }

    function gretelEvent1(){
        document.getElementById("main-game").style.display = "none";
        document.getElementById("gretel-event1").style.display = "block";
        document.getElementById("gretel-event1-continue").addEventListener("click", function() {
            hideAllEventScreens(); 
            document.getElementById("main-game").style.display = "block";
            updateMonth();
        });
    }

    function gretelEvent2(){
        document.getElementById("main-game").style.display = "none";
        document.getElementById("gretel-event2").style.display = "block";
        document.getElementById("gretel-event2-continue").addEventListener("click", function() {
            gretel += 10;
            hideAllEventScreens(); 
            document.getElementById("main-game").style.display = "block";
            updateMonth();
        });
    }

    function gretelEvent3(){
        document.getElementById("main-game").style.display = "none";
        document.getElementById("gretel-event3").style.display = "block";
        document.getElementById("gretel-event3-continue").addEventListener("click", function() {
            gretel += 10;
            hideAllEventScreens(); 
            document.getElementById("main-game").style.display = "block";
            updateMonth();
        });
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

        const stepmotherContinue = document.querySelectorAll(".stepmother-continue");
        stepmotherContinue.forEach(button => {
            button.addEventListener("click", function() {
                hideAllEventScreens(); 
                document.getElementById("main-game").style.display = "block";
                updateMonth();
            });
        });
    }

    function goldEvent(){
        document.getElementById("main-game").style.display = "none";
        hansel -= 10;
        gretel -= 10;
        
        document.getElementById("gold-event1").style.display = "block";

        document.getElementById("gold-event-continue1").addEventListener("click", function() {
            document.getElementById("gold-event1").style.display = "none";
            document.getElementById("gold-event2").style.display = "block";
        });

        document.getElementById("gold-event-continue2").addEventListener("click", function() {
            document.getElementById("gold-event2").style.display = "none";
            document.getElementById("gold-event3").style.display = "block";
        });

        document.getElementById("gold-event-continue3").addEventListener("click", function() {
            document.getElementById("gold-event3").style.display = "none";
            document.getElementById("gold-event4").style.display = "block";
        });

        document.getElementById("gold-event-continue4").addEventListener("click", function() {
            document.getElementById("gold-event4").style.display = "none";
            document.getElementById("main-game").style.display = "block";
            updateMonth();
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

    // Function to update month
    function updateMonth() {
        document.getElementById("current-month").textContent = `Month: ${months[currentMonthIndex]}`;
        document.getElementById("current-month-text").textContent = `${months[currentMonthIndex]}`;
    }

    // Function to update content
    function updateContent() {
        document.getElementById("stamina-text").textContent = `${stamina}`;
        document.getElementById("stamina-fill").style.width = `${stamina}%`;
        document.getElementById("hansel_trust").textContent = `Hansel's trust: ${hansel}`;
        document.getElementById("gretel_trust").textContent = `Gretel's trust: ${gretel}`;
        document.getElementById("gold").textContent = `Gold: ${gold}`;
    }
});