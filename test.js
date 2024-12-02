let testString = "Merge pull request #7 from dexlens/BEVM\n\nadd projectjson";
let projectName = testString.match(/from dexlens\/(.*?)\n\n/)[1];
console.log(projectName); // Output: BEVM