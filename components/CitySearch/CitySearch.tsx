import { ReactNode, useEffect, useRef, useState } from 'react';

import { Autocomplete, CSSObject, Text } from '@mantine/core';

import { ICityType } from '~root/types/cityType';

import ItemComponent from './itemComponent';

type IProps = {
	cities: ICityType[] | null;
	status?: 'successful' | 'error';
	placeholder: 'مبداء' | 'مقصد';
	defaultValue?: string;
	inputStyles?: CSSObject;
	icon: ReactNode;
	onCheckIsValueEqual: () => boolean;
	onDropdownOpen: (elem: HTMLInputElement) => void;
	onItemSubmit: (city: ICityType) => void;
	onSetDropdownState: (ref: HTMLInputElement) => void;
	onOpenNextDropdown: () => void;
};

const CitySearch = (props: IProps) => {
	const {
		cities,
		status,
		placeholder,
		defaultValue,
		inputStyles,
		icon,
		onCheckIsValueEqual,
		onDropdownOpen,
		onItemSubmit,
		onSetDropdownState,
		onOpenNextDropdown,
	} = props;

	const [value, setValue] = useState<string>(defaultValue || '');
	const [hasError, setHasError] = useState<boolean>(false);
	const ref = useRef<HTMLInputElement | null>(null);

	useEffect(() => {
		if (ref && ref.current) {
			onSetDropdownState(ref.current);
		}
	}, [ref]);

	useEffect(() => {
		if (!value.trim() || hasError) return;

		if (onCheckIsValueEqual()) {
			setHasError(true);
			setValue('');
			return;
		}

		onOpenNextDropdown();
	}, [value, hasError]);

	return (
		<Autocomplete
			data={!cities || status === 'error' ? [{ status: 'error', value: 'error' }] : cities}
			itemComponent={ItemComponent}
			ref={ref}
			placeholder={`شهر ${placeholder} را وارد کنید`}
			required
			icon={icon}
			value={value}
			onChange={(val: string) => {
				if (!cities || status === 'error') return;

				setValue(val);
			}}
			onItemSubmit={(city: ICityType) => {
				setValue(city.label);
				onItemSubmit(city);
			}}
			onDropdownOpen={() => {
				if (ref && ref.current) {
					onDropdownOpen(ref.current);
				}
			}}
			onDropdownClose={() => {
				if (hasError) {
					setHasError(false);
				}
			}}
			error={hasError ? <p>شهر مبداء و مقصد نمی‌تواند تکراری باشد.</p> : false}
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
			label={`شهر ${placeholder}`}
			size="md"
			styles={{
				root: {
					position: 'static',
				},
				label: {
					paddingBottom: 5,
				},
				input: {
					height: 48,
					border: 'none',
					boxShadow: '0px 14px 18px -9px rgba(17, 42, 131, 0.1)',
					borderRadius: 0,
					...inputStyles,
				},
				icon: {
					opacity: '0.4',
				},
				error: {
					position: 'absolute',
					top: 'auto',
					bottom: '-1.5rem',
					left: '0',
				},
			}}
		/>
	);
};

export default CitySearch;
