import LargeListDataReformed from './../data/LargeListDataReformed';
import { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const LargeListAgGridTreeview = ({ selectedGridRow }) => {
    const [largeListData, setLargeListData] = useState([]);
    useEffect(() => {
        // console.log(LargeListDataReformed)
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

    const [expand, setExpand] = useState(false);

    const handleExpand = (val) => {
        if(val === false) {
            this.gridApi.forEachNode((node) => {
                node.setExpanded(true);
            })
            setExpand(!val);
        } else if(val === true) {
            this.gridApi.forEachNode((node) => {
                node.setExpanded(false);
            })
            setExpand(!val);
        }
    }

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
                        //suppressRowClickSelection={true}
                    >

                    </AgGridReact>
                </div>
            </div>
            <button onClick={(e) => handleExpand(expand)}>Expand/collapse</button>
        </div>
        
    )
    
}

export default LargeListAgGridTreeview;