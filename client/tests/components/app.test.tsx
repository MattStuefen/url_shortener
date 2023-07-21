/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../../src/components/app.tsx";

describe('App', () => {
    it("Render App", async () => {
        render(<App/>);

        const shortenerHeader = await screen.getByText("Shorten a URL", {});
        expect(shortenerHeader).not.toBe(null);

        const shortenedListHeader = await screen.getByText("Last 10 Shortened URLs", {});
        expect(shortenedListHeader).not.toBe(null);
    });
});