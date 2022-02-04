import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { List, ListItem, ListItemButton, ListItemText, Collapse } from '@mui/material';
import { FixedSizeList } from 'react-window';
import LargeListData from './LargeListData';
import AutoSizer from 'react-virtualized-auto-sizer';
import { useEffect, useState } from 'react';

const LargeListMuiReactWindow = () => {
    const [open, setOpen] = useState({});
    const [largeListData, setLargeListData] = useState([]);

    useEffect(() => {
        setLargeListData(LargeListData);
        setOpen(createInitialOpenState())
    }, [])

    const createInitialOpenState = () => {
        let copyOfOpen = {};
        largeListData.forEach((item, index) => {
            copyOfOpen[item.id] = false;
        })
        return copyOfOpen;
    }

    const handleClick = (brokerId) => {
        let copyOfOpen = Object.assign({}, open);
        copyOfOpen[brokerId] = !copyOfOpen[brokerId];
        setOpen(copyOfOpen);
    }

    const Row = ({index, style}) => {
        return ( 
        <>
            {/* <div key={index} > */}
                <ListItemButton key={index} style={style} onClick={() => handleClick(largeListData[index].id)}>
                    <ListItemText primary={largeListData[index].firstName + " " + largeListData[index].lastName} />
                    {open[largeListData[index].id] ? <ExpandMore/> : <ExpandLess/>}
                </ListItemButton>
            {/* </div>     */}
            
            <Collapse in={open[largeListData[index].id]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {largeListData[index].businessDetails.map((detail, i) => {
                        return (
                            <ListItemButton key={i} sx={{ pl: 4 }}>
                                <ListItemText primary={detail.city} />
                            </ListItemButton>
                        )
                        })}
                    </List>
            </Collapse>
        </>    
        )
    }

    return (
        <List component="div" className="list-container">
        <AutoSizer>
            {({height, width}) => (
                <FixedSizeList
                    className="list-mui-react-window"
                    height={height}
                    width={width}
                    itemCount={largeListData.length}
                    itemSize={20}
                >
                    {Row}
                </FixedSizeList>
            )}
        </AutoSizer>
        </List>
    )
    
}

export default LargeListMuiReactWindow;