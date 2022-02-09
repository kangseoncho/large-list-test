import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box } from '@mui/material';
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import LargeListData from '../data/LargeListData';
import { useEffect, useState, createRef } from 'react';
import { TreeView, TreeItem } from '@mui/lab'


const LargeListMuiTreeView = ({ selectedGridRow }) => {
    const [largeListData, setLargeListData] = useState([]);
    useEffect(() => {
        setLargeListData(LargeListData);    
    }, []);

    const [expanded, setExpanded] = useState([]);
    const [selected, setSelected] = useState([]);

    const handleExpand = (event, nodeIds) => {
        console.log("toggle node ids: ", nodeIds)
        setExpanded(nodeIds);
    };
    
    const handleSelect = (event, nodeIds) => {
        console.log("selected node ids: ", nodeIds)
        setSelected(nodeIds);
    };

    const handleExpandClick = () => {
        const mainBrokerNodeIds = [];
        largeListData.forEach((item, index) => {
            mainBrokerNodeIds.push(item.id.toString());
        });
        setExpanded((oldExpanded) => 
            oldExpanded.length === 0 ? mainBrokerNodeIds : [],
        );
        console.log("expand changed? ", expanded)
    };

    const handleSelectClick = () => {
        const allBrokerNodeIds = [];
        largeListData.forEach((item, index) => {
            allBrokerNodeIds.push(item.id.toString());
        });
        setSelected((oldSelected) =>
            oldSelected.length === 0 ? allBrokerNodeIds : [],
        );
        console.log("selected changed? ", selected)
    };


    const generateBusinessPartnerList =  largeListData.map((businessPartner, index) => {
        return (
            <TreeItem key={businessPartner.id} nodeId={businessPartner.id.toString()} label={businessPartner.lastName}>
                {businessPartner.businessDetails.map((detail, i) => {
                    return (
                        // need logic in here to decorate where detail.id == businessPartner.id
                        // or something like it
                        <TreeItem key={i} nodeId={"d-" + detail.id.toString()} label={detail.city} />
                    );                 
                })}
            </TreeItem>
        );
    });


    return (   
        <>
            <Box component={Paper} sx={{ height:"400px", width:"400px", overflowY: 'auto'  }}>
                <TreeView
                    aria-label="business-partner-list-tree-view"
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    expanded={expanded}
                    selected={selected}
                    onNodeToggle={handleExpand}
                    onNodeSelect={handleSelect}
                    multiSelect
                >
                    {generateBusinessPartnerList}
                </TreeView>
            </Box>
            <Box>
                <button onClick={handleExpandClick}>expand?</button>
                <button onClick={handleSelectClick}>select?</button>
            </Box>
        </>
    )  
}

export default LargeListMuiTreeView;