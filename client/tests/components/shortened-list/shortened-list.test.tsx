/**
 * @jest-environment jsdom
 */
import React from "react";
import {render, waitFor} from "@testing-library/react";
import ShortenedList from "../../../src/components/shortened-list/shortened-list";
import {act} from "react-dom/test-utils";

let onGetJson: <T>(url: string, params?: Record<string, string|number>) => Promise<T> = null;
jest.mock('../../../src/utilities/fetch-utils', () => ({
    getJson: (url, body) => onGetJson && onGetJson(url, body)
}));

describe('ShortenedList', () => {
    it("Form submission should call fetch wrapper class", async () => {
        const onListLoaded = jest.fn(() => null);
        onGetJson = <T,>(url: string, params?: Record<string, string|number>): Promise<T> => {
            onListLoaded();
            expect(url).toBe('/api/urls');
            expect(params.count).toBe(10);
            return Promise.resolve([
                {id: 1, shortUrl: "test1", longUrl: "http://test1.com"},
                {id: 2, shortUrl: "test2", longUrl: "http://test2.com"},
                {id: 3, shortUrl: "test3", longUrl: "http://test3.com"}
            ] as T);
        };

        await act(async () => await render(<ShortenedList/>));
        await waitFor(() => expect(onListLoaded).toHaveBeenCalledTimes(1));
    });
});