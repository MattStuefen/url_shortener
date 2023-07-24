import './shortener-panel.css';
import {useState} from "react";
import * as EventManager from "../../utilities/event-manager";
import * as FetchUtils from "../../utilities/fetch-utils";
import {UrlRecord} from "../types";

function ShortenerPanel() {
    const [longUrl, setLongUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [shortened, setShortened] = useState(null as UrlRecord);
    const urlRegex = /^http[s]*:\/\//g;
    const shortUrlRegex = /^[A-Za-z0-9]+$/g;

    const standardizeUrl = (url: string) => {
        return (url.match(urlRegex)) ? url: `http://${url}`;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if(!longUrl) return alert('URL not specified!');
        if(shortUrl && !shortUrl.match(shortUrlRegex)) return alert('Invalid short url!');

        try{
            const body = {shortUrl: shortUrl, longUrl: standardizeUrl(longUrl)};
            const url = await FetchUtils.postWithResponse<UrlRecord>("/api/url", body);
            setShortened(url);
            EventManager.notify(EventManager.Events.UrlShortened);
        } catch {
            // TODO: Notify user of reason - i.e. duplicate short url/server error
            alert(`Failed to store url!`);
        }
    };

    return (
        <div className="shortener-panel">
            <h1>Shorten a URL</h1>
            <form onSubmit={(e) => e.preventDefault()}>
                <label className="shortener-field">
                    <h3>Full URL (required):</h3>
                    <input type="text" value={longUrl} data-testid="longUrl"
                           placeholder="Long URL"
                           onChange={(e) => {
                               setLongUrl(e.target.value);
                               setShortened(null);
                           }}/>
                </label>
                <div className="composite-url">
                    <label className="shortener-field">
                        <h3>Base URL:</h3>
                        <input type="text" placeholder={window.location.host} disabled/>
                    </label>
                    <span>/</span>
                    <label className="shortener-field">
                        <h3>Short (optional):</h3>
                        <input type="text" value={shortUrl} data-testid="shortUrl"
                               placeholder="Desired short url ending"
                               onChange={(e) => {
                                   setShortUrl(e.target.value);
                                   setShortened(null);
                               }}/>
                    </label>
                </div>
                <div className="url-submission-row">
                    <input className="shortener-button" type="submit" data-testid="submit"
                           value="Shorten URL" onClick={onSubmit}/>
                    { shortened
                        ? <div className="url-submit-notification">
                            <span className="url-submission-header">Created short url:</span>
                            <a href={shortened.shortUrl} target="_blank">
                                {`http://${window.location.host}/${shortened.shortUrl}`}
                            </a>
                          </div>
                        : <></>}

                </div>
            </form>
        </div>
    );
}

export default ShortenerPanel;
