import { DateObject } from 'react-multi-date-picker';

import { ICityType } from '~root/types/cityType';

/**
 * @description
 * تایپ دراپ‌دان
 */
export interface IFlightDropdown {
	source?: HTMLInputElement;
	destination?: HTMLInputElement;
	date?: DateRefType;
}

/**
 * @description
 * تایپ اطلاعات جستجوشده در فیلد جستجو
 */
export interface IFlight {
	source?: ICityType;
	destination?: ICityType;
	date?: DateType;
}

export type DateType = Date | string | number | DateObject | null;

export type DateRefType = HTMLInputElement & { closeCalendar: () => void; openCalendar: () => void; isOpen: boolean };
