const generateData = () => {
    const data = [];

    for(let i = 0; i < 2000; i++) {
        data.push({
            id: i,
            firstName: "firstName" + i,
            lastName: "lastName" + i,
            businessDetails: [
                {
                    id: 10000 + i,
                    city: "city" + i,
                    postCode: "postCode" + i
                },
                {
                    id: 20000 + i,
                    city: "city" + i,
                    postCode: "postCode" + i
                }
            ]
        })
    }

    return data;
};

const LargeListData = generateData();

export default LargeListData;