const comAreas = ["",
    "Rogers Park",
    "West Ridge",
    "Uptown",
    "Lincoln Square",
    "North Center",
    "Lake View",
    "Lincoln Park",
    "Near North Side",
    "Edison Park",
    "Norwood Park",
    "Jefferson Park",
    "Forest Glen",
    "North Park",
    "Albany Park",
    "Portage Park",
    "Irving Park",
    "Dunning",
    "Montclare",
    "Belmont Cragin",
    "Hermosa",
    "Avondale",
    "Logan Square",
    "Humboldt Park",
    "West Town",
    "Austin",
    "West Garfield Park",
    "East Garfield Park",
    "Near West Side",
    "North Lawndale",
    "South Lawndale",
    "Lower West Side",
    "(The) Loop",
    "Near South Side",
    "Armour Square",
    "Douglas",
    "Oakland",
    "Fuller Park",
    "Grand Boulevard",
    "Kenwood",
    "Washington Park",
    "Hyde Park",
    "Woodlawn",
    "South Shore",
    "Chatham",
    "Avalon Park",
    "South Chicago",
    "Burnside",
    "Calumet Heights",
    "Roseland",
    "Pullman",
    "South Deering",
    "East Side",
    "West Pullman",
    "Riverdale",
    "Hegewisch",
    "Garfield Ridge",
    "Archer Heights",
    "Brighton Park",
    "McKinley Park",
    "Bridgeport",
    "New City",
    "West Elsdon",
    "Gage Park",
    "Clearing",
    "West Lawn",
    "Chicago Lawn",
    "West Englewood",
    "Englewood",
    "Greater Grand Crossing",
    "Ashburn",
    "Auburn Gresham",
    "Beverly",
    "Washington Heights",
    "Mount Greenwood",
    "Morgan Park",
    "O'Hare",
    "Edgewater"]

const readableDate = (date) => {
    // const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const d = new Date(date)
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const year = d.getFullYear();
    return `${month}/${day}/${year}`
}

const calculateDaysTook = (endDate, startDate) => {
    const endDateValue = new Date(endDate)
    const startDateValue = new Date(startDate)
    console.log('end', endDateValue);
    console.log('start', startDateValue);
    let diff = endDateValue - startDateValue
    return Math.floor(diff/86400000)
}

$(() => {
    //sets search type to open or completed request
    //following line will look for either completion or create date for ordering
    let search = ''
    let filteringDate = ''
    $('input').on('click', (e) => {
        const selection = $(e.target).val();
        if (selection === "Open tree requests") {
            search = 'Open'
            filteringDate = 'created_date'
        } else {
            search = 'Completed'
            filteringDate= 'closed_date'
        }
    })

    $('form').on('submit', (event) => {
        event.preventDefault();
        const zipCode = $('input[type="text"]').val();
        $('form').trigger('reset');
        downloadData(zipCode)
    })

    const renderData = (data, zipCode) => {
        //empty restults class
        $('.results').empty();
        //set row header based on search
        const $rowHeader = 
            $('<div>').addClass('row-header')
        
        if (search === "Completed") {
            $rowHeader.append([$('<p>').text('Address'), $('<p>').text('Date completed'), $('<p>').addClass('community-area').text('Community Area')])
        } else {
            $rowHeader.append([$('<p>').text('Address'), $('<p>').text('Date requested'), $('<p>').addClass('community-area').text('Community Area')])
        }
        $('.results').append($rowHeader)
        //render the .reminder her 34 results for 60630
        $('.reminder p').text(`${data.length} results for ${zipCode}`)
        for (const request of data) {
            const $div = $('<div>').addClass('row-result')
            $div.append($('<p>').text(`${request.street_address}`))
            if (search === "Completed") {
                const dateString = readableDate(request.closed_date)
                $rightSide = $('<div>').addClass('right-side')
                $div.append($rightSide)
                $rightSide.append($('<p>').text(`${dateString}`))
                const daysTook = calculateDaysTook(request.closed_date, request.created_date)
                $rightSide.append($('<p>').text(`Days from request to completion: ${daysTook}`))
            } else {
                const dateString = readableDate(request.created_date)
                $rightSide = $('<div>').addClass('right-side')
                $div.append($rightSide)
                $date = ($('<p>').text(`${dateString}`))
                $moreButton = $('<button>').text('more').addClass('more-button')
                $moreButton.on('click', (e) => {
                    
                } )
                $date.append($moreButton)
                $rightSide.append($date)
                // $moreInfo = $('<p>').text(\)
            }
            $div.append($('<p>').addClass('hidden').text(`${comAreas[request.community_area]}`))
            $('.results').append($div)
            // console.log(request.status);
        }
    }

    const downloadData = (zipCode) => {

        $.ajax({
            url: `https://data.cityofchicago.org/resource/v6vf-nfxy.json?sr_type=Tree%20Planting%20Request&duplicate=false&status=${search}&zip_code=${zipCode}&$where=${filteringDate}>='2019-01-01T00:00:00'&$order=${filteringDate}%20DESC`,
            type: "GET",
            data: {
                "$limit": 5000,
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