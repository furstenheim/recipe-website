const {expect} = require('chai')
const utils = require('./utils')
describe('parseRecipeTimes', function () {
  it('No previous day', function () {
    const text = `
PreviousDay: false

TotalTime: 20 min

CookingTime: 30 min
      `
    expect(utils.parseRecipeTimes(text)).deep.equal({
      previousDay: false,
      totalTime: '20 min',
      cookingTime: '30 min'
    })
  })

  it('previous day', function () {
    const text = `
PreviousDay: true

TotalTime: 20 min

CookingTime: 30 min
      `
    expect(utils.parseRecipeTimes(text)).deep.equal({
      previousDay: true,
      totalTime: '20 min',
      cookingTime: '30 min'
    })
  })
})
