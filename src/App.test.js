import React from 'react';
import { render, fireEvent, waitForElement, wait } from '@testing-library/react';
import { fetchShow as mockFetchShow } from './api/fetchShow';
import App from './App';
import { exportAllDeclaration } from '@babel/types';

jest.mock('./api/fetchShow');

const seasons = {
	data: [
		{
			Season_1: []
		},
		{
			Season_2: []
		},
		{
			Season_3: []
		},
		{
			Season_4: []
		}
	]
};

test('App fetches seasons data and render data', async () => {
	mockFetchShow.mockResolvedValueOnce(seasons);

	const { getByText, queryAllByTestId, getByTestId } = render(<App />);

	getByText(/fetching data.../i);
	await wait();
	exportAllDeclaration(queryAllByTestId('seasons')).toHaveLength(2);
});
