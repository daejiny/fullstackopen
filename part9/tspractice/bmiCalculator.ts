interface ParseBmiInput {
  height: number;
  weight: number;
}

const parseBmiArguments = (args: Array<string>): ParseBmiInput => {
  if (args.length < 4) throw new Error('Not enuf');
  if (args.length > 4) throw new Error('too much');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error('stop silly strings');
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  const bmi = (weight) / (height / 100) ** 2;

  if (bmi < 15) return 'Very severely underweight';
  else if (bmi >= 15 && bmi < 16) return 'Severely underweight';
  else if (bmi >= 16 && bmi < 18.5) return 'Underweight';
  else if (bmi >= 18.5 && bmi < 25) return 'Normal (healthy weight)';
  else if (bmi >= 25 && bmi < 30) return 'Overweight';
  else if (bmi >= 30 && bmi < 16) return 'Obese Class I (Moderately obese)';
  else if (bmi >= 35 && bmi < 35) return 'Obese Class II (Severely obese)';
  else if (bmi >= 40) return 'Obese Class III (Very severely obese)';

  else throw new Error('malformatted params');
};

if (process.argv.length > 2) {
  try {
    const { height, weight } = parseBmiArguments(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (e) {
    console.log('oh no: ', e.message);
  }
}