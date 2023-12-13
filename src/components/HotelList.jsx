import { Box } from '@mui/material'
import React from 'react'
import HotelCard from './HotelCard'

function HotelList() {
  return (
    <Box sx={{p: '0px 16px', width: '75%'}}>
        <HotelCard />
    </Box>
  )
}

export default HotelList