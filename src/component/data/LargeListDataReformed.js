/*
 push brokerLongName to each of the shortName in businessDetails
would look like:
[longName0, shortName1], [longName0, shortName2], [longName0, shortName0], etc.

the above arrays would be accompanied by id (which is brokerID)
it would look like: [
  {
  id: broker_id_from_shortName0,
  businessPartners: [longName0, shortName0]
  },
  {
  id: broker_id_from_shortName1,
  businessPartners: [longName0, shortName1]
  },
  {
  id: broker_id_from_shortName2,
  businessPartners: [longName0, shortName1]
  },

]
*/

const generateData = () => {
    const data = [];

    for(let i = 0; i < 400; i++) {
        data.push({
            id: i,
            shortName: "shortName " + i,
            longName: "longName " + i,
            businessDetails: [
                {
                    id: 10000 + i,
                    shortName: "shortName" + (10000 + i),
                },
                {
                    id: 20000 + i,
                    shortName: "shortName" + (20000 + i),
                },
                {
                    id: 30000 + i,
                    shortName: "shortName" + (30000 + i),
                },
                {
                    id: 40000 + i,
                    shortName: "shortName" + (40000 + i),
                },
                {
                    id: 50000 + i,
                    shortName: "shortName" + (50000 + i),
                },
                {
                    id: 60000 + i,
                    shortName: "shortName" + (60000 + i),
                },
                {
                    id: 70000 + i,
                    shortName: "shortName" + (70000 + i),
                },
                {
                    id: 80000 + i,
                    shortName: "shortName" + (80000 + i),

                },
            ]
        })
    }

    return data;
};


const reformData = (data) => {
    const reformed = [];
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].businessDetails.length; j++) {
            reformed.push({
                id: data[i].businessDetails[j].id,
                businessPartners: [data[i].longName, data[i].businessDetails[j].shortName]
            })
        }
        
    }
    console.log("reformed: ",reformed)
    return reformed;
}

const LargeListDataReformed = reformData(generateData());

export default LargeListDataReformed;