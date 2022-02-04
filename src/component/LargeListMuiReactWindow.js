import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { List, ListItem, ListItemButton, ListItemText, Collapse, Box } from '@mui/material';
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
            {/* <div component="div" > */}
                <ListItem key={index} style={style} component="div" disablePadding>
                    <ListItemButton onClick={() => handleClick(largeListData[index].id)} >
                        <ListItemText primary={largeListData[index].firstName + " " + largeListData[index].lastName} />
                        {open[largeListData[index].id] ? <ExpandMore/> : <ExpandLess/>}
                    </ListItemButton>
                </ListItem>    
            {/* </div> */}
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

    // function renderRow(props) {
    //     const {index, style} = props;
    //     console.log("prop: ", props)

    //     return (
    //         <ListItem key={index} style={style} component="div" disablePadding>
    //             <ListItemButton onClick={() => handleClick(largeListData[index].id)} >
    //                 <ListItemText primary={largeListData[index].firstName + " " + largeListData[index].lastName} />
    //                 {open[largeListData[index].id] ? <ExpandMore/> : <ExpandLess/>}
    //             </ListItemButton>
    //         </ListItem>    
    //     )
    // }

    return (
        <Box className="list-container" sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}>
        <AutoSizer>
            {({height, width}) => (
                <FixedSizeList
                    className="list-mui-react-window"
                    height={height}
                    width={width}
                    itemCount={largeListData.length}
                    itemSize={20}
                    overscanCount={5}
                >
                    {Row}
                    {/* {renderRow} */}
                </FixedSizeList>
            )}
        </AutoSizer>
        </Box>
    )
    
}

export default LargeListMuiReactWindow;