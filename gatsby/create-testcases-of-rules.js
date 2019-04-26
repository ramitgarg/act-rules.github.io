/**
 * Create test case files of each rule
 * -> create test cases files into `./public/testcases/`
 * -> copy `./test-assets/*` into `./public`
 * -> create `testcases.json` into `./public`
 */
const { ncp } = require('ncp')
const objectHash = require('object-hash')
const codeBlocks = require('gfm-code-blocks')
const {
  www: { url, baseDir }
} = require('./../package.json')
const createFile = require('./../build/create-file')
const getAllMatchesForRegex = require('./get-all-matches-for-regex')
const queries = require('./queries')
const regexps = require('./reg-exps')
const {
  createAllRulesTestcasesJson,
  createRuleTestcasesJsonForEmReportTool
} = require('./create-testcases-metadata')

const createTestcasesOfRules = options => {

  const { graphql } = options

  return graphql(queries.getAllRules).then(({ errors, data }) => {
    if (errors) {
      Promise.reject(errors)
    }

    let allTestcases = []

		/**
		 * iterate all rule pages
		 * -> get code snippets
		 * -> and their relevant titles
		 */
    const allRulePages = data.allMarkdownRemark.edges
    allRulePages.forEach(markdownPage => {
      const { node } = markdownPage
      const { rawMarkdownBody, frontmatter, fields } = node
      const { name } = frontmatter
      const { slug } = fields
      const codeTitles = getAllMatchesForRegex(
        regexps.testcaseTitle,
        rawMarkdownBody
      )
      const codeSnippets = codeBlocks(rawMarkdownBody)

      if (codeTitles.length !== codeSnippets.length) {
        throw new Error(
          `Number of matching titles for code snippets is wrong. Check markdown '${name}' for irregularities. Slug: '${slug}'`
        )
      }

			/**
			 * iterate each code snippet
			 * -> create a testcase file
			 * -> and add meta of testcase to `testcases.json`
			 */
      const ruleTestcases = codeSnippets.reduce((out, codeBlock, index) => {
        const title = codeTitles[index]
        if (!title) {
          throw new Error('No title found for code snippet.')
        }

        const { code, block } = codeBlock
        let { type = 'html' } = codeBlock

        if (regexps.testcaseCodeSnippetTypeIsSvg.test(block.substring(0, 15))) {
          type = 'svg'
        }

        const ruleId = slug.replace('rules/', '')
        const codeId = objectHash({
          block,
          type,
          ruleId
        })

        const titleCurated = title.value.split(' ').map(t => t.toLowerCase())

        // create testcases under directory for each rule.
        const testcaseFileName = `${ruleId}/${codeId}.${type}`
        const testcasePath = `testcases/${testcaseFileName}`

				/**
				 * Create testcase file
				 */
        createFile(`${baseDir}/${testcasePath}`, code)

				/**
				 * Create meta data for testcase(s)
				 */
        const testcase = {
          url: `${url}/${testcasePath}`,
          expected: titleCurated[0],
          ruleId,
          ruleName: name,
          rulePage: `${url}/${slug}`,
        }

        out.push(testcase)
        return out;
      }, [])

			/**
			 * append rule testcases to all testcases array
			 */
      allTestcases = allTestcases.concat(ruleTestcases)
    })

		/**
		 * Copy test-assets directory
		 */
    ncp('./test-assets', './public/test-assets', err => {
      console.info(`\n\n DONE!!! Copied Testcases Assets Directory.`)
      if (err) {
        throw new Error(err)
      }
    })

    /**
     * Create `testcases.json`
     */
    createAllRulesTestcasesJson(allTestcases)

    console.info(`\n\n DONE!!! Generated Test Cases Data.`)
  })
}

module.exports = createTestcasesOfRules