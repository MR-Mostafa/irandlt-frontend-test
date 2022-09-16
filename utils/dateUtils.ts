import type { DateType } from 'react-date-object';
import gregorian from 'react-date-object/calendars/gregorian';
import persian from 'react-date-object/calendars/persian';
import gregorianLocal from 'react-date-object/locales/gregorian_en';
import { DateObject } from 'react-multi-date-picker';

import { _DayInMs } from '~root/constants/globalConstants';

/**
 * تاریخ دو ورودی را بررسی می‌کند
 *
 * - برگرداند: یعنی تاریخ ورودی اول از تاریخ دوم بزرگتر است true اگر مقدار
 * - برگرداند: یعنی تاریخ ورودی اول از تاریخ دوم کوچکتر است false اگر مقدار
 */
export function dateCompare(d1: Date | string | number, d2: Date | string | number): boolean {
	if (!d1 || !d2) return false;

	const date1 = new Date(d1).getTime();
	const date2 = new Date(d2).getTime();

	// date1 is greater than date2
	return date1 > date2;
}

/**
 * تاریخ انقضا را ایجاد می‌کند و به صورت ایزو برمی‌گرداند (بر اساس زمان حال)
 *
 * @param expireTime (به صورت میلی‌ثانیه باید باشد) مقداری که باید به زمان تاریخ حال اضافه کند
 *
 * - اگر مقداری وارد نشده باشد، یک روز به زمان حال اضافه می‌کند
 */
export function setExpireDate(expireTime: number = _DayInMs): string {
	const now = Date.now();
	const expireDate = new Date(now + expireTime);

	return expireDate.toISOString();
}

/**
 * @description
 * تبدیل تاریخ شمسی به میلادی
 */
export const toGregorianDate = (date: DateType): DateObject => {
	return new DateObject({ calendar: persian, date }).convert(gregorian, gregorianLocal);
};
