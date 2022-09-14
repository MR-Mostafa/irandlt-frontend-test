import { cityType } from '~root/types/cityType';

/**
 * @description
 * تایپ دراپ‌دان
 */
export interface IFlightDropdown {
	source?: HTMLInputElement;
	destination?: HTMLInputElement;
}

/**
 * @description
 * تایپ اطلاعات جستجوشده در فیلد جستجو
 */
export interface IFlight {
	source?: cityType;
	destination?: cityType;
}
