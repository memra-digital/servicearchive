import { Modal } from '../schemas';

let modalBg = document.getElementById(`modal-bg`);

export const openModal = (modal: Modal) => {
    modalBg.style.display = `block`;
    modalBg.style.opacity = `0.5`;
}
export const closeModal = () => {

}

document.body.onload = () => {
    document.getElementById(`settings-btn`).onclick = () => {
        openModal({
            title: `Settings`,
            tabs: [
                {
                    title: `General`,
                    content: [

                    ]
                }
            ]
        });
        console.log(`Mazais didzītis`);
    }
}