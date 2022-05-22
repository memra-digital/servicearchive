/*
=====================================
  © Memra Digital, 2019-2022
  Licensed under the GPLv3 license.
=====================================
*/

const url: string = `https://servicearchive.herokuapp.com`;
let selectedChoice: string = ``;

export let uploadedChoice: string = ``;
export let connectorConnected: boolean = false;
export let connectorData: any = [];
export let initialized: boolean = false;

export const init = async (data: any) => {
	selectedChoice = ``;
	uploadedChoice = ``;
	connectorConnected = false;
	connectorData = [];
	initialized = true;

	return new Promise((resolve, reject) => {
		fetch(`${url}/sync/init`, {
			method: `POST`,
			headers: { "Content-Type": `application/json` },
			body: JSON.stringify(data)
		}).then(async (res: Response) => {
			let result: any = await res.json();

			if (result.error == ``) {
				update(result.key);
				resolve(result.key);
			} else {
				reject();
			}
		});
	});
}
const update = (key: string, choice: string = ``) => {
	if (!initialized) {
		return;
	}
	
	fetch(`${url}/sync/update?key=${key}${choice != `` ? `&choice=` : ``}${choice}`, {
		method: `POST`
	}).then(async (res: Response) => {
		let result: any = await res.json();

		uploadedChoice = result.choice;

		if (result.connectorData != ``) {
			connectorConnected = true;
			connectorData = result.connectorData;
		}

		if (result.error == ``) {
			if (uploadedChoice == ``) {
				setTimeout(() => {
					update(key, selectedChoice);
				}, 500);
			}
		}
	});
}

export const choose = async (choice: string) => {
	selectedChoice = choice;
}

export const cancel = async () => {
	initialized = false;
}