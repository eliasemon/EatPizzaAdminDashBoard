import React from 'react'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const SkeletoneForDashBoardRightContainer = () => {
  return (
    <Stack spacing={2}>
    {/* For variant="text", adjust the height via font-size */}
    <Skeleton variant="rounded" width={40} height={20} sx={{ borderRadius : "30%" }} />
    {/* For other variants, adjust the size with `width` and `height` */}
    <Skeleton variant="rectangular" width={340} height={250} />
    <Skeleton variant="rounded" width={340} height={250} />
  </Stack>
  )
}
export default  SkeletoneForDashBoardRightContainer
