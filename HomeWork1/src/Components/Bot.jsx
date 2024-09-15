import React, { useEffect } from 'react';

function Bot({ message, handleBotResponse }) {
  const actions = [
    'COUNT_WORDS',
    'COUNT_VOWELS_CONSONANTS',
    'MOST_FREQUENT_LETTER',
    'REVERSE_TEXT',
    'JUMBLE_WORDS',
    'UPPERCASE',
    'LOWERCASE',
    'CAPITALIZE_WORDS',
    'COUNT_CHARACTERS',
    'REMOVE_VOWELS',
    'REMOVE_CONSONANTS',
    'REPEAT_WORDS_TWICE',
    'REPLACE_SPACES_WITH_UNDERSCORES',
    'SHUFFLE_CHARACTERS_IN_WORDS',
  ];

  const botNames = [
    'HelperBot',
    'Kalu',
    'Lambu',
    'Bukhad',
    'Jaanu',
    'Jhamkudi',
  ];

  const performAction = () => {
    const randomAction = actions[Math.floor(Math.random() * actions.length)];
    const name = botNames[Math.floor(Math.random() * botNames.length)];
    let response = "";
    let transformation = "";

    switch (randomAction) {
      case 'COUNT_WORDS':
        response = `Word Count: ${countWords(message)}`;
        transformation = 'Word Count';
        break;
      case 'COUNT_VOWELS_CONSONANTS':
        const { vowels, consonants } = countVowelsAndConsonants(message);
        response = `Vowels: ${vowels}, Consonants: ${consonants}`;
        transformation = 'Counting Vowels and Consonants';
        break;
      case 'MOST_FREQUENT_LETTER':
        response = `Most Frequent Letter: ${mostFrequentLetter(message)}`;
        transformation = 'Finding Most Frequent Letter';
        break;
      case 'REVERSE_TEXT':
        response = reverseText(message);
        transformation = 'Reversing Text';
        break;
      case 'JUMBLE_WORDS':
        response = jumbleWords(message);
        transformation = 'Jumbling Words';
        break;
      case 'UPPERCASE':
        response = message.toUpperCase();
        transformation = 'Uppercase Conversion';
        break;
      case 'LOWERCASE':
        response = message.toLowerCase();
        transformation = 'Lowercase Conversion';
        break;
      case 'CAPITALIZE_WORDS':
        response = capitalizeWords(message);
        transformation = 'Capitalizing Words';
        break;
      case 'COUNT_CHARACTERS':
        response = `Character Count: ${message.length}`;
        transformation = 'Counting Characters';
        break;
      case 'REMOVE_VOWELS':
        response = removeVowels(message);
        transformation = 'Removing Vowels';
        break;
      case 'REMOVE_CONSONANTS':
        response = removeConsonants(message);
        transformation = 'Removing Consonants';
        break;
      case 'REPEAT_WORDS_TWICE':
        response = repeatWordsTwice(message);
        transformation = 'Repeating Words Twice';
        break;
      case 'REPLACE_SPACES_WITH_UNDERSCORES':
        response = replaceSpacesWithUnderscores(message);
        transformation = 'Replacing Spaces with Underscores';
        break;
      case 'SHUFFLE_CHARACTERS_IN_WORDS':
        response = shuffleCharactersInWords(message);
        transformation = 'Shuffling Characters in Words';
        break;
      default:
        response = "Unknown action!";
        transformation = 'Unknown Transformation';
    }

    const obj = { botName: name, botResponse: `Transformation: ${transformation}\nResponse: ${response}` };
    handleBotResponse(obj);
  };

  // Helper functions for different actions
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

  const mostFrequentLetter = (text) => {
    const charMap = {};
    let maxChar = '';
    let maxCount = 0;
    for (let char of text.replace(/\s+/g, '').toLowerCase()) {
      charMap[char] = (charMap[char] || 0) + 1;
      if (charMap[char] > maxCount) {
        maxChar = char;
        maxCount = charMap[char];
      }
    }
    return maxChar;
  };

  const reverseText = (text) => text.split('').reverse().join('');

  const jumbleWords = (text) => text.split(' ').sort(() => 0.5 - Math.random()).join(' ');

  const capitalizeWords = (text) => text.replace(/\b\w/g, char => char.toUpperCase());

  const removeVowels = (text) => text.replace(/[aeiouAEIOU]/g, "");

  const removeConsonants = (text) => text.replace(/[^aeiouAEIOU\s]/g, "");

  const repeatWordsTwice = (text) => text.split(' ').map(word => `${word} ${word}`).join(' ');

  const replaceSpacesWithUnderscores = (text) => text.replace(/\s+/g, '_');

  const shuffleCharactersInWords = (text) => {
    return text.split(' ').map(word => {
      return word.split('').sort(() => 0.5 - Math.random()).join('');
    }).join(' ');
  };

  useEffect(() => {
    if (message) {
      performAction();
    }
  }, [message]);

  return null;
}

export default Bot;
