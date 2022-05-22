/*
=====================================
  © Memra Digital, 2019-2022
  Licensed under the GPLv3 license.
=====================================
*/

export interface DocumentCategory {
	id: number,
	title?: string,
	color?: string,
	content: DocumentMetadata[]
}
export interface DocumentCategoryListItem {
	id: number,
	title?: string,
	color?: string,
	content: DocumentListItem[]
}

export interface DocumentMetadata {
	id: number,
	title: string,
	created: number,
	lastModified: number,
	metadata: {
		pastor: string,
		date: number,
		location: string,
		extra: string
	}
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