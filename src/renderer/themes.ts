let allowedThemeProperties: Array<string> = [
    `sidebar-bg`,
    `sidebar-fg`,
    `sidebar-corner-radius`,
    `sidebar-width`,
    `sidebar-scrollbar-width`,
    `sidebar-scrollbar-corner-radius`,
    `sidebar-scrollbar-bg`,
    `sidebar-scrollbar-fg`,
    `sidebar-input-fg`,
    `sidebar-input-bg`,
    `sidebar-input-corner-radius`,
    `sidebar-gradient-col1`,
    `sidebar-gradient-col2`,
    `sidebar-article-fg`,
    `sidebar-article-bg`,
    `sidebar-btn-bg`,
    `sidebar-btn-fg`,
    `tabbar-bg`,
    `tab-bg`,
    `tab-fg`,
    `tab-corner-radius`,
    `tab-active-bg`,
    `tab-active-fg`,
    `floating-tab-shadow`,
    `editor-bg`,
    `editor-fg`,
    `editor-selection-bg`,
    `editor-selection-fg`,
    `editor-toolstrip-bg`,
    `editor-toolstrip-btn-bg`,
    `editor-toolstrip-btn-fg`,
    `editor-toolstrip-btn-active-bg`,
    `editor-toolstrip-btn-active-fg`,
    `modal-bg`,
    `modal-fg`,
    `modal-btn-bg`,
    `modal-btn-fg`
];

export const applyTheme = (theme: any) => {
    for (let value in theme.colors) {
        if (allowedThemeProperties.includes(value)) {
            (<HTMLElement>document.querySelector(`:root`)).style.setProperty(`--${value}`, theme.colors[value]);
        } else {
            console.warn(`Unknown value "${value}" in theme "${theme.name}"`);
        }
    }
}