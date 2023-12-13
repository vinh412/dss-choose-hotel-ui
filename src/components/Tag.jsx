import { Box, Typography } from '@mui/material'
import React from 'react'

function Tag({content}) {
  return (
    <Box sx={{border: '1px solid gray', borderRadius: '2px', p: '2px 6px'}}>
        <Typography fontSize={12} >{content}</Typography>
    </Box>
  )
}

export default Tag