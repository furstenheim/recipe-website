module.exports = { parseRecipeTimes }

function parseRecipeTimes (content) {
  const previousDay = content.match(/PreviousDay: (.*)/)
  const totalTime = content.match(/TotalTime: (.*)/)
  const cookingTime = content.match(/CookingTime: (.*)/)
  return {
    previousDay: previousDay && previousDay[1] === 'true',
    totalTime: (totalTime && totalTime[1]) || (cookingTime && cookingTime[1]) || 0,
    cookingTime: cookingTime && cookingTime[1]
  }
}

