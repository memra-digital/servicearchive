import QRCodeStyling from 'qr-code-styling';

let openSyncModalBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById(`sync-btn`);
let syncModal: HTMLElement = document.getElementById(`sync-modal`);
let syncModalBg: HTMLElement = document.getElementById(`sync-modal-bg`);
let qrCodeDisplay: HTMLImageElement = <HTMLImageElement>document.getElementById(`sync-qr-code`);
let qrCodeOptions: HTMLElement = document.getElementById(`sync-options`);
let qrCodeLoadingText: HTMLElement = document.getElementById(`sync-qr-code-loading`);

export let isSyncModalOpen: boolean = false;
export const openSyncModal = () => {
    qrCodeDisplay.style.display = `none`;
    qrCodeOptions.style.display = `none`;
    qrCodeLoadingText.style.display = `block`;

    syncModalBg.style.display = `block`;
    syncModal.style.display = `block`;

    setTimeout(() => {
        syncModalBg.style.opacity = `0.5`;
        syncModal.style.transform = `scale(1.0)`;
    }, 1);

    syncModalBg.onclick = () => closeSyncModal();

    // Send a request to the servicearchive sync server
    fetch(`https://servicearchive.herokuapp.com/sync/upload?data=[]`).then(async (result) => {
        let data: any = await result.json();

        if (data.error != ``) {
            return;
        }

        const qrCode = new QRCodeStyling({
            width: 300,
            height: 300,
            type: `canvas`,
            data: `sa-${data.key}`,
            dotsOptions: {
                color: `#000000`,
                type: `rounded`
            },
            backgroundOptions: {
                color: `#ffffff`,
            }
        });
        
        let fileReader: FileReader = new FileReader();
        fileReader.readAsDataURL(await qrCode.getRawData());

        fileReader.onload = () => {
            qrCodeDisplay.src = <string>fileReader.result;
        }

        qrCodeDisplay.style.display = `block`;
        qrCodeOptions.style.display = `block`;
        qrCodeLoadingText.style.display = `none`;
    });
}
export const closeSyncModal = () => {
    syncModalBg.style.opacity = `0`;
    syncModal.style.transform = `scale(0)`;
    
    setTimeout(() => {
        syncModalBg.style.display = `none`;
        syncModal.style.display = `none`;
    }, 200);
}

openSyncModalBtn.onclick = () => openSyncModal();