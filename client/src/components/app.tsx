import Navbar from "./navbar/navbar";
import ShortenerPanel from "./shortener-panel/shortener-panel";
import ShortenedList from "./shortened-list/shortened-list";

function App(){
    return (
        <div>
            <Navbar/>
            <ShortenerPanel/>
            <ShortenedList/>
        </div>
    );
}

export default App;
