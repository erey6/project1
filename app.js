const readableDate = (date) => {

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const d = new Date(date)
    const monthIndex = d.getMonth();
    const day = d.getDate();
    const year = d.getFullYear();
    return `${months[monthIndex]} ${day}, ${year}`

}


$(() => {
    $('form').on('submit', (event) => {
        event.preventDefault();
        const zipCode = $('input[type="text"]').val();
        $('form').trigger('reset');
        downloadData(zipCode)
    })

    const renderData = (data, zipCode) => {
        //render the .reminder her 34 results for 60630

        $('.reminder p').text(`${data.length} results for ${zipCode}`)
        for (const request of data) {
            const dateString = readableDate(request.created_date)
            const $div = $('<div>').addClass('row-result')
            $div.append($('<p>').text(`${request.street_address}`))
            $div.append($('<p>').text(`${dateString}`))
            // console.log(request.created_date);
            // console.log(request.community_area);
            // console.log(request.zip_code);
            $('.results').append($div)
        }
    }

    const downloadData = (zipCode) => {

        $.ajax({
            url: `https://data.cityofchicago.org/resource/v6vf-nfxy.json?sr_type=Tree%20Planting%20Request&duplicate=false&status=Open&zip_code=${zipCode}&$order=created_date%20DESC`,
            type: "GET",
            data: {
                "$limit": 600,
            }
        }).then(
            (data) => {

                renderData(data, zipCode)
            },
            () => {
                console.log('bad request');
            }
        )

    }
})