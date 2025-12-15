// Check for smart quotes/apostrophes

const smartQuotes = {
    '\u2018': "'", // left single quotation mark
    '\u2019': "'", // right single quotation mark (smart apostrophe)
    '\u201C': '"', // left double quotation mark
    '\u201D': '"'  // right double quotation mark
};

// Example from line 970 (copied):
const testString = "Beppu's steaming streets to Yufuin's";

console.log('Test string characters:');
for (let i = 0; i < testString.length; i++) {
    const char = testString[i];
    const code = char.charCodeAt(0).toString(16);
    console.log(`${char} = U+${code.toUpperCase().padStart(4, '0')}`);
}
