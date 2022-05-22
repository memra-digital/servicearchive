/*
=====================================
  © Memra Digital, 2019-2022
  Licensed under the GPLv3 license.
=====================================
*/

let sidebar: HTMLElement = document.getElementById(`sidebar`);
let sidebarResizer: HTMLElement = document.getElementById(`sidebar-resizer`);
let workspace: HTMLElement = document.getElementById(`workspace`);

let resizingSidebar: boolean = false;

sidebarResizer.onmousedown = (e: MouseEvent) => {
	resizeSidebar(e.clientX);
	resizingSidebar = true;
	document.body.style.cursor = `col-resize`;
}
document.body.onmousemove = (e: MouseEvent) => {
	if (resizingSidebar) {
		resizeSidebar(e.clientX);
	}
}
document.body.onmouseup = (e: MouseEvent) => {
	if (resizingSidebar) {
		resizeSidebar(e.clientX);
		resizingSidebar = false;
	}
	document.body.style.cursor = `default`;
}

const resizeSidebar = (mouseX: number) => {
	if (mouseX > 200) {
		sidebar.style.width = `${mouseX}px`;
		sidebarResizer.style.left = `calc(${mouseX}px - .25rem)`;
		workspace.style.width = `${window.innerWidth - mouseX}px`;

		localStorage.setItem(`sidebar-width`, mouseX.toString());
	}
}

// Load sidebars width from localStorage
if (localStorage.getItem(`sidebar-width`) == undefined) {
	localStorage.setItem(`sidebar-width`, Math.floor(window.innerWidth / 3).toString());
}
resizeSidebar(parseInt(localStorage.getItem(`sidebar-width`)));