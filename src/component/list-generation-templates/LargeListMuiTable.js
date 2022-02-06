import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, Collapse } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import LargeListData from './../data/LargeListData';
import { useEffect, useState, useRef } from 'react';


const LargeListMuiTable = ({ selectedGridRow }) => {
    const [listState, setListState] = useState({});
    const createInitialOpenState = () => {
        let copyOflistState = {};
        LargeListData.forEach((item, index) => {
            copyOflistState[item.id] = {open: false, selected: false}
        });
        return copyOflistState;
    };
    const handleOpenState = (brokerId) => {
        let copyOflistState = Object.assign({}, listState);
        
        copyOflistState[brokerId].open = !copyOflistState[brokerId].open;
        setListState(copyOflistState);
    };

    const handleSelectionState = (brokerId) => {
        let copyOflistState = Object.assign({}, listState);
        copyOflistState[brokerId].selected = !copyOflistState[brokerId].selected;
        setListState(copyOflistState);
    };

    const [largeListData, setLargeListData] = useState([]);
    useEffect(() => {
        setLargeListData(LargeListData);  
        setListState(createInitialOpenState())      
    }, []);

    const myRef = useRef(null);
    const executeScroll = () => myRef.current.scrollIntoView()   
    const handleGridSelectionChange = () => {
        if(selectedGridRow !== null && selectedGridRow.length === 0) {
            return false;
        }
        if(selectedGridRow !== null && selectedGridRow.length === 1) {
            handleOpenState(selectedGridRow[0])
            handleSelectionState(selectedGridRow[0])
            executeScroll()
            return listState[selectedGridRow[0]].selected;
        };
    };
    useEffect(() => {
        handleGridSelectionChange();
    }, [selectedGridRow]);
 


    const generateBusinessPartnerList = largeListData.map((businessPartner, index) => {
        return (
            <> {/* selected needs to go in TableRow*/}
                <TableRow ref={myRef} key={index} selected={listState[index].selected}>
                    <TableCell padding="none" onClick={(e) => handleOpenState(businessPartner.id)} >
                        <Button 
                            variant="text" sx={{width: "100%"}} 
                            endIcon={listState[businessPartner.id].open ? <KeyboardArrowDownIcon/> : <KeyboardArrowUpIcon/>}
                        > 
                            {businessPartner.lastName, businessPartner.firstName}
                        </Button>                  
                    </TableCell>  
                </TableRow>
                <TableRow key={100000 + index} sx={{width: "100%"}} >
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }}>
                        <Collapse in={listState[businessPartner.id].open} timeout="auto" unmountOnExit>
                            <Box>
                                <Table size="small" aria-label="associate-business-partner-list">
                                    <TableBody>
                                        {businessPartner.businessDetails.map((detail, i) => {
                                            return (
                                                <TableRow key={200000 + i}>
                                                    <TableCell component="th" scope="row" sx={{ width: "100%"}}>
                                                        {detail.city}
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </>
        )
    });

    return (   

        <TableContainer component={Paper} sx={{ height:"400px", width:"400px" }}>
            <Table aria-label="business-partner-list-table">
                <TableHead>
                    <TableRow>
                        <TableCell> Broker Shortname </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {generateBusinessPartnerList}
                </TableBody>
            </Table>
        </TableContainer>

    )
    
}

export default LargeListMuiTable;