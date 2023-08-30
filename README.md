# Hansel and Gretel
#### Video Demo: https://youtu.be/6tQ5sZyvGzQ
#### Description

##### Overview:
This project is a text-based create your own adventure style game that was inspired from the Hansel and Gretel fairytale. The player will able to make different choices as the witch to decide the outcome of the game. The game is divided into two parts: the tutorial and the main game.

##### Tutorial:
The tutorial first takes the player through some choices (work and rest) and what effect these choices have on their stamina and gold. Each new "page" was separated into different HTML pages for the tutorial and each has a javascript code embedded into the HTML file, as the tutorial required minimal javascript. The HTML pages were labeled from 1 to 5 according to their positioning within the story. The files that do not follow this convention (e.g. 2_rest.html) are files that are based on different choices that the player can make. All choices are made via pressing on buttons on the screen. All tutorial html files are linked to the main styles.css file, so that the style is uniform throughout both the tutorial and the main game.

##### Main Game:
Once the player chooses the "continue" button on 5.html, they are brought to main.html, where the main part of the game is played. All 12 months of the main game are played in the same file and is linked to one master javascript file as it requires global variables like stamina, gold, and different trust levels of the children. Each choice differentially updates the stamina, gold, hansel's trust, and gretel's trust levels.