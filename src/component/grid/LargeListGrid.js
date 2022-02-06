import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import LargeListData from '../data/LargeListData';

const LargeListGrid = ({gridRows, selectedGridRow, setSelectedGridRow}) => {
    const columns = [
        {field: "id", headerName:"broker ID", width: 200},
        {field: "firstName", headerName:"First Name", width: 200},
        {field: "lastName", headerName:"Last Name", width: 200}
    ]

    return (
        <div className="broker-list">
            <DataGrid 
                rows={gridRows}
                columns={columns}
                checkboxSelection={true}
                onSelectionModelChange={(selectedRow) => {
                    console.log(selectedRow);
                    setSelectedGridRow(selectedRow);
                }}
                selectionModel={selectedGridRow}
            />
        </div>
    );
};

export default LargeListGrid;