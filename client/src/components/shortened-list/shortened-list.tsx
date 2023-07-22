import './shortened-list.css';
import {UrlRecord} from "../types";

function ShortenedList(props) {
    return (
        <div className="shortened-panel">
            <h1>Last 10 Shortened URLs</h1>
            <table>
                <thead>
                <tr>
                    <th>Short URL</th>
                    <th>Long URL</th>
                </tr>
                </thead>
                <tbody>
                {
                    props.urlList.map((x: UrlRecord) => (
                        <tr key={x.id}>
                            <td><a href={x.shortUrl}>{x.shortUrl}</a></td>
                            <td><a href={x.longUrl}>{x.longUrl}</a></td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
}

export default ShortenedList;
