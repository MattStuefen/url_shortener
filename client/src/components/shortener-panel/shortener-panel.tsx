import './shortener-panel.css';
import {useState} from "react";

function ShortenerPanel(props: {onUrlShortened: () => void}) {
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

        const body = JSON.stringify({shortUrl: shortUrl, longUrl: standardizeUrl(longUrl)});
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        try{
            const res = await fetch("/api/url", {method: "post", body: body, headers: headers });
            if(res.status == 200)
                props.onUrlShortened();
            else
                alert(`Failed to store url!`);
        } catch { // do nothing
            alert(`Failed to store url!`);
        }
    };

    return (
        <div className="shortener-panel">
            <h1>Shorten a URL</h1>
            <form onSubmit={(e) => e.preventDefault()}>
                <label className="shortener-field">
                    <h3>Full URL (required):</h3>
                    <input type="text" placeholder="Long URL" value={longUrl}
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
                        <input type="text" placeholder="Desired short url ending" value={shortUrl}
                               onChange={(e) => setShortUrl(e.target.value)}/>
                    </label>
                </div>
                <input className="shortener-button" type="submit" value="Shorten URL" onClick={onSubmit}/>
            </form>
        </div>
    );
}

export default ShortenerPanel;
