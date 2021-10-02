$(() => {


    $.ajax({
        url: "https://data.cityofchicago.org/resource/v6vf-nfxy.json?sr_type=Tree%20Planting%20Request&status=Completed&zip_code=60614&$order=created_date%20DESC",
        type: "GET",
        data: {
            "$limit": 5000,
        }
    }).then(
        (data) => {
            let counter = 0
            let myDate = new Date(2020, 01, 01)
            for (const request of data) {

                if (request.status === "Completed") {
                    
                    let completedDate = new Date(request.closed_date)
                    if (completedDate > myDate && request.zip_code === "60634") {
                    counter++
                    console.log(myDate)
                    console.log("completed", completedDate)
                    console.log("last modified", request.last_modified_date );
                    // console.log("created", request.created_date);
                    // console.log("closed", request.closed_date);
                    // console.log("community_area", request.community_area);
                    console.log(request.zip_code)
                }
                console.log("counter", counter);
                }
            }
        },
        () => {
            console.log('bad request');
        }
    )
})