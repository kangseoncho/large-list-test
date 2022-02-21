import LargeListDataReformed from './../data/LargeListDataReformed';
import { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const mainBrokerCellRenderer = (props) => {
    console.log("props, ", props)
    const cellValue = props.valueFormatted ? props.valueFormatted : props.value;

    return (
        <span>
            <input type="checkbox"></input>
            <button>Icon here</button>
            <span>{cellValue}</span>
        </span>
    );
};


const LargeListAgGridTreeview = ({ selectedGridRow }) => {
    const [largeListData, setLargeListData] = useState([]);
    useEffect(() => {
        setLargeListData(reformLargeListDataForGrid(LargeListDataReformed));      
    }, []);
    const reformLargeListDataForGrid = (LargeListDataReformed) => {
        return LargeListDataReformed
    };

    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const gridRef = useRef();
    const autoGroupColumnDef = useMemo(() => {
        return {
            headerName: "Broker Name",
            minWidth: 100,
            cellRendererParams: {
                suppressCount: true,
                checkbox: true
            },
            //qcellRenderer: mainBrokerCellRenderer
        };
    }, []);
    const defaultColDef = useMemo(() => {
        return {
          flex: 1,
        };
      }, []);
    const getDataPath = useCallback(function (data) {
        return data.businessPartners;
      }, []);
    const getRowNodeId = useCallback(function (data) {
        return data.id;
    })

    const [expand, setExpand] = useState(false);
    const handleExpand = () => {
        console.log(gridRef.current.api.getSelectedNodes())
        if(expand === false) {
            gridRef.current.api.expandAll();
            setExpand(!expand);
            return;
        }
        if(expand === true) {
            gridRef.current.api.collapseAll();
            setExpand(!expand);
            return;
        }
    }

    useEffect(() => {
        if(selectedGridRow.length === 1) {
            console.log(gridRef.current.api.getRowNode("10001"))
            gridRef.current.api.forEachNode(function (node) {
                if(node.id === "10001") {
                    node.setSelected(true)
                    node.parent.setExpanded(true)
                }
            })
        }
        
    }, [selectedGridRow])

    return (
        <div className="list-container"> 
            <div style={containerStyle} >
                <div style={gridStyle} className="ag-theme-alpine">
                    <AgGridReact
                        ref={gridRef}
                        rowData={largeListData}
                        defaultColDef={defaultColDef}
                        autoGroupColumnDef={autoGroupColumnDef}
                        treeData={true}
                        getDataPath={getDataPath}
                        rowSelection={'multiple'}
                        groupDefaultExpanded={expand}
                        getRowNodeId={getRowNodeId}
                    >

                    </AgGridReact>
                </div>
            </div>
            <button onClick={(e) => handleExpand()}>{expand ? "collapse all" : "expand all"}</button>
        </div>
        
    )
    
}

export default LargeListAgGridTreeview;