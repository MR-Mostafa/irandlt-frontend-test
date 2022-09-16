import { atom } from 'recoil';

import { IFlight, IFlightDropdown } from '~root/types/flightType';

export const flightDropdownStore = atom<IFlightDropdown>({
	key: 'flightDropdownStore',
	default: {},
});

export const flightStore = atom<IFlight>({
	key: 'flightStore',
	default: {},
});
