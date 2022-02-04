import LargeListData from "./LargeListData";

const LargeListUL = () => {
    const generateLargeList = LargeListData().map((item, index) => {
        return(
            <ul key={item.id}>
                <li> {item.lastName}, {item.firstName} </li>
                    <ul key={item.businessDetails.id}>
                        <li>{item.city}</li>
                        <li>{item.postCode}</li>
                    </ul>
            </ul>
        )
    });

    return (
        <div>
            {generateLargeList}
        </div>
    )
};

export default LargeListUL;