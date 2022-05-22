/*
=====================================
  © Memra Digital, 2019-2022
  Licensed under the GPLv3 license.
=====================================
*/

let startTime: number, stopTime: number;

export let startupTime: number;

export const startMeasuringStartupTime = () => {
	startTime = Date.now();
}
export const stopMeasuringStartupTime = () => {
	stopTime = Date.now();

	startupTime = stopTime - startTime;

	return startupTime;
}