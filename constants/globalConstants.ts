export const _OneSecond = 1000;

export const _MinInMs = 60 * _OneSecond;

export const _DayInMs = 24 * 60 * _MinInMs;

export const _CachedResponse = _MinInMs * 10; // 10 min

export const _CachedRevalidate = _MinInMs * 15; // 15 min

/**
 * The reason of deleting "g" flag in regex
 * {@tutorial https://dev.to/dvddpl/why-is-my-regex-working-intermittently-4f4g}
 */
export const _DateRegex = /^20[0-9]{2}-[0-9]{1,2}-[0-9]{1,2}$/i;

export const _CityValueRegex = /^[a-z]{3}$/i;
