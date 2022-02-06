
import LargeListMuiTable from './../component/list-generation-templates/LargeListMuiTable';
import LargeListGrid from './../component/grid/LargeListGrid';
import LargeListData from './data/LargeListData';
import { useState, useEffect } from 'react';

const BusinessPartnerListSample =  () => {
    const [gridRows,setGridRows] = useState([]);
    useEffect(() => {
        setGridRows(LargeListData);
    }, []);

    const [selectedGridRow, setSelectedGridRow] = useState();


    return (
        <div className="business-partner-list">
			<LargeListGrid 
                gridRows={gridRows} 
                selectedGridRow={selectedGridRow} 
                setSelectedGridRow={setSelectedGridRow}
            />

			<div className="list-holder"> 
				<LargeListMuiTable selectedGridRow={selectedGridRow} />
			</div>
		</div>
    )
}

export default BusinessPartnerListSample;