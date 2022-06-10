const chalk = require("chalk");
const fs = require("fs");
function checkRequiredFiles(...files) {
  try {
    files.forEach((file) => {
      fs.accessSync(file, fs.constants.F_OK);
    });
    return true;
  } catch (err) {
    console.log(chalk(err));
    return false;
  }
}

module.exports = checkRequiredFiles;
