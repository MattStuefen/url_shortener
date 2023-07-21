import Navbar from "./navbar/navbar";
import ShortenerPanel from "./shortener-panel/shortener-panel";
import ShortenedList from "./shortened-list/shortened-list";
import {useState} from "react";
import {UrlRecord} from "./types";

function App(){
    const [urlList, setUrlList] = useState<UrlRecord[]>([{longUrl: '/', shortUrl: '/'}]);

    return (
        <div>
            <Navbar/>
            <ShortenerPanel onUrlShorted={(x: UrlRecord) => setUrlList([...urlList, x])}/>
            <ShortenedList urlList={urlList}/>
        </div>
    );
}

export default App;
