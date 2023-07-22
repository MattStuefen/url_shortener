/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../../src/components/app.tsx";
import {enableFetchMocks} from "jest-fetch-mock";

describe('App', () => {
    it("Render App", async () => {
        enableFetchMocks();
        window.alert = (text: string) => text; // hide alerts

        render(<App/>);

        const shortenerHeader = await screen.getByText("Shorten a URL", {});
        expect(shortenerHeader).not.toBe(null);

        const shortenedListHeader = await screen.getByText("Last 10 Shortened URLs", {});
        expect(shortenedListHeader).not.toBe(null);
    });
});