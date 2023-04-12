import React from 'react';
import { act } from 'react-dom/test-utils';
import { createRoot } from 'react-dom/client';
import App from '../src/client/App';
import reportWebVitals from '../src/client/reportWebVitals';

global.act = act;

jest.mock('../src/client/reportWebVitals', () => jest.fn());

describe('index.js', () => {
    let container;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        document.body.removeChild(container);
        container = null;
    });

    it('renders without crashing', () => {
        act(() => {
            createRoot(container).render(<App />);
        });
        expect(container.querySelector('#root')).toBeDefined();
    });

    it('calls reportWebVitals', () => {
        act(() => {
            createRoot(container).render(<App />);
        });
        setTimeout(() => {
            expect(reportWebVitals).toHaveBeenCalledTimes(1);
            done();
        }, 1000);
    });
});
