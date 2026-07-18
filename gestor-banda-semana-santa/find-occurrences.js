const fs = require('fs');
const content = fs.readFileSync('app.js', 'utf8');
const lines = content.split('\n');

function search(query) {
    console.log(`=== Searching for: ${query} ===`);
    lines.forEach((line, index) => {
        if (line.includes(query)) {
            console.log(`${index + 1}: ${line.trim()}`);
        }
    });
}

search('isSectionRehearsal');
search('primeras');
search('percusion');
search('bajos');
search('convocatedVoices');
