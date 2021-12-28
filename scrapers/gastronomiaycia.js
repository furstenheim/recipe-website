const superagent = require('superagent')
const jsdom = require('jsdom')
const {JSDOM} = jsdom
const jqueryFactory = require('jquery')
const turndown = new (require('turndown'))({headingStyle: 'atx'})
const recipeName = 'Melanzane alla parmigiana'
const recipe = 'https://gastronomiaycia.republica.com/2008/08/18/melanzane-alla-parmigiana/'
const fs = require('fs-extra')
const path = require('path')
const dedent = require('dedent')
const _ = require('lodash')
main()
  .then(function () {
    console.log('success')
    process.exit(0)
  }, function (err) {
    console.error(err)
    process.exit(1)
  })

async function main () {
  const result = await superagent.get(recipe)
  const dom = new JSDOM(result.text)
  const $ = jqueryFactory(dom.window)
  const content = dom.window.document.querySelector('.entry-content')
  const title = dom.window.document.querySelector('h1.entry-title').textContent
  const ingredientsTitle = $(content).find('h3:contains("Ingre"), h2:contains("Ingre")')
  const ingredients = ingredientsTitle.nextUntil('h3')
  ingredientsTitle[0].remove()
  ingredients[0].remove()
  const ingredientsContent = turndown.turndown(ingredients[0].innerHTML)
  const ingredientsTitleContent = ingredientsTitle[0].textContent
  const imageSrc = content.querySelector('img').src
  const recipeContent = turndown.turndown(content.innerHTML)

  const image = await superagent.get(imageSrc).buffer(true).parse(superagent.parse.image)
  const imageDir = await fs.readdir('../docs/imgs')
  const latestImage = _.last(_.sortBy(imageDir))
  const number = parseInt(latestImage.substr(0, 4)) + 1
  const fileName = _.padStart(number, 4, '0') + '-' + _.kebabCase(recipeName)
  await fs.writeFile(`../docs/imgs/${fileName}.${path.extname(imageSrc)}`, image.body)

  const markdownContent = dedent`
    [title]: #()
  
    ## ${title} 
    
    [img]: #()
    
    ![](../docs/imgs/${fileName}.${path.extname(imageSrc)})
    
    [#url]:#()
    
    [](${recipe})
    
    [recipe-time]: #()
    
    PreviousDay: false
    
    TotalTime: 
    
    CookingTime: 
    
    [ingredients-content]: #()
    
    ### ${ingredientsTitleContent}
    ${ingredientsContent}
    
    [content]: #()
  
    ${recipeContent}
  
  
  `
  await fs.writeFile(`../recipes/${fileName}.md`, markdownContent)

}

