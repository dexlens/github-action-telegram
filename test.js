let testString = "Merge pull request #3 from dexlens/testProjectImage";
// split it on / then get last element
let testProjectImage1 = testString.split("/").pop();
console.log(testProjectImage1);