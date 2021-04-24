const superagent = require('superagent')
const jsdom = require('jsdom')
const {JSDOM} = jsdom
const jqueryFactory = require('jquery')
const turndown = new (require('turndown'))({headingStyle: 'atx'})
const recipe = 'https://gastronomiaycia.republica.com/2020/11/20/noquis-de-espinacas-con-chistorra-y-queso-azul-convierte-una-comida-sencilla-en-un-festival-de-sabores/'
const fs = require('fs-extra')
const path = require('path')
const dedent = require('dedent')

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
  const ingredientsTitle = $(content).find('h2:contains("Ingre")')
  const ingredients = ingredientsTitle.nextUntil('h2')
  ingredientsTitle[0].remove()
  ingredients[0].remove()
  const ingredientsContent = turndown.turndown(ingredients[0].innerHTML)
  const ingredientsTitleContent = ingredientsTitle[0].textContent
  const imageSrc = content.querySelector('img').src
  const recipeContent = turndown.turndown(content.innerHTML)

  const image = await superagent.get(imageSrc).buffer(true).parse(superagent.parse.image)
  console.log(image.body)

  await fs.writeFile(`./gastronomia${path.extname(imageSrc)}`, image.body)

  console.log(dedent`
    [title]: #()
  
    ##${title} 
    
    [img]: #()
    
    ![](../docs/imgs/)
    
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
  
  
  `)

}

