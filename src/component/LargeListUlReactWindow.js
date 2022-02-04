// import { ExpandMore, ExpandLess } from '@mui/icons-material';
// import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { FixedSizeList } from 'react-window';
import LargeListData from './LargeListData';
import AutoSizer from 'react-virtualized-auto-sizer';
import { useEffect, useState } from 'react';


const LargeListUlReactWindow = () => {
    const [open, setOpen] = useState({});
    const [largeListData, setLargeListData] = useState([]);

    useEffect(() => {
        setLargeListData(LargeListData);
        setOpen(createInitialOpenState())
    }, []);

    const createInitialOpenState = () => {
        let copyOfOpen = {};
        largeListData.forEach((item, index) => {
            copyOfOpen[item.id] = false;
        });
        return copyOfOpen;
    };

    const handleClick = (brokerId) => {
        let copyOfOpen = Object.assign({}, open);
        copyOfOpen[brokerId] = !copyOfOpen[brokerId];
        setOpen(copyOfOpen);
    };


    const Row = ({index, style}) => {
        console.log("style: ", style)
        return (   
            <ul className="business-partner-list-ul" key={index} style={style}>
                <li style={{ marginHeight: "5px" }} > 
                    <button  onClick={() => handleClick(largeListData[index].id)}> 
                        {largeListData[index].firstName + " " + largeListData[index].lastName} 
                    </button>
                </li>


            </ul>
        )
    }

    return (
        <div className="list-container">
            <AutoSizer>
                {({height, width}) => (
                    <FixedSizeList
                        className="list-mui-react-window"
                        height={height}
                        width={width}
                        itemCount={LargeListData.length}
                        itemSize={20}
                    >
                        {Row}
                    </FixedSizeList>
                )}
            </AutoSizer>
        </div>
    )
    
}

export default LargeListUlReactWindow;