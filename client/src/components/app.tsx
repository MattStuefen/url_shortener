import {useState} from 'react';
import './app.css';

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="app-panel">
            <h1>URL Shortener</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
            </div>
        </div>
    );
}

export default App;
