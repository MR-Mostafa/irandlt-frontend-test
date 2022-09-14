import { atom } from 'recoil';

import { IFlight, IFlightDropdown } from '~root/utils/flightType';

export const flightDropdownStore = atom<IFlightDropdown>({
	key: 'flightDropdownStore',
	default: {},
});

export const flightStore = atom<IFlight>({
	key: 'flightStore',
	default: {},
});
