import { forwardRef } from 'react';

import { SelectItemProps, Text } from '@mantine/core';

interface ItemProps extends SelectItemProps {
	value: string;
	label: string;
	cityName: string;
	isCity: boolean;
	status?: 'error';
}

const ItemComponent = forwardRef<HTMLDivElement, ItemProps>(function ItemComponent(
	{ cityName, label, value, isCity, status, ...others }: ItemProps,
	ref,
) {
	if (status) {
		return (
			<div ref={ref} {...others} className="pe-none user-select-none">
				<Text size="sm" align="center">
					خطایی رخ داده است.
				</Text>
			</div>
		);
	}

	return (
		<div ref={ref}>
			<div {...others}>
				<>
					<Text size="sm" align="left">
						{label}
					</Text>
				</>
			</div>
		</div>
	);
});

export default ItemComponent;
