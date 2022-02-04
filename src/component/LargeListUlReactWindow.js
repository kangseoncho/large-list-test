// import { ExpandMore, ExpandLess } from '@mui/icons-material';
// import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { FixedSizeList } from 'react-window';
import LargeListData from './LargeListData';
import AutoSizer from 'react-virtualized-auto-sizer';



const Row = ({index, style}) => {
    console.log(LargeListData)
    return (
        <ul key={index} style={style}>
            <li> {LargeListData.firstName + " " + LargeListData.lastName} </li>
        </ul>
    )
}

const LargeListUlReactWindow = () => {
    return (
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
    )
    
}

export default LargeListUlReactWindow;