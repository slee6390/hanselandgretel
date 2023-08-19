<script>

    document.addEventListener("DOMContentLoaded", function() {
        const choice1Button = document.getElementById("choice1")
        const choice2Button = document.getElementById("choice2")
        const choice3Button = document.getElementById("choice3")
        const choice4Button = document.getElementById("choice4")
        const choice5Button = document.getElementById("choice5")
        const monthText = document.getElementById("month")

        let currentWeek = 1

        function updateWeek() {
            monthText.textContent = currentMonth
        }
        
        function handleChoice(choice) {
            resultText.textContent = `You chose ${choice}. This affects your character's development in Month ${currentMonth}.`
        }
        choice1Button.addEventListener("click", function() {
            handleChoice("Option 1")
        })

        choice2Button.addEventListener("click", function() {
            handleChoice("Option 2")
        })

        choice3Button.addEventListener("click", function() {
            handleChoice("Option 3")
        })

        choice4Button.addEventListener("click", function() {
            handleChoice("Option 4")
        })

        choice5Button.addEventListener("click", function() {
            handleChoice("Option 5")
        })

        // Update the week and content for the next week
        function goToNextMonth() {
            currentMonth++
            updateMonth()
            resultText.textContent = ""
        }

        // Trigger the next week after a choice is made
        choice1Button.addEventListener("click", goToNextMonth)
        choice2Button.addEventListener("click", goToNextMonth)

        // Initialize the week display
        updateMonth()
    })
</script>


