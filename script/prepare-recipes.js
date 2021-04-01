const fs = require('fs-extra')
const path = require('path')
const _ = require('lodash')
process.chdir(__dirname)
const utils = require('./utils')
main()
  .then(function (res) {
    process.exit(0)
  }, function (err) {
    console.error(err)
    process.exit(1)
  })

const parsers = {
  'recipe-time': utils.parseRecipeTimes
}

async function main () {
  const recipes = await fs.readdir('../recipes')
  const parsedRecipes = []
  for (const recipeName of recipes) {
    const recipe = await fs.readFile(path.join('../recipes', recipeName))
    const splitRecipe = recipe.toString().split(/\[(.*)\]: # ?\(\)/)

    if (splitRecipe[0]) {
      console.error('Recipe should start with tag it starts with: ', splitRecipe[0])
      throw new Error('Unexpected start')
    }

    const pairs = _.chunk(splitRecipe.slice(1), 2)
    const id = recipeName.replace('.md', '')
    const parsedRecipe = {
      id
    }

    const headers = getHeaders()
    for (const pair of pairs) {
      const header = pair[0]
      if (!headers[header]) {
        throw new Error(`Unknown header ${header}`)
      }
      const content = pair[1]
      const imagesReplaced = _.trim(content.replace('../docs/imgs', 'imgs'))
      if (parsers[header]) {
        parsedRecipe[_.camelCase(header)] = parsers[header](imagesReplaced)
      } else {
        parsedRecipe[_.camelCase(header)] = imagesReplaced
      }
      headers[header].used = true
    }
    _.forEach(headers, function (headerConfig, headerKey) {
      if (headerConfig.required && !headerConfig.used) {
        console.log(headerConfig)
        throw new Error(`Missing header ${headerKey}`)
      }
    })
    parsedRecipes.push(parsedRecipe)
    await fs.writeJson(`../docs/recipes/${id}.json`, parsedRecipe)
  }
  const summary = _.map(parsedRecipes, r => _.pick(r, ['img', 'id', 'title']))
  await fs.writeJson('../docs/recipes.json', summary)
}


function getHeaders () {
  return {
    title: { required: true },
    url: { required: false },
    img: { required: false },
    'recipe-time': { required: true },
    'ingredients-content': { required: true },
    content: { required: true }
  }
}
