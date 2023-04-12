import React from "react";
import Display from "../src/client/components/Display";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import "jest-styled-components";

afterEach(() => {
	cleanup();
});

describe("Display component", () => {
	it("black color when type is 0", () => {
		const { container } = render(<Display gameOver={true} />);
		expect(container.firstChild).toHaveStyleRule(
			"color",
			"red",
		);
	});

	it("colored blocks test", () => {
		const { container } = render(
			<Display gameOver={false} />,
		);
		expect(container.firstChild).toHaveStyleRule(
			"color",
			"#999",
		);
	});

});