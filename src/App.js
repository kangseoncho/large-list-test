import './App.css';
import LargeListUL from './component/LargeListUL';
import LargeListMuiReactWindow from './component/LargeListMuiReactWindow';
import LargeListUlReactWindow from './component/LargeListUlReactWindow';

function App() {
  return (
    <div className="App">
		<header className="App-header">
				i am header
		</header>

    	<div className="list-holder"> 
			{/* <div className="list-container">
				<LargeListUL />
				<LargeListUlReactWindow /> 
			</div> */}

			<LargeListMuiReactWindow />
		</div>
    </div>
  );
}

export default App;
