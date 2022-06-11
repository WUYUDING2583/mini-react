const browserslist = require("browserslist");
const chalk = require("chalk");
const paths = require("../../config/paths");
const prompts = require("prompts");
const fs = require("fs");

const defaultBrowsers = {
  production: [">0.2%", "not dead", "not op_mini all"],
  development: [
    "last 1 chrome version",
    "last 1 firefox version",
    "last 1 safari version",
  ],
};

async function shouldSetBrowsers(isInteractive) {
  if (!isInteractive) return true;
  const question = {
    type: "confirm",
    name: "shouldSetBrowsers",
    message:
      chalk.yellow("We're unable to detect target browsers.") +
      `\n\nWould you like to add the default to your ${chalk.bold(
        "package.json"
      )}?`,
    initial: true,
  };
  return prompts(question).then(({ shouldSetBrowsers }) => shouldSetBrowsers);
}

async function checkBrowser(dir, isInteractive, retry = true) {
  // 1. load browserslist
  const config = browserslist.loadConfig({ path: dir });
  if (config) return Promise.resolve(config);
  if (retry) {
    // 2. should set browsers
    const shouldSet = await shouldSetBrowsers(isInteractive);
    if (shouldSet) {
      // 3. write default browsers to package.json
      const pkg = JSON.parse(fs.readFileSync(paths.appPackage, "utf-8"));
      pkg.browserslist = defaultBrowsers;
      fs.writeFileSync(paths.appPackage, JSON.stringify(pkg), "utf-8");
      //clean browserslist caches, otherwise it will return the last result.
      browserslist.clearCaches();
    }
    return checkBrowser(dir, isInteractive, false);
  } else {
    return Promise.reject(
      new Error("Cannot get browerslist conifg, please check.")
    );
  }
}

module.exports = checkBrowser;
