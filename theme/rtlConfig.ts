import rtlPlugin from 'stylis-plugin-rtl';
import { createEmotionCache } from '@mantine/core';

const rtlCache = createEmotionCache({
	key: 'rtl',
	stylisPlugins: [rtlPlugin],
});

export default rtlCache;
