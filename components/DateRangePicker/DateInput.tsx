import Image from 'next/image';

import { TextInput } from '@mantine/core';

const DateInput = ({ value, openCalendar, handleValueChange }: any) => {
	return (
		<TextInput
			type="text"
			className="date-input-wrapper"
			value={value || ''}
			onFocus={openCalendar}
			onChange={handleValueChange}
			readOnly
			required
			label="تاریخ رفت "
			placeholder="تاریخ رفت را وارد کنید"
			size="md"
			icon={<Image src="/icons/date-icon.svg" alt="تاریخ رفت" width={20} height={20} />}
			styles={{
				label: {
					paddingBottom: 5,
				},
				input: {
					height: 48,
					border: 'none',
					boxShadow: '0px 14px 18px -9px rgba(17, 42, 131, 0.1)',
					borderRadius: 5,
				},
				icon: {
					opacity: '0.4',
				},
			}}
		/>
	);
};

export default DateInput;
