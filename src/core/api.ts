/*
=====================================
  © Lekvado Media, 2019-2021
  Licensed under the GPLv3 license.
=====================================
*/

import * as data from './data';
import { Document } from '../schemas';

export class ServiceAPI {
	greet() {
		console.log(`%cServiceAPI - console API for servicearchive!`, `font-weight: bold; font-size: 2rem;`);
		console.log(`%cFor help, use ServiceAPI.help().`, `font-weight: bold;`);
	}
	help() {
		console.log(`greet(): void - Show a greeting message
help(): void - Show this list

addDocument(title: string): number - Adds a document and returns the ID (-1 if adding was unsuccessful)
removeDocument(id: number): boolean - Removes a document and returns whether it was sucessful

setDocumentsTitle(id: number, title: string): boolean - Sets document's title and returns true if it was successful, otherwise returns false
setDocumentsContent(id: number, content: string): void - Sets document's content

getDocumentsTitle(id: number): number - Returns document's title
getDocumentsContent(id: number): number - Returns document's content
getDocumentsModifiedDate(id: number): number - Returns the time document was last modified in seconds since the Epoch
getDocumentsCreationDate(id: number): number - Returns the time document was created in seconds since the Epoch

save() - Save all changes`);
	}

	addDocument(title: string) {
		let newDocument: Document | boolean = data.addDocument(title);

		if (newDocument != false) {
			return newDocument.id;
		} else {
			return -1;
		}
	}
	removeDocument(id: number) {
		return data.removeDocument(id);
	}

	setDocumentsTitle(id: number, title: string) {
		return data.setDocumentTitle(id, title);
	}
	setDocumentsContent(id: number, content: string) {
		return data.setDocumentContent(id, content);
	}

	getDocumentsContent(id: number) {

	}
	getDocumentsTitle(id: number) {
		
	}

	save() {
		
	}
}