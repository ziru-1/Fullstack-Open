interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const parseExerciseArguments = (args: string[]) => {
  if (args.length < 4) {
    throw new Error('Not enough arguments')
  }

  const target = Number(args[2])
  const dailyHours = args.slice(3).map(Number)

  if (isNaN(target)) {
    throw new Error('Target value must be a number')
  }

  if (dailyHours.some(isNaN)) {
    throw new Error('All daily exercise values must be numbers')
  }

  return {
    target,
    dailyHours,
  }
}

const calculateExercises = (
  dailyExerciseHours: number[],
  targetDailyHours: number,
): Result => {
  const periodLength = dailyExerciseHours.length
  const trainingDays = dailyExerciseHours.filter((hours) => hours > 0).length
  const average =
    dailyExerciseHours.reduce((sum, val) => sum + val, 0) /
    dailyExerciseHours.length
  const success = average >= targetDailyHours

  let rating: 1 | 2 | 3
  let ratingDescription: string
  if (average < targetDailyHours * 0.75) {
    rating = 1
    ratingDescription = 'you did not even try with the training'
  } else if (average < targetDailyHours) {
    rating = 2
    ratingDescription = 'not too bad but could be better'
  } else {
    rating = 3
    ratingDescription = 'good, you completed the training'
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: targetDailyHours,
    average,
  }
}

try {
  const { target, dailyHours } = parseExerciseArguments(process.argv)
  const result = calculateExercises(dailyHours, target)
  console.log(result)
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log('Error:', error.message)
  }
}
