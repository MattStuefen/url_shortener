import './shortened-list.css';
import {UrlRecord} from "../types";
import {useEffect, useState} from "react";
import * as EventManager from "../../utilities/event-manager";
import * as FetchUtils from "../../utilities/fetch-utils";

function ShortenedList() {
    const [urlList, setUrlList] = useState<UrlRecord[]>([]);
    const [count, setCount] = useState<number>(10);

    const loadUrls = async() => {
        try{
            const params = !isNaN(count) ? {count: count} : null;
            const urls = await FetchUtils.getJson<UrlRecord[]>("/api/urls", params);
            setUrlList(urls);
        } catch (e) {
            alert(`Failed to load urls! ${e}`);
        }
    };

    useEffect(() => {
        loadUrls().then();
        EventManager.on(EventManager.Events.UrlShortened, loadUrls);
        return () => EventManager.off(EventManager.Events.UrlShortened, loadUrls);
    }, []);

    useEffect(() => {
        loadUrls().then();
    }, [count]);

    return (
        <div className="shortened-panel">
            <div className="shortened-panel-header">
                <span>Shortened URLs</span>
                <label>
                    Show last:
                    <select value={count} onChange={async e => setCount(+e.target.value)}>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                        <option value={'NaN'}>- All -</option>
                    </select>
                </label>
            </div>
            <table>
                <thead>
                <tr>
                    <th>Short URL</th>
                    <th>Long URL</th>
                </tr>
                </thead>
                <tbody>
                {
                    urlList?.map((x: UrlRecord) => (
                        <tr key={x.id}>
                            <td><a target="_blank" href={x.shortUrl}>{x.shortUrl}</a></td>
                            <td><a target="_blank" href={x.longUrl}>{x.longUrl}</a></td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
}

export default ShortenedList;
