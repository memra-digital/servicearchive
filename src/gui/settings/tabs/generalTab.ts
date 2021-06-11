/*
=====================================
  © Lekvado Media, 2019-2021
  Licensed under the GPLv3 license.
=====================================
*/

export const loadGeneralTab = () => {
	let elements: HTMLElement[] = [];

	let textElement: HTMLElement = document.createElement(`p`);
	textElement.innerText = `Uhh idk man`;
	elements.push(textElement);

	return elements;
}