import type { Service, ServiceListResult } from '../schemas';

let data: Array<Service> = [];

export let getArticleList = () => {
    let results: Array<ServiceListResult> = [];
    
    for (let i = 0; i < data.length; i++) {
        results.push({
            id: data[i].id,
            title: data[i].title,
            contentPreview: `${data[i].content.replace(`\n`, `  `).substr(0, 50)}${data[i].content.length > 50 ? `...` : ``}`
        });
    }

    return results;
}
export let getArticle = (id: number) => {
    for (let i = 0; i < data.length; i++) {
        if (data[i].id == id) {
            return data[i];
        }
    }
}
export let getArticleContent = (id: number) => {
    for (let i = 0; i < data.length; i++) {
        if (data[i].id == id) {
            return data[i].content;
        }
    }
}
export let setArticleContent = (id: number, content: string) => {
    for (let i = 0; i < data.length; i++) {
        if (data[i].id == id) {
            data[i].content = content;
        }
    }
    save();
}
export let setArticleName = () => {
    save();
}
export let getData = () => {
    return data;
}
export let save = () => {
    localStorage.setItem(`data`, JSON.stringify(data));
}

if (localStorage.getItem(`data`) == null) {
    localStorage.setItem(`data`, `[]`);
}
data = JSON.parse(localStorage.getItem(`data`));