const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('debug.html', 'utf8');
const roundNumber = 9;
const seasonUrl = 'https://afltables.com/afl/seas/2024.html';

async function testParse() {
    const $ = cheerio.load(html);
    const links = [];
    const seen = new Set();

    // Match logic from scraper_core.js fix
    const anchor = $(`a[name="${roundNumber}"], a[id="${roundNumber}"]`);
    if (anchor.length === 0) return [];

    const siblings = anchor.nextAll();

    siblings.each((i, elem) => {
        const $elem = $(elem);
        const name = $elem.attr('name');
        const id = $elem.attr('id');
        if (name || id) return false;
        if ($elem.find('a[name], a[id]').length > 0) return false;

        $elem.find('a').each((j, link) => {
            const $link = $(link);
            const text = $link.text().trim();
            if (text === 'Match stats') {
                const href = $link.attr('href');
                if (href && href.includes('stats/games/')) {
                    const absoluteUrl = new URL(href, seasonUrl).href;
                    if (!seen.has(absoluteUrl)) {
                        links.push(absoluteUrl);
                        seen.add(absoluteUrl);
                    }
                }
            }
        });
    });

    console.log(`Total links collected: ${links.length}`);
    links.forEach(l => console.log(l));
    return links;
}

testParse();
