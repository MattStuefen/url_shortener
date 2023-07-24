import './shortened-list.css';
import {UrlRecord} from "../types";
import {useEffect, useState} from "react";
import * as EventManager from "../../utilities/event-manager";
import * as FetchUtils from "../../utilities/fetch-utils";

function ShortenedList() {
    const [urlList, setUrlList] = useState<UrlRecord[]>([]);

    const loadUrls = async() => {
        try{
            const urls = await FetchUtils.getJson<UrlRecord[]>("/api/urls", {count: 10});
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
