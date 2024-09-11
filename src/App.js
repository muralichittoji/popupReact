import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import PopUp from "./Components/PopUp";

function App() {
	const [openPop, setOpenPop] = useState(false);

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Open <code>Popup</code> to Fill & Save.
				</p>
				<button onClick={() => setOpenPop(!openPop)} className="click-btn">
					<h4>Click Here</h4>
				</button>
			</header>
			{openPop && (
				<div className="popup">
					<PopUp setOpenPop={setOpenPop} />
				</div>
			)}
		</div>
	);
}

export default App;
