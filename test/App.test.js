import { render, waitForElement } from '@testing-library/react';
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
    await waitForElement(() => getByText(/Component Two/i));
    debug();
  });
});