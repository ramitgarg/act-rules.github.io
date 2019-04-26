const {
  www: { url, baseDir },
  name: pkgName,
  description,
} = require('./../package.json')
const createFile = require('./../build/create-file')

/**
 * Create `testcases.json`
 */
const createAllRulesTestcasesJson = data => {
  const testcasesData = {
    name: `${pkgName} test cases`,
    website: url,
    license: `${url}/pages/license/`,
    description,
    count: data.length,
    testcases: data,
  }

  createFile(
    `${baseDir}/testcases.json`,
    JSON.stringify(testcasesData, undefined, 2)
  )
}


const createRuleTestcasesJsonForEmReportTool = options => {

}

module.exports = {
  createAllRulesTestcasesJson
}