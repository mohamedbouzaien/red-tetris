import React from "react";
import { render } from "@testing-library/react";
import Stage from "../src/client/components/Stage";
import { PLAYER_STATUS, createStage } from "../src/client/gamehelpers";

describe("Stage component", () => {
    it("renders correctly with default props", () => {
        const { getByTestId } = render(<Stage />);
        const stage = getByTestId("stage");
        expect(stage).toBeInTheDocument();
        expect(stage).toHaveAttribute("width", "10");
        expect(stage).toHaveAttribute("height", "20");
        expect(stage.children.length).toBe(201);
    });

    it("renders correctly with custom props", () => {
        const stage = createStage();
        const { getByTestId } = render(<Stage stage={stage} scale={2} />);
        const stageEl = getByTestId("stage");
        expect(stageEl).toBeInTheDocument();
        expect(stageEl).toHaveAttribute("width", "10");
        expect(stageEl).toHaveAttribute("height", "20");
        expect(stageEl.children.length).toBe(201);
    });

    it("displays the correct message based on player status", () => {
        const stage = createStage();
        const { getByTestId, rerender } = render(<Stage stage={stage} status={PLAYER_STATUS.READY} />);
        let message = getByTestId("status-message");
        expect(message).toBeInTheDocument();
        expect(message).toHaveTextContent("READY");

        rerender(<Stage stage={stage} status={PLAYER_STATUS.LOOSE} />);
        message = getByTestId("status-message");
        expect(message).toHaveTextContent("LOSER");

        rerender(<Stage stage={stage} status={PLAYER_STATUS.WIN} />);
        message = getByTestId("status-message");
        expect(message).toHaveTextContent("WINNER");

        rerender(<Stage stage={stage} status={"invalid-status"} />);
        message = getByTestId("status-message");
        expect(message).toHaveTextContent("");
    });
});