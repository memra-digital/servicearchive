/*
=====================================
  © Lekvado Media, 2019-2021
  Licensed under the GPLv3 license.
=====================================
*/

import { CPUUsage, MemoryInfo } from 'electron';

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