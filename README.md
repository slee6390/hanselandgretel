# Hansel and Gretel
#### Video Demo: https://youtu.be/6tQ5sZyvGzQ
#### Description

##### Overview:
This project is a text-based create your own adventure style game that was inspired from the Hansel and Gretel fairytale. The player will able to make different choices as the witch to decide the outcome of the game. The game is divided into two parts: the tutorial and the main game.

##### Tutorial:
The tutorial first takes the player through some choices (work and rest) and what effect these choices have on their stamina and gold. Each new "page" was separated into different HTML pages for the tutorial and each has a javascript code embedded into the HTML file, as the tutorial required minimal javascript. The HTML pages were labeled from 1 to 5 according to their positioning within the story. The files that do not follow this convention (e.g. 2_rest.html) are files that are based on different choices that the player can make. All choices are made via pressing on buttons on the screen. All tutorial html files are linked to the main styles.css file, so that the style is uniform throughout both the tutorial and the main game.

##### Main Game:
Once the player chooses the "continue" button on 5.html, they are brought to main.html, where the main part of the game is played. All 12 months of the main game are played in the same file and is linked to one master javascript file as it requires global variables like stamina, gold, and different trust levels of the children. Each choice differentially updates the stamina, gold, hansel's trust, and gretel's trust levels. All contents of the game belong in a div called "emulator-screen" so that the game is played out in a emulator-styled screen.

The file main.html contains all possible scenarios. The most basic div element contains the basic screen that shows the month, gold, and stamina bar with displayed options for that month. If the player decides to bring in the children in Month 1, the player is presented with additional options (e.g. "Spend time with both children") starting in Month 2. 

In addition to this basic screen, the main.html file also contains div elements for each special event that could occur. Some special events are completely random, while other special events occur when a specific threshold is reached for the gold, stamina, Hansel's trust, and/or Gretel's trust level.

At Month 12, the player is invited to see the ending based on Hansel and Gretel's trust levels. This still lives in the same main.html file and are simply nested within separate div elements.