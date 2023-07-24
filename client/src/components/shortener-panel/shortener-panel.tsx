import './shortener-panel.css';
import {useState} from "react";
import * as EventManager from "../../utilities/event-manager";
import * as FetchUtils from "../../utilities/fetch-utils";

function ShortenerPanel() {
    const [longUrl, setLongUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');

    const standardizeUrl = (url: string) => {
        const urlRegex = /^http[s]*:\/\//g;
        return (url.match(urlRegex)) ? url: `http://${url}`;
    };

    const onSubmit = async (e) => {
        // TODO: Add more validation!
        e.preventDefault();
        if(!longUrl) return alert(`URL not specified!`);

        try{
            const body = {shortUrl: shortUrl, longUrl: standardizeUrl(longUrl)};
            await FetchUtils.post("/api/url", body);
            EventManager.notify(EventManager.Events.UrlShortened);
        } catch {
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
                           onChange={(e) => setLongUrl(e.target.value)}/>
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
                               onChange={(e) => setShortUrl(e.target.value)}/>
                    </label>
                </div>
                <input className="shortener-button" type="submit" data-testid="submit"
                       value="Shorten URL" onClick={onSubmit}/>
            </form>
        </div>
    );
}

export default ShortenerPanel;
