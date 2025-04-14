# Find the Differences Game

This is a simple web-based "Find the Differences" game built using HTML, CSS, and JavaScript. Players need to find and click the differences between two images before the timer runs out!

## Live Demo
You can play the game live on [Vercel](https://your-vercel-link-here).

## GitHub Repository
The source code for this game can be found on GitHub: [Find the Differences Game GitHub](https://github.com/yourusername/find-the-differences-game).

## Instructions to Play the Game

1. **Start the Game:**
   - Open the `index.html` file in a web browser to launch the game.

2. **Gameplay:**
   - You will be presented with two images side by side.
   - Your goal is to find the differences between the two images.
   - Click on areas of the second image (right side) where you think the differences are.

3. **Correct and Incorrect Clicks:**
   - A green marker will appear at the spot you clicked if you find a correct difference.
   - If the click is incorrect, a "Wrong!" message will briefly appear.

4. **Timer:**
   - The game has a timer that tracks how long it takes you to find all the differences.
   - Once all differences are found, a success message will appear with the time it took.

5. **Reset the Game:**
   - Click the "Reset Game" button to restart the level and reset the timer.

## Technologies Used
- **HTML** for structuring the game.
- **CSS** for styling the images and game layout.
- **JavaScript** for game functionality (click handling, timer, etc.).
- **JSON** for storing the configuration (image paths and differences).

## How the Game Uses the JSON File
The game loads the differences and images dynamically from the `config.json` file. The JSON file contains:
- The paths to the two images (`image1` and `image2`).
- The coordinates of the differences between the two images.
The game reads these values to highlight the differences and handle player clicks.

## To Contribute
1. Fork the repository.
2. Clone your fork to your local machine.
3. Make your changes and improvements.
4. Create a pull request to submit your contributions.

## License
This project is open-source and available under the MIT License.

