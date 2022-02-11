const generateData = () => {
    const data = [];

    const subData = [];
    // for(let j = 10000; j < 100010; j++) {
    //     subData.push(
    //         {
    //             id: j,
    //             city: "city " + j,
    //             postCode: "postCode " + j
    //         }
    //     )
    // }

    for(let i = 0; i < 450; i++) {
        data.push({
            id: i,
            firstName: "firstName" + i,
            lastName: "lastName" + i,
            businessDetails: [
                {
                    id: 10000 + i,
                    city: "city " + i,
                    postCode: "postCode " + i
                },
                {
                    id: 20000 + i,
                    city: "city " + i,
                    postCode: "postCode " + i
                },
                {
                    id: 30000 + i,
                    city: "city " + i,
                    postCode: "postCode " + i
                },
                {
                    id: 40000 + i,
                    city: "city " + i,
                    postCode: "postCode " + i
                },
                {
                    id: 50000 + i,
                    city: "city " + i,
                    postCode: "postCode " + i
                },
                {
                    id: 60000 + i,
                    city: "city " + i,
                    postCode: "postCode " + i
                },
                {
                    id: 70000 + i,
                    city: "city " + i,
                    postCode: "postCode " + i
                },
                {
                    id: 80000 + i,
                    city: "city " + i,
                    postCode: "postCode " + i
                },


            ]
        })
    }

    return data;
};

const LargeListData = generateData();

export default LargeListData;