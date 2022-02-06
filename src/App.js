import './App.css';
import LargeListUL from './component/LargeListUL';
import LargeListMuiReactWindow from './component/LargeListMuiReactWindow';
import LargeListUlReactWindow from './component/LargeListUlReactWindow';
import LargeListMuiReactInfiniteScroll from './component/LargeListMuiReactInfiniteScroll';
import LargeListMuiTable from './component/LargeListMuiTable';

function App() {
  return (
    <div className="App">
		<header className="App-header">
				i am header
		</header>
		<div className="broker-list">
			
		</div>

    	<div className="list-holder"> 
			{/* <LargeListUlReactWindow />  */}
			{/* <LargeListMuiReactWindow /> */}
			{/* <LargeListMuiReactInfiniteScroll /> */}
			<LargeListMuiTable />
		</div>
    </div>
  );
}

export default App;
