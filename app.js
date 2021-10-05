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

//initialize page counter
let currentPage = 0

//changes iso date into simple format for rendering
const readableDate = (date) => {
    const d = new Date(date)
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const year = d.getFullYear();
    return `${month}/${day}/${year}`
}

//basic search goes back to 1/1/2019
let oldestDate = '2019-01-01T00:00:00'


//function to get x months worth of data
const oldDate = (months) => {
    let d = new Date()
    d.setMonth(d.getMonth() - months)
    return d.toISOString().slice(0, 10)
}

//calculates difference between request and completed dates
const calculateDaysTook = (endDate, startDate) => {
    const endDateValue = new Date(endDate)
    const startDateValue = new Date(startDate)
    let diff = endDateValue - startDateValue
    //returns difference in days 
    return Math.floor(diff / 86400000)
}

//begin jquery wait for onload
$(() => {
    //sets search type to open or completed request
    let search = ''
    //following line will look for either completion or create date for ordering
    let filteringDate = ''
    $('button').on('click', (e) => {
        const selection = $(e.target).val();
        if (selection === "Open tree requests") {
            search = 'Open'
            filteringDate = 'created_date'
        } else {
            search = 'Completed'
            filteringDate = 'closed_date'
        }
    })

    //main form for query
    $('form').on('submit', (event) => {
        currentPage = 0
        event.preventDefault();
        const zipCode = $('input[type="text"]').val();
        $('form').trigger('reset');
        downloadData(zipCode, oldestDate)
        //also resets timespan dropdown to first one
        $('#time-span').val('2019')
    })

    //function to render query results
    const renderData = (data, zipCode) => {
        $('.results').empty();
        //set row header based on search
        const $rowHeader = $('<div>').addClass('row-header')
        if (search === "Completed") {
            $rowHeader.append([$('<p>').text('Address'), $('<p>').text('Date completed'), $('<p>').addClass('community-area').text('Community Area')])
        } else {
            $rowHeader.append([$('<p>').text('Address'), $('<p>').text('Date requested'), $('<p>').addClass('community-area').text('Community Area')])
        }
        $('.results').append($rowHeader)
        //render the .reminder her 34 results for 60630
        $('.reminder p').text(`${data.length} results for ${zipCode}`)
        //toggle hidden from date dropdown in reminder row
        $('select').css('display', 'inline-block')

        //filtering results by date
        $timeSpanDropdown = $('#time-span')
        $timeSpanDropdown.on('change', (e) => {
            if ($(e.target).val() === '2019') {
                downloadData(zipCode, oldestDate)
            } else {
                let monthsBack = $(e.target).val()
                let newDate = oldDate(parseInt(monthsBack))
                downloadData(zipCode, newDate)
            }

        })
        //chunks data into pages
        let numOfPages = 1
        if (data.length > 9) {
            numOfPages = Math.ceil(data.length / 9)
            
        }
        const aPage = data.slice(currentPage, currentPage + 9);
        const $rightCaret = $('<p>').text('Next page ')
        $rightCaret.append($('<i>').addClass('fas fa-angle-double-right'))
        const $leftCaret = $('<p>').text(' Previous page')
        $leftCaret.prepend($('<i>').addClass('fas fa-angle-double-left'))

        if (currentPage === 0 && data.length > 9) {
            const $pagingDiv = $('<div>').addClass('paging-row')
            $pagingDiv.appendTo('.reminder') 
            $leftCaret.appendTo($pagingDiv)
            if (numOfPages > 1 && currentPage < numOfPages) {
                $rightCaret.appendTo($pagingDiv)
            }
        }
        

        //loops throught to place on page
      

        for (const request of aPage) {

            const $div = $('<div>').addClass('row-result')
            $div.append($('<p>').text(`${request.street_address}`))
            //pulls community area name from array
            const $communityArea = $('<p>').addClass('hidden').text(`Community Area: ${comAreas[request.community_area]}`)
            const $ward = $('<p>').addClass('hidden').text(`City Ward: ${request.ward}`)
            const $rightSide = $('<div>').addClass('right-side')

            //morebutton
            const $moreButton = $('<button>').text('more').addClass('more-button')
            $moreButton.on('click', (e) => {
                if ($(e.target).text() === 'more') {
                    $(e.target).text('less')
                } else {
                    $(e.target).text('more')
                }
                const $rightContents = $(e.target).parents().eq(1).children(1)
                console.log($rightContents.length)
                //loops through right side contents, hides all but last chld
                for (let i = $rightContents.length - 1; i > 0; i--) {
                    $rightContents.eq(i).toggleClass('hidden')
                }
            })

            if (search === "Completed") {
                const dateString = readableDate(request.closed_date)
                $div.append($rightSide)
                const $date = $('<p>').text(`${dateString}`)
                const daysTook = calculateDaysTook(request.closed_date, request.created_date)
                const $daysTookText = $('<p>').text(`Days from request to completion: ${daysTook}`)
                $daysTookText.addClass('hidden')
                $date.append($moreButton)
                $rightSide.append([$date, $daysTookText, $communityArea, $ward])
            } else {
                const dateString = readableDate(request.created_date)
                $div.append($rightSide)
                const $date = ($('<p>').text(`${dateString}`))
                $date.append($moreButton)
                $rightSide.append([$date, $communityArea, $ward])
            }

            $('.results').append($div)
            // console.log(request.status);
        }
    }

    const downloadData = (zipCode, oldestDate) => {

        $.ajax({
            url: `https://data.cityofchicago.org/resource/v6vf-nfxy.json?sr_type=Tree%20Planting%20Request&duplicate=false&status=${search}&zip_code=${zipCode}&$where=${filteringDate}>='${oldestDate}'&$order=${filteringDate}%20DESC`,
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
    const $about = $('.fa-info-circle')
    $about.on('click', (e) => {
        $('#modal').css('display', 'block')
    })

    const $modalClose = $('#close')
    $modalClose.on('click', (e) => {
        $('#modal').css('display', 'none');
    })
})