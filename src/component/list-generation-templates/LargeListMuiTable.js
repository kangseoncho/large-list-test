//import { KeyboardArrowDownIcon, KeyboardArrowUpIcon } from '@mui/icons-material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { List, ListItem, ListItemButton, Box, Collapse } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import LargeListData from './../data/LargeListData';
import { useEffect, useState, useRef } from 'react';


const LargeListMuiTable = ({ selectedGridRow }) => {
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

    const [largeListData, setLargeListData] = useState([]);
    useEffect(() => {
        setLargeListData(LargeListData);
        setOpen(createInitialOpenState());
    }, [])

    const moveToSelectedRow = () => {
        console.log("selected grid row: ", selectedGridRow)
        if(selectedGridRow !== null && selectedGridRow.length > 0) {
            return true
        };
        return false;
    };

    const myRef = useRef(null);


    const generateBusinessPartnerList = largeListData.map((businessPartner, index) => {
        return (
            <> {/*  needs to go in TableRow*/}
                <TableRow ref={myRef} key={100000 + index} >
                    <TableCell align="center" padding="none" onClick={(e) => handleClick(businessPartner.id)} >
                        <Button 
                            variant="text" sx={{width: "100%"}} 
                            endIcon={open[businessPartner.id] ? <KeyboardArrowDownIcon/> : <KeyboardArrowUpIcon/>}
                        > 
                            {businessPartner.lastName, businessPartner.firstName}
                        </Button>                  
                    </TableCell>  
                </TableRow>
                <TableRow key={200000 + index} sx={{width: "100%"}} >
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }}>
                        <Collapse in={open[businessPartner.id]} timeout="auto" unmountOnExit>
                            <Box>
                                <Table size="small" aria-label="associate-business-partner-list">
                                    <TableBody>
                                        {businessPartner.businessDetails.map((detail, i) => {
                                            return (
                                                <TableRow key={i}>
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