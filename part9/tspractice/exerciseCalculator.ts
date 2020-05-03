interface ParseExerciseInput {
  schedule: Array<number>;
  target: number;
}

const parseExerciseArguments = (args: Array<string>): ParseExerciseInput => {
  if (args.length < 4) throw new Error('Not enuf');

  const schedule = args
    .slice(3, args.length)
    .map(arg => {
      if (!isNaN(Number(arg))) return Number(arg);
      else throw new Error('stop silly strings');
    })
  let target = 0;
  if (!isNaN(Number(args[2]))) target = Number(args[2]);
  
  return {
    schedule,
    target
  }
}

interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: String,
  target: number,
  average: number
}

const calculateExercises = (schedule: Array<number>, target: number): Result => {
  const periodLength = schedule.length;
  const trainingDays = schedule.filter(hours => hours > 0).length;
  const average = schedule.reduce((acc, hours) => acc + hours, 0) / periodLength;
  const success = average >= target ? true : false;
  const diff = average - target;
  const rating = function () {
    if (diff > 1) return 3;
    else if (diff < -1) return 1;
    else return 2;
  }();
  const ratingDescription = function () {
    switch (rating) {
      case 3:
        return 'hehe doing good'
      case 2:
        return 'meh'
      case 1:
        return 'cmon wtf'
      default:
        return 'idk lol'
    }
  }();
  return {
    periodLength,
    trainingDays,
    average,
    success,
    rating,
    ratingDescription,
    target
  }
}

try {
  const { schedule, target } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(schedule, target));
} catch (e) {
  console.log('oh no: ', e.message);
}