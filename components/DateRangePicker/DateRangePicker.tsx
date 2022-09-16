import { useEffect, useRef } from 'react';
import persian from 'react-date-object/calendars/persian';
import persianLocale from 'react-date-object/locales/persian_fa';
import DatePicker from 'react-multi-date-picker';

import { DateRefType, DateType } from '~root/types/flightType';

import DateInput from './DateInput';

interface IProps {
	value?: DateType;
	onDateSubmit: (val: DateType) => void;
	onSetDropdownState: (ref: DateRefType) => void;
	onOpenNextDropdown: () => void;
}

const DateRangePicker = (props: IProps) => {
	const { value, onDateSubmit, onSetDropdownState, onOpenNextDropdown } = props;

	const ref = useRef<DateRefType | null>();

	useEffect(() => {
		if (ref && ref.current) {
			onSetDropdownState(ref.current);
		}
	}, [ref]);

	useEffect(() => {
		if (!value) return;

		onOpenNextDropdown();
	}, [value]);

	return (
		<DatePicker
			render={<DateInput />}
			value={value || ''}
			ref={ref}
			range={false}
			multiple={false}
			numberOfMonths={2}
			format="YYYY-MM-DD"
			calendar={persian}
			locale={persianLocale}
			calendarPosition="bottom-center"
			minDate={Date.now()}
			onChange={(selectedDates) => {
				if (!selectedDates) return null;

				onDateSubmit(selectedDates as DateType);

				return selectedDates;
			}}
			fixMainPosition
			disableYearPicker
			disableMonthPicker
			hideYear
			onOpenPickNewDate={false}
			containerClassName="w-100"
		/>
	);
};

export default DateRangePicker;
