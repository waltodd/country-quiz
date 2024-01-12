export const fetchData = async() => {
  
  async function fetchCountryData() {
    let response = await fetch(`https://restcountries.com/v3.1/all`);
    const data = await response.json();

    return data

  }
  function generateRandomIndexes(length) {
    const indexes = [];
    while (indexes.length < 4) {
      const randomIndex = Math.floor(Math.random() * length);
      if (!indexes.includes(randomIndex)) {
        indexes.push(randomIndex);
      }
    }
    return indexes;
  }

  function generateRandomOptions(countries, correctIndex) {
    const options = [];
    const allIndexes = generateRandomIndexes(countries.length);

    // Ensure the correct answer is included
    if (!allIndexes.includes(correctIndex)) {
      const randomIndex = Math.floor(Math.random() * allIndexes.length);
      allIndexes[randomIndex] = correctIndex;
    }

    // Exclude the correct answer from the list of options
    const filteredIndexes = allIndexes.filter(index => index !== correctIndex);

    // Shuffle the indexes to randomize the order
    const shuffledIndexes = filteredIndexes.sort(() => Math.random() - 0.5);

    for (let i = 0; i < 4; i++) {
      const index = shuffledIndexes[i];
      const isCorrect = i === 3 && index === correctIndex;

      // Check if 'name' property is defined before accessing 'countries[index].name.common'
      const answerText = countries[index]?.name?.common || "N/A";

      options.push({ answerText, isCorrect });
    }

    return options;
  }



  function generateRandomOptions(countries, correctIndex) {
    const options = [];
    const randomIndexes = generateRandomIndexes(countries.length);

    // Ensure at least one correct answer
    const correctAnswerText = countries[correctIndex].name.common;

    options.push({ answerText: correctAnswerText, isCorrect: true });

    for (let i = 1; i < 4; i++) {
        const index = randomIndexes[i - 1];
        const answerText = (countries[index].name.common !== 'N/A') ? countries[index].name.common : countries[index].capital;

        options.push({ answerText, isCorrect: false });
    }

    // Shuffle the options to randomize their order
    options.sort(() => Math.random() - 0.5);

    return options;
}

  function generateCapitalAndFlagQuestionsWithAnswers(countries) {
    const questionsWithAnswers = [];

    for (let i = 0; i < 5; i++) {
        const countryIndex = Math.floor(Math.random() * countries.length);
        const country = countries[countryIndex];

        // Generating a question about the capital
        const capitalQuestion = {
            questionText: `Which country is ${country.capital} the capital of?`,
            answerOptions: generateRandomOptions(countries, countryIndex),
        };

        // Generating a question about the flag
        const flagQuestion = {
            questionText: `Which country does this flag ${country.flag} belong to?`,
            answerOptions: generateRandomOptions(countries, countryIndex),
        };

        questionsWithAnswers.push(capitalQuestion, flagQuestion);
    }

    return questionsWithAnswers;
}
const countriesData = await fetchCountryData()
    const capitalAndFlagQuestions = generateCapitalAndFlagQuestionsWithAnswers(countriesData);
};