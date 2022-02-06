import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { List, ListItem, ListItemButton, ListItemText, Collapse, Box } from '@mui/material';
import LargeListData from '../data/LargeListData';
import { useEffect, useState } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";

const LargeListMuiReactInfiniteScroll = () => {
    const [open, setOpen] = useState({});
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
    
    const LIST_DISPLAY_AMOUNT = 10
    const [largeListData, setLargeListData] = useState([]);
    const [count, setCount] = useState({
        prev: 0,
        next: LIST_DISPLAY_AMOUNT
    });   
    const [hasMore, setHasMore] = useState(true);
    const [current, setCurrent] = useState([]);

    useEffect(() => {
        setLargeListData(LargeListData);
        setOpen(createInitialOpenState());
        setCurrent(largeListData.slice(count.prev, count.next));
        console.log("current: ", current)
    }, [])

    useEffect(() => {
        console.log("list size: ", largeListData)
        setCurrent(largeListData.slice(count.prev, count.next));
        console.log("current2: ", current)
    },[largeListData])


    const getMoreData = () => {
        console.log("inside getMoreData function")
        if (current.length === largeListData.length) {
            setHasMore(false);
            return;
        }
        setTimeout(() => {
            setCurrent(current.concat(largeListData.slice(count.prev + LIST_DISPLAY_AMOUNT, count.next + LIST_DISPLAY_AMOUNT)))
        }, 1000)
        setCount((prevState) => ({ prev: prevState.prev + LIST_DISPLAY_AMOUNT, next: prevState.next + LIST_DISPLAY_AMOUNT }))
    }

    const generateBusinessPartnerList = current && current.map((businessPartner, index) => {
        return (
            <>
            <ListItem key={index} component="div" disablePadding>
                <ListItemButton onClick={() => handleClick(businessPartner.id)} >
                    <ListItemText primary={businessPartner.firstName + " " + businessPartner.lastName} />
                    {open[businessPartner.id] ? <ExpandMore/> : <ExpandLess/>}
                </ListItemButton>
            </ListItem>    
            <Collapse in={open[businessPartner.id]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {businessPartner.businessDetails.map((detail, i) => {
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
    });


    return (   
        <Box component="div" className="list-container" id="list-container-id" sx={{ overflow:"auto", bgcolor: 'background.paper'}}>
            <InfiniteScroll
                dataLength={current.length}
                next={getMoreData}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                scrollableTarget="list-container-id"
            >
                
                {generateBusinessPartnerList}
                
            </InfiniteScroll>
        </Box> 
    )
    
}

export default LargeListMuiReactInfiniteScroll;