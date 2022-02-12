import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box } from '@mui/material';
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import LargeListData from '../data/LargeListData';
import { useEffect, useState, createRef, useRef, useMemo } from 'react';
import { TreeView, TreeItem } from '@mui/lab'
import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeList } from "react-window";

const LargeListMuiTreeViewReactWindow = ({ selectedGridRow }) => {
    const [largeListData, setLargeListData] = useState([]);
    useEffect(() => {
        setLargeListData(LargeListData);    
    }, []);

    const [expanded, setExpanded] = useState([]);
    const [selected, setSelected] = useState([]);

    const handleExpand = (event, nodeIds) => {
        setExpanded(nodeIds);
    };
    
    const handleSelect = (event, nodeIds) => {
        // console.log("selected node ids: ", nodeIds)
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
    };

    const handleSelectClick = () => {
        const allBrokerNodeIds = [];
        largeListData.forEach((item, index) => {
            allBrokerNodeIds.push(item.id.toString());
        });
        setSelected((oldSelected) =>
            oldSelected.length === 0 ? allBrokerNodeIds : [],
        );
    };
    
    
    const scrollRefs = useRef([]);
    scrollRefs.current = largeListData.map((el,i) => scrollRefs[el.id] ?? createRef());
    const executeScroll = (brokerId) => {
        const node = scrollRefs.current[brokerId].current;
        node.scrollIntoView();
    }  
    useEffect(() => {
        if(selectedGridRow !== null && selectedGridRow.length === 0) {
            return false;
        }
        if(selectedGridRow !== null && selectedGridRow.length === 1) {
            executeScroll(selectedGridRow[0])
        };
    }, [selectedGridRow])



    const generateBusinessPartnerList = ({index, style, toggleSize}) => {
        return (
            <TreeItem 
                style={style} 
                // ref={scrollRefs.current[largeListData[index].id]} 
                key={largeListData[index].id} 
                nodeId={largeListData[index].id.toString()} 
                label={largeListData[index].lastName}
            >
                {largeListData[index].businessDetails.map((detail, i) => {
                    return (
                        // need logic in here to decorate where detail.id == businessPartner.id
                        // or something like it
                        <TreeItem key={i} nodeId={"d-" + detail.id.toString()} label={detail.city} />
                    );                 
                })}
            </TreeItem>
        );
    }

    const getRowSize = index => largeListData[index]
 

    return (   
        <>
            <Box component={Paper} sx={{ height:"400px", width:"400px"  }}>
                <AutoSizer>
                    {({height, width}) => (
                        
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
                                <VariableSizeList
                                height={height}
                                width={width}
                                itemCount={largeListData.length}
                                itemSize={getRowSize}
                                >
                                    {generateBusinessPartnerList}
                                </VariableSizeList>
                            </TreeView>
                        
                    )}
                </AutoSizer>
            </Box>
            <Box>
                <button onClick={handleExpandClick}>expand?</button>
                <button onClick={handleSelectClick}>select?</button>
            </Box>
        </>
    )  
}

export default LargeListMuiTreeViewReactWindow;