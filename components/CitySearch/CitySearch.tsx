import { useEffect, useRef, useState } from 'react';

import { Autocomplete, Text } from '@mantine/core';

import { cityType } from '~root/types/cityType';

import ItemComponent from './itemComponent';

type IProps = {
	cities?: cityType[];
	status?: 'successful' | 'error';
	placeholder: 'مبداء' | 'مقصد';
	defaultValue?: string;
	onCheckIsValueEqual: () => boolean;
	onDropdownOpen: (elem: HTMLInputElement) => void;
	onItemSubmit: (city: cityType) => void;
	onSetDropdownState: (ref: HTMLInputElement) => void;
};

const CitySearch = (props: IProps) => {
	const { cities, status, placeholder, defaultValue, onCheckIsValueEqual, onDropdownOpen, onItemSubmit, onSetDropdownState } = props;

	const [value, setValue] = useState<string>(defaultValue || '');
	const [hasError, setHasError] = useState<boolean>(false);
	const ref = useRef<HTMLInputElement | null>(null);

	useEffect(() => {
		if (ref && ref.current) {
			onSetDropdownState(ref.current);
		}
	}, [ref]);

	return (
		<Autocomplete
			data={!cities || status === 'error' ? [{ status: 'error', value: 'error' }] : cities}
			itemComponent={ItemComponent}
			ref={ref}
			placeholder={placeholder}
			required
			value={value}
			onChange={(val: string) => {
				if (!cities || status === 'error') return;

				setValue(val);
			}}
			onItemSubmit={(city: cityType) => {
				setValue(city.label);
				onItemSubmit(city);
			}}
			onDropdownOpen={() => {
				if (ref && ref.current) {
					onDropdownOpen(ref.current);
				}
			}}
			onDropdownClose={() => {
				if (onCheckIsValueEqual()) {
					setHasError(true);
					setValue('');
					return;
				}

				if (hasError) {
					setHasError(false);
				}
			}}
			error={hasError ? <p>مبدا و مقصد نمی‌تواند تکراری باشد</p> : false}
			nothingFound={
				<Text size="sm" align="center" className="pe-none user-select-none">
					نتیجه‌ای یافت نشد.
				</Text>
			}
			switchDirectionOnFlip={false}
			filter={(val, item) => {
				if (!item) return false;

				const toLowerValue = val.toLowerCase().trim();

				return (
					item.value.toLowerCase().includes(toLowerValue) ||
					item.label.toLowerCase().includes(toLowerValue) ||
					item.cityName.toLowerCase().includes(toLowerValue)
				);
			}}
			maxDropdownHeight={300}
			dropdownPosition="bottom"
			transition="pop-top-left"
			transitionDuration={80}
			transitionTimingFunction="ease"
		/>
	);
};

export default CitySearch;
