// https://www.horadecodar.com.br/2021/05/10/como-embaralhar-um-array-em-javascript-shuffle/

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const shuffleAlternatives = (object) => {
  let alternatives = object.incorrect_answers.map((answer) => ({
    answer,
    isCorrectAnswer: false,
    difficulty: object.difficulty,
  }));

  alternatives = [...alternatives, {
    answer: object.correct_answer,
    isCorrectAnswer: true,
    difficulty: object.difficulty }];

  return alternatives;
};

export { shuffleArray, shuffleAlternatives };
