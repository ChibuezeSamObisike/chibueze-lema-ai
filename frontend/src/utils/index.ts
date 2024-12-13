export function truncateWithEllipses(
  inputString: string,
  numLetters: number
): string {
  let lettersCount = 0;
  let result = '';

  for (const char of inputString) {
    if (/[a-zA-Z]/.test(char)) {
      lettersCount++;
    }
    if (lettersCount > numLetters) {
      break;
    }
    result += char;
  }

  if (inputString.trim().length <= numLetters) {
    return inputString;
  }

  return result.trim() + '...';
}
