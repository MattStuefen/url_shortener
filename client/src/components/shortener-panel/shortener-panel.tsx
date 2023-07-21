import './shortener-panel.css';
import {useState} from "react";

function ShortenerPanel(props) {
    const [longUrl, setLongUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        if(!longUrl) alert(`URL not specified!`);
        else props.onUrlShorted({shortUrl: shortUrl, longUrl: longUrl});
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
