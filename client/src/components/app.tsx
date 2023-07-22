import Navbar from "./navbar/navbar";
import ShortenerPanel from "./shortener-panel/shortener-panel";
import ShortenedList from "./shortened-list/shortened-list";
import {useEffect, useState} from "react";
import {UrlRecord} from "./types";

function App(){
    const [urlList, setUrlList] = useState<UrlRecord[]>([]);

    const loadUrls = async() => {
        fetch("/api/urls?count=10").then(async res => {
            const urlList = await res.json();
            setUrlList(urlList);
        }).catch((e) => {
            alert(`Failed to load urls! ${e.message}`);
        });
    };

    useEffect(() => {
        loadUrls().then();
        }, []);

    return (
        <div>
            <Navbar/>
            <ShortenerPanel onUrlShortened={() => loadUrls()}/>
            <ShortenedList urlList={urlList}/>
        </div>
    );
}

export default App;
