import { render, waitFor } from '@testing-library/react';
import React from 'react';
import App from '../src/client/App';
import "@testing-library/jest-dom/extend-expect";
import { createHashHistory } from "history";

describe("AppRouter component", () => {
    afterEach(jest.resetAllMocks);

    it("navigates correctly", async () => {
        const history = createHashHistory({ initialEntries: ["/"] });
        history.push("/#room[player]");
        const { container, getByText, debug } = render(<App />);
        await waitFor(() => getByText(/RED/i));
        debug();
    });
});