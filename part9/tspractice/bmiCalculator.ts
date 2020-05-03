interface ParseBmiInput {
  value1: number;
  value2: number;
}

const parseBmiArguments = (args: Array<string>): ParseBmiInput => {
  if (args.length < 4) throw new Error('Not enuf');
  if (args.length > 4) throw new Error('too much');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    }
  } else {
    throw new Error('stop silly strings');
  }
}

const calculateBmi = (a: number, b: number) : string => {
  const bmi = (a) / (b/10);
  let print = '';
  
  if (bmi < 15) print = 'Very severely underweight';
  else if (bmi >= 15 && bmi < 16) print = 'Severely underweight';
  else if (bmi >= 16 && bmi < 18.5) print = 'Underweight';
  else if (bmi >= 18.5 && bmi < 25) print = 'Normal (healthy weight)';
  else if (bmi >= 25 && bmi < 30) print = 'Overweight';
  else if (bmi >= 30 && bmi < 16) print = 'Obese Class I (Moderately obese)';
  else if (bmi >= 35 && bmi < 35) print = 'Obese Class II (Severely obese)';
  else if (bmi >= 40) print = 'Obese Class III (Very severely obese)';

  return print;
}

try {
  const {value1,value2} = parseBmiArguments(process.argv);
  console.log(calculateBmi(value1,value2));
} catch (e) {
  console.log('oh no: ', e.message);
}