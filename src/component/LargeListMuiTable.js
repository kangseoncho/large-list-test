import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { List, ListItem, ListItemButton, Box, Collapse } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import LargeListData from './LargeListData';
import { useEffect, useState } from 'react';


const LargeListMuiTable = () => {
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

        console.log(largeListData)
    }, [])


    const generateBusinessPartnerList = largeListData.map((businessPartner, index) => {
        return (
            <>
                <TableRow key={100000 + index} >
                    <TableCell component={Button} sx={{width: "100%"}} onClick={() => handleClick(businessPartner.id)}>
                        {/* <Button variant="text" onClick={() => handleClick(businessPartner.id)} sx={{width: "100%"}}> { */}
                            {businessPartner.lastName, businessPartner.firstName} 
                            {/* {open[businessPartner.id] ? <ExpandMore/> : <ExpandLess/> } */}
                        {/* </Button> */}
                    </TableCell>
                </TableRow>
                <TableRow  key={200000 + index} sx={{width: "100%"}}>
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


    // const generateBusinessPartnerList = largeListData.map((businessPartner, index) => {
    //     return (
    //         <>
    //         <ListItem key={index} component="div" disablePadding>
    //             <ListItemButton onClick={() => handleClick(businessPartner.id)} >
    //                 <ListItemText primary={businessPartner.firstName + " " + businessPartner.lastName} />
    //                 {open[businessPartner.id] ? <ExpandMore/> : <ExpandLess/>}
    //             </ListItemButton>
    //         </ListItem>    
    //         <Collapse in={open[businessPartner.id]} timeout="auto" unmountOnExit>
    //             <List component="div" disablePadding>
    //                 {businessPartner.businessDetails.map((detail, i) => {
    //                     return (
    //                         <ListItemButton key={i} sx={{ pl: 4 }}>
    //                             <ListItemText primary={detail.city} />
    //                         </ListItemButton>
    //                     )
    //                 })}
    //             </List>
    //         </Collapse>
    //         </>
    //     )
    // });



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