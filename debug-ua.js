const fs = require('fs');
fetch('https://afltables.com/afl/seas/2024.html', {
    headers: { 'User-Agent': 'WebScraper-MVP/1.0' }
})
    .then(r => {
        console.log('Status:', r.status);
        return r.text();
    })
    .then(t => {
        console.log('Length:', t.length);
        fs.writeFileSync('debug_ua.html', t);
        if (t.includes('Round 9')) console.log('Found "Round 9"');
        else console.log('MISSING "Round 9"');

        if (t.includes('<a name="9">')) console.log('Found Anchor <a name="9">');
        else console.log('MISSING Anchor <a name="9">');
    })
    .catch(e => console.error(e));
