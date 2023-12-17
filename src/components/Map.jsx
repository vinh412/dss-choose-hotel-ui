import { Box, Button, Input, TextField } from '@mui/material'
import React from 'react'
import { ReactBingmaps } from 'react-bingmaps'

const key = 'AsgCTq23zlkffLKJ3ASt2KqbtL6qNUX7EFwoub3jmXCc5GSNQWz8obkPArC3W_an';

function Map({setLocation}) {
    const [pushPins, setPushPins] = React.useState([
        {
            "location": [21.004, 105.846], "option":{color: 'blue'}
        }
    ])
    const [searchInput, setSearchInput] = React.useState("");
    const [boundary, setBoundary] = React.useState({
        "location": ['ha noi'],
        "option": {
            entityType: 'PopulatedPlace'
        },
        "polygonStyle": {
            fillColor: 'rgba(161,224,255,0.4)',
            strokeColor: '#a495b2',
            strokeThickness: 2
        }
    })

    const handleSubmit = (event) => {
        if (searchInput !== null && searchInput !== "") {
            setBoundary({
                "search": searchInput,
                "polygonStyle": {
                    fillColor: 'rgba(161,224,255,0.4)',
                    strokeColor: '#a495b2',
                    strokeThickness: 2
                },
                "option": {
                    entityType: 'PopulatedPlace'
                }
            })
        }
        event.preventDefault();
    };

    const getLocation = (location) => {
        setLocation(location);
        setPushPins([{
            "location": [location.latitude, location.longitude],
            "option":{color: "blue"}
        }])
    }

    return (
        <Box display='flex' flexDirection='column' height='100%' bgcolor='white'>
            <Box component='form' onSubmit={handleSubmit} p='4px' display='flex' columnGap='8px'>
                <TextField size='small' onChange={(event) => setSearchInput(event.target.value)} value={searchInput} placeholder='Location'/>
                <Button type='submit' variant='contained'>Submit</Button>
            </Box>
            <Box sx={{ width: '100%', height: '100%' }}>
                <ReactBingmaps
                    center= {[21.004, 105.846]}
                    bingmapKey={key}
                    boundary={boundary}
                    getLocation = {
                        {addHandler: "click", callback:getLocation}
                    }
                    pushPins={pushPins}
                >
                </ReactBingmaps>
            </Box>


        </Box>
    )
}

export default Map