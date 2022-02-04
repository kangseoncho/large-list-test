import './App.css';
import LargeListUL from './component/LargeListUL';
import LargeListMuiReactWindow from './component/LargeListMuiReactWindow';
import LargeListUlReactWindow from './component/LargeListUlReactWindow';
import LargeListMuiReactInfiniteScroll from './component/LargeListMuiReactInfiniteScroll';

function App() {
  return (
    <div className="App">
		<header className="App-header">
				i am header
		</header>

    	<div className="list-holder"> 
			{/* <LargeListUlReactWindow />  */}
			{/* <LargeListMuiReactWindow /> */}
			<LargeListMuiReactInfiniteScroll />
		</div>
    </div>
  );
}

export default App;
