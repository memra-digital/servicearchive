import * as data from './data';
import { search } from './search';
import * as tabs from './tabs';
import type { ServiceSearchResults, ServiceSearchResult, ServiceListResult } from '../schemas';

let articleList: HTMLDivElement = <HTMLDivElement>document.getElementById(`article-list`);
let searchInput: HTMLInputElement = <HTMLInputElement>document.getElementById(`search-input`);
let searchResults: HTMLDivElement = <HTMLDivElement>document.getElementById(`search-results`);
let searchResultCount: HTMLSpanElement = document.getElementById(`search-result-count`);
let searchTitleList: HTMLDivElement = <HTMLDivElement>document.getElementById(`search-title-list`);
let searchContentList: HTMLDivElement = <HTMLDivElement>document.getElementById(`search-content-list`);

const updateSearchResults = () => {
    if (searchInput.value === ``) {
        searchResults.style.display = `none`;
        articleList.style.display = `block`;
        articleList.innerHTML = ``;

        let serviceList: Array<ServiceListResult> = data.getArticleList();
        for (let i: number = 0; i < serviceList.length; i++) {
            articleList.innerHTML += `
                <button
                    id="sidebar-article-btn-${serviceList[i].id}"
                    class="sidebar-article">
                    
                    <b>${serviceList[i].title}</b>
                    <p>${serviceList[i].contentPreview}</p>
                </button>
            `;
            setTimeout(() => {
                document.getElementById(`sidebar-article-btn-${serviceList[i].id}`).onclick = () => tabs.addTab(data.getArticle(serviceList[i].id));
            }, 20);
        }

        articleList.style.height = `${articleList.clientHeight - 20}px`;

    } else {
        let results: ServiceSearchResults = search(data.getData(), searchInput.value);

        searchResultCount.innerHTML = (results.title.length + results.content.length).toString();

        if (results.title.length === 0) {
            searchTitleList.innerHTML = ``;
        } else {
            searchTitleList.innerHTML = `<b>Nosaukumi</b>`;
            formatSearchResults(searchTitleList, results.title);
        }

        if (results.content.length === 0) {
            searchContentList.innerHTML = ``;
        } else {
            searchContentList.innerHTML = `<b>Saturs</b>`;
            formatSearchResults(searchContentList, results.content);
        }

        searchResults.style.display = `block`;
        articleList.style.display = `none`;

        searchResults.style.height = `${searchResults.clientHeight - 20}px`;
    }
}
searchInput.oninput = () => updateSearchResults();
updateSearchResults();

const formatSearchResults = (element: HTMLElement, data: Array<ServiceSearchResult>) => {
    let lastArticleID: number = -1;
    let timesLastArticleHasAppeared: number = 0;
    for (let i: number = 0; i < data.length; i++) {
        if (lastArticleID !== data[i].id) {
            if (timesLastArticleHasAppeared === 1) {
                element.innerHTML += `<p>+ 1 cits rezultāts šajā rakstā</p>`;
            } else if (timesLastArticleHasAppeared > 1) {
                element.innerHTML += `<p>+ ${timesLastArticleHasAppeared} citi rezultāti šajā rakstā</p>`;
            }

            element.innerHTML += `
                <button
                    id="sidebar-article-btn-${data[i].id}"
                    class="sidebar-article"
                    onclick="openArticle(${i})">
                    
                    <b>${data[i].title}</b>
                    <p>...${data[i].content}...</p>
                </button>
            `;

            timesLastArticleHasAppeared = 0;
        } else {
            timesLastArticleHasAppeared++;
        }
        lastArticleID = data[i].id;
    }
    if (timesLastArticleHasAppeared === 1) {
        element.innerHTML += `<p>+ 1 cits rezultāts šajā rakstā</p>`;
    } else if (timesLastArticleHasAppeared > 1) {
        element.innerHTML += `<p>+ ${timesLastArticleHasAppeared} citi rezultāti šajā rakstā</p>`;
    }
}

/* RESIZABILITY */

/* OPEN ARTICLE */
const openArticle = () => {
    
}