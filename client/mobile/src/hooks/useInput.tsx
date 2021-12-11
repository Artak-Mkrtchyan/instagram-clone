import React, { useState } from 'react';

export const useInput = (initialValue: string) => {
	const [value, setValue] = useState<string>(initialValue);

	const onChange = (text: string) => {
		setValue(text);
	};

	return { value, onChange, setValue };
};
