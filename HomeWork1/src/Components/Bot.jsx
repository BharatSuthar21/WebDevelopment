import React, { useEffect } from 'react';

function Bot({ message, handleBotResponse }) {
  const actions = [
    'COUNT_WORDS',
    'COUNT_VOWELS_CONSONANTS',
    'UPPERCASE',
    'LOWERCASE',
    'CAPITALIZE_WORDS',
    'COUNT_CHARACTERS',
    'REMOVE_VOWELS',
    'REMOVE_CONSONANTS'
  ];

  const botName = [
    'Kalu',
    'Lambu',
    'Bukhad',
    'Jaanu',
    'Jhamkudi',
  ]

  const performAction = () => {
    const randomAction = actions[Math.floor(Math.random() * actions.length)];
    const name = botName[Math.floor(Math.random() * actions.length)];
    let response = "";

    switch (randomAction) {
      case 'COUNT_WORDS':
        response = `Word Count: ${countWords(message)}`;
        break;
      case 'COUNT_VOWELS_CONSONANTS':
        const { vowels, consonants } = countVowelsAndConsonants(message);
        response = `Vowels: ${vowels}, Consonants: ${consonants}`;
        break;
      case 'UPPERCASE':
        response = message.toUpperCase();
        break;
      case 'LOWERCASE':
        response = message.toLowerCase();
        break;
      case 'CAPITALIZE_WORDS':
        response = capitalizeWords(message);
        break;
      case 'COUNT_CHARACTERS':
        response = `Character Count: ${message.length}`;
        break;
      case 'REMOVE_VOWELS':
        response = removeVowels(message);
        break;
      case 'REMOVE_CONSONANTS':
        response = removeConsonants(message);
        break;
      default:
        response = "Unknown action!";
    }
    const obj = {botName:name, botResponse:response}

    handleBotResponse(obj);
  };

  const countWords = (text) => text.trim() === "" ? 0 : text.trim().split(/\s+/).length;


  const countVowelsAndConsonants = (text) => {
    let vowelsCount = 0, consonantsCount = 0;
    const vowels = 'aeiouAEIOU';
    for (let char of text) {
      if (vowels.includes(char)) vowelsCount++;
      else if (/[a-zA-Z]/.test(char)) consonantsCount++;
    }
    return { vowels: vowelsCount, consonants: consonantsCount };
  };

  const capitalizeWords = (text) => text.replace(/\b\w/g, char => char.toUpperCase());
  const removeVowels = (text) => text.replace(/[aeiouAEIOU]/g, "");
  const removeConsonants = (text) => text.replace(/[^aeiouAEIOU\s]/g, "");

  useEffect(() => {
    if (message) {
      performAction();
    }
  }, [message]);

  return null;
}

export default Bot;
