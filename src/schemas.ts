/*
=====================================
  © Lekvado Media, 2019-2021
  Licensed under the GPLv3 license.
=====================================
*/

export interface Document {
	id: number,
	title: string,
	content: string,
	created: number,
	modified: number
}

export interface DocumentListItem {
	id: number,
	title: string,
	contentPreview: string
}
export interface DocumentSearchResult {
	id: number,
	title: string,
	contentPreview: string,
	highlightStart: number,
	highlightEnd: number
}
export interface DocumentSearchResults {
	title: DocumentSearchResult[],
	content: DocumentSearchResult[]
}

export interface ThemeListItem {
	name: string,
	description: string,
	file: string
}
export interface LanguageListItem {
	name: string,
	file: string
}