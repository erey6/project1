
$(() => {
    $('form').on('submit', (event) => {
        event.preventDefault();
        const zipCode = $('input[type="text"]').val();
        $('form').trigger('reset');
        downloadData(zipCode)
    })

    const renderData = (data) => {
        for (const request of data) {
            console.log(request.street_address);
            console.log(request.created_date);
            console.log(request.community_area);
            console.log(request.zip_code)
        }
    }

    const downloadData = (zipCode) => {

        console.log(zipCode)
        $.ajax({
            url: `https://data.cityofchicago.org/resource/v6vf-nfxy.json?sr_type=Tree%20Planting%20Request&duplicate=false&status=Open&zip_code=${zipCode}&$order=created_date%20DESC`,
            type: "GET",
            data: {
                "$limit": 1000,
            }
        }).then(
            (data) => {

                renderData(data)
            },
            () => {
                console.log('bad request');
            }
        )

    }
})