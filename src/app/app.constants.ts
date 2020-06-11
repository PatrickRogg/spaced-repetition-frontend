import { environment } from 'src/environments/environment';

export const CORE_API_URL = environment.coreApiUrl;
export const LEVELS = [...Array(31).keys()].slice(1);
export const LEVEL_DAY_DELAYS = [];
export const LEVEL_MULTIPLIER = 2.25;

for (let i = 0; i < LEVELS.length; i++) {
    if (i === 0) {
        LEVEL_DAY_DELAYS.push(1);
    } else {
        LEVEL_DAY_DELAYS.push(Math.floor(LEVEL_DAY_DELAYS[i - 1] * LEVEL_MULTIPLIER));
    }
}