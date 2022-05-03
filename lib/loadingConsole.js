/**
 * Create and display a loader in the console.
 *
 * @param {string} [text=""] Text to display after loader
 * @param {array.<string>} [chars=["⠙", "⠘", "⠰", "⠴", "⠤", "⠦", "⠆", "⠃", "⠋", "⠉"]]
 * Array of characters representing loader steps
 * @param {number} [delay=100] Delay in ms between loader steps
 * @example
 * let loader = loadingConsole("Loading…");
 *
 * //Stop loader after 1 second
 * setTimeout(() => clearInterval(loader), 1000);
 * @returns {number} An interval that can be cleared to stop the animation
 */

function loadingConsole(
  text = "",
  p = ["⠙", "⠘", "⠰", "⠴", "⠤", "⠦", "⠆", "⠃", "⠋", "⠉"],
  delay = 100
) {
  let x = 0;

  return setInterval(() => {
    process.stdout.write(`\r${p[x++]} ${text}`);
    x %= p.length;
  }, delay);
}

module.exports = loadingConsole;
