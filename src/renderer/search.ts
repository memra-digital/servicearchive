import type { Service, ServiceSearchResults } from '../schemas';

export const search = (data: Array<Service>, phrase: string) => {
    let results: ServiceSearchResults = {
        title: [],
        content: []
    };

    for (let s: number = 0; s < data.length; s++) {
        if (data[s].title.includes(phrase)) {
            results.title.push({
                id: data[s].id,
                title: data[s].title,
                content: `${data[s].content.substr(0, 20)}`,
                highlightStart: data[s].title.indexOf(phrase),
                highlightEnd: data[s].title.indexOf(phrase) + phrase.length 
            });
        }

        let trie: Array<string> = phrase.split(``);
        let triePointer: number = 0;
        for (let c: number = 0; c < data[s].content.length; c++) {
            if (triePointer === trie.length) {
                let highlightStart = c - trie.length + 2;
                let highlightEnd = c + 1;

                results.content.push({
                    id: data[s].id,
                    title: data[s].title,
                    content: data[s].content.substr(highlightStart - 5, highlightEnd - highlightStart + 10),
                    highlightStart,
                    highlightEnd
                });

                triePointer = 0;
            }

            if (data[s].content[c] === trie[triePointer]) {
                triePointer++;
            } else {
                triePointer = 0;
            }
        }
    }

    return results;
}