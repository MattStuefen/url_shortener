/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../../src/components/app.tsx";

describe('App', () => {
    it("Render App", async () => {
        render(<App/>);

        const header = await screen.getByRole("heading", { level: 1});
        expect(header).not.toBe(null);

        const button = await screen.getByText("count is 0", {});
        expect(button).not.toBe(null);
    });
});