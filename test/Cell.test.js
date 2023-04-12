import React from "react";
import Cell from "../src/client/components/Cell";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import "jest-styled-components";

afterEach(() => {
	cleanup();
});

describe("Cell component", () => {
	it("black color when type is 0", () => {
		const { container } = render(<Cell type={0} />);
		expect(container.firstChild).toHaveStyleRule(
			"background",
			`rgba(0,0,0,0.8)`,
		);
	});

	it("colored blocks test", () => {
		const { container } = render(
			<Cell type="T" />,
		);
		expect(container.firstChild).toHaveStyleRule(
			"background",
			`rgba(132,61,198,0.8)`,
		);
	});

});