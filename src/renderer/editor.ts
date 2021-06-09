import * as data from './data';

let editor: HTMLElement = document.getElementById(`editor`);
let textarea: HTMLTextAreaElement = <HTMLTextAreaElement>document.getElementById(`editor-textarea`);
let boldBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById(`editor-bold-btn`);
let italicBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById(`editor-italic-btn`);
let underlineBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById(`editor-underline-btn`);
let strikethroughBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById(`editor-strikethrough-btn`);

let currentArticleId: number = -1;

document.body.onload = () => editor.style.transition = `.2s opacity`;

export const openArticle = (id: number) => {
	if (currentArticleId != -1) data.setArticleContent(currentArticleId, textarea.innerHTML);
	currentArticleId = id;

	if (currentArticleId == -1) {
		editor.style.opacity = `0`;
	} else {
		editor.style.opacity = `1`;
		textarea.innerHTML = data.getArticleContent(id);

		boldBtn.className = `editor-toolstrip-btn`;
		italicBtn.className = `editor-toolstrip-btn`;
		underlineBtn.className = `editor-toolstrip-btn`;
		strikethroughBtn.className = `editor-toolstrip-btn`;

		document.getSelection().removeAllRanges();
	}
}

setTimeout(() => {
	boldBtn.onclick = () => {
		document.execCommand(`bold`);
		boldBtn.className = boldBtn.classList.contains(`active`) ? `editor-toolstrip-btn` : `editor-toolstrip-btn active`
	}
	italicBtn.onclick = () => {
		document.execCommand(`italic`);
		italicBtn.className = italicBtn.classList.contains(`active`) ? `editor-toolstrip-btn` : `editor-toolstrip-btn active`
	}
	underlineBtn.onclick = () => {
		document.execCommand(`underline`);
		underlineBtn.className = underlineBtn.classList.contains(`active`) ? `editor-toolstrip-btn` : `editor-toolstrip-btn active`
	}
	strikethroughBtn.onclick = () => {
		document.execCommand(`strikethrough`);
		strikethroughBtn.className = strikethroughBtn.classList.contains(`active`) ? `editor-toolstrip-btn` : `editor-toolstrip-btn active`
	}
	textarea.onclick = () => getCurrentFormat();
	textarea.onkeydown = () => getCurrentFormat();
	textarea.oninput = () => getCurrentFormat();

	textarea.innerHTML = ``;
}, 20);

const getCurrentFormat = () => {
	let formats: Array<string> = [];
	let selection: Selection = document.getSelection();

	if (selection.rangeCount == 0) {
		boldBtn.className = `editor-toolstrip-btn`;
		italicBtn.className = `editor-toolstrip-btn`;
		underlineBtn.className = `editor-toolstrip-btn`;
		strikethroughBtn.className = `editor-toolstrip-btn`;

		return;
	}

	if (window.getSelection().isCollapsed) {
		let foundTextAreaAsParent: boolean = false;
		let currentParentNode: HTMLElement = <HTMLElement>selection.getRangeAt(0).startContainer;

		while (!foundTextAreaAsParent) {
			if (currentParentNode.parentElement != textarea) {
				currentParentNode = currentParentNode.parentElement;

				formats.push(currentParentNode.tagName.toLowerCase());
			} else {
				foundTextAreaAsParent = true;
			}
		}

	}

	boldBtn.className = formats.includes(`b`) ? `editor-toolstrip-btn active` : `editor-toolstrip-btn`;
	italicBtn.className = formats.includes(`i`) ? `editor-toolstrip-btn active` : `editor-toolstrip-btn`;
	underlineBtn.className = formats.includes(`u`) ? `editor-toolstrip-btn active` : `editor-toolstrip-btn`;
	strikethroughBtn.className = formats.includes(`strike`) ? `editor-toolstrip-btn active` : `editor-toolstrip-btn`;
}
getCurrentFormat();

const saveText = () => {
	data.setArticleContent(currentArticleId, textarea.innerHTML);
	setTimeout(saveText, 1000);
}
setTimeout(saveText, 1000);