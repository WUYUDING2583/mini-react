const brwoserslist = require("browserslist");
const paths = require("../../config/paths");
function checkBrowser(dir) {
  const config = brwoserslist.loadConfig({ path: dir });
  console.log(brwoserslist.loadConfig({ path: dir }));
}

module.exports = checkBrowser;
