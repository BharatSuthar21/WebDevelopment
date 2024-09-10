import React, { useEffect } from 'react';

function Bot({ input, onResponse }) {
  // Available bot actions
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

  // Randomly select an action and perform it
  const performAction = () => {
    const randomAction = actions[Math.floor(Math.random() * actions.length)];
    let response = "";
    
    switch (randomAction) {
      case 'COUNT_WORDS':
        response = `Word Count: ${countWords(input)}`;
        break;
      case 'COUNT_VOWELS_CONSONANTS':
        const { vowels, consonants } = countVowelsAndConsonants(input);
        response = `Vowels: ${vowels}, Consonants: ${consonants}`;
        break;
      case 'UPPERCASE':
        response = input.toUpperCase();
        break;
      case 'LOWERCASE':
        response = input.toLowerCase();
        break;
      case 'CAPITALIZE_WORDS':
        response = capitalizeWords(input);
        break;
      case 'COUNT_CHARACTERS':
        response = `Character Count: ${input.length}`;
        break;
      case 'REMOVE_VOWELS':
        response = removeVowels(input);
        break;
      case 'REMOVE_CONSONANTS':
        response = removeConsonants(input);
        break;
      default:
        response = "Unknown action!";
    }

    // Send the response back to App component
    onResponse(response);
  };

  // Helper functions for the bot's operations
  const countWords = (text) => text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

  const countVowelsAndConsonants = (text) => {
    let vowelsCount = 0, consonantsCount = 0;
    const vowels = 'aeiouAEIOU';

    for (let char of text) {
      if (vowels.includes(char)) {
        vowelsCount++;
      } else if (/[a-zA-Z]/.test(char)) {
        consonantsCount++;
      }
    }
    return { vowels: vowelsCount, consonants: consonantsCount };
  };

  const capitalizeWords = (text) => text.replace(/\b\w/g, char => char.toUpperCase());
  const removeVowels = (text) => text.replace(/[aeiouAEIOU]/g, "");
  const removeConsonants = (text) => text.replace(/[^aeiouAEIOU\s]/g, "");

  // Trigger the bot action when input changes
  useEffect(() => {
    if (input) {
      performAction();  // Perform the bot action
    }
  }, [input]);

  return null;  // Bot component doesn't need to render anything
}

export default Bot;
