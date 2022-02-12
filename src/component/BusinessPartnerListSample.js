
import LargeListMuiTable from './../component/list-generation-templates/LargeListMuiTable';
import LargeListGrid from './../component/grid/LargeListGrid';
import LargeListData from './data/LargeListData';
import { useState, useEffect } from 'react';
import LargeListMuiTreeView from './../component/list-generation-templates/LargeListMuiTreeView';
import LargeListMuiTreeViewReactWindow from './../component/list-generation-templates/LargeListMuiTreeViewReactWindow';
import LargeListAgGridTreeview from './../component/list-generation-templates/LargeListAgGridTreeview';

const BusinessPartnerListSample =  () => {
    const [gridRows,setGridRows] = useState([]);
    useEffect(() => {
        setGridRows(LargeListData);
    }, []);

    const [selectedGridRow, setSelectedGridRow] = useState([]);


    return (
        <div className="business-partner-list">
			<LargeListGrid 
                gridRows={gridRows} 
                selectedGridRow={selectedGridRow} 
                setSelectedGridRow={setSelectedGridRow}
            />

			<div className="list-holder"> 
				<LargeListAgGridTreeview selectedGridRow={selectedGridRow} />
			</div>
		</div>
    )
}

export default BusinessPartnerListSample;