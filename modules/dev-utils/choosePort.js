const detect = require("detect-port-alt");
const prompts = require("prompts");
const chalk = require("chalk");

async function choosePort(DEFAULT_PORT, HOST, isInteractive) {
  // detect port
  return detect(DEFAULT_PORT, HOST)
    .then(async (port) => {
      if (port !== DEFAULT_PORT && isInteractive) {
        // switch port
        const question = {
          type: "confirm",
          name: "shouldChangePort",
          message:
            chalk.yellow(`${DEFAULT_PORT} is occupied.`) +
            "\n\nWould you like to run the app on the another port instead?",
        };
        const { shouldChangePort } = await prompts(question);
        if (!shouldChangePort) {
          process.exit(1);
        }
      }
      return Promise.resolve(port);
    })
    .catch((err) => {
      console.log(chalk.red("All ports are occpuied."));
      console.log(err);
      process.exit(1);
    });
}
module.exports = choosePort;
