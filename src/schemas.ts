/*
=====================================
  © Lekvado Media, 2019-2021
  Licensed under the GPLv3 license.
=====================================
*/

export interface Service {
	id: number,
	title: string,
	content: string,
	created: number,
	modified: number
}

export interface ServiceListResult {
	id: number,
	title: string,
	contentPreview: string
}
export interface ServiceSearchResult {
	id: number,
	title: string,
	contentPreview: string,
	highlightStart: number,
	highlightEnd: number
}
export interface ServiceSearchResults {
	title: Array<ServiceSearchResult>,
	content: Array<ServiceSearchResult>
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