/**
 * @jest-environment jsdom
 */
import React from "react";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import ShortenerPanel from "../../../src/components/shortener-panel/shortener-panel";
import * as EventManager from "../../../src/utilities/event-manager";

let onPost: <T>(url: string, params?: Record<string, string>) => Promise<T> = null;
jest.mock('../../../src/utilities/fetch-utils', () => ({
    postWithResponse: (url, body) => onPost && onPost(url, body)
}));

describe('ShortenerPanel', () => {
    it("Form submission should call fetch wrapper class", async () => {
        const shortUrl = "abc";
        const longUrl = "http://abc.com/";

        onPost = async <T,>(url: string, body: Record<string, string>): Promise<T> => {
            expect(url).toBe('/api/url');
            expect(body["shortUrl"]).toBe(shortUrl);
            expect(body["longUrl"]).toBe(longUrl);
            return Promise.resolve({id: 4, shortUrl: shortUrl, longUrl: longUrl} as T);
        };

        const onUrlShortened = jest.fn(() => null);
        EventManager.on(EventManager.Events.UrlShortened, onUrlShortened);

        render(<ShortenerPanel/>);
        fireEvent.change(screen.getByTestId<HTMLInputElement>('longUrl', {}), {target: {value: longUrl}});
        fireEvent.change(screen.getByTestId<HTMLInputElement>('shortUrl', {}), {target: {value: shortUrl}});
        fireEvent.click(screen.getByTestId<HTMLInputElement>('submit', {}));

        await waitFor(() => expect(onUrlShortened).toHaveBeenCalled());
    });
});