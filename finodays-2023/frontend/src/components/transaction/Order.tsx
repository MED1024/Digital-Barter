import styled from '@emotion/styled'
import { Box, Typography } from '@mui/material'
import LinearProgress, {
  LinearProgressProps,
} from '@mui/material/LinearProgress'

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number },
) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  )
}

type OrderProps = {
  orderId: string
  status: string
  progress: number
  sum: number
  currency: string
}

export const Order = ({
  orderId,
  status,
  progress,
  sum,
  currency,
}: OrderProps) => {
  return (
    <StyledContainer>
      <StyledText>{orderId}</StyledText>
      <StyledText>{status}</StyledText>
      <StyledProgressContainer>
        <LinearProgressWithLabel value={progress} />
      </StyledProgressContainer>
      <StyledText>{`${sum} ${currency}`}</StyledText>
    </StyledContainer>
  )
}
const StyledProgressContainer = styled.div`
  min-width: 90px;
`
const StyledContainer = styled.div`
  padding: 9px;
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  border-radius: 7.5px;
  background: #fff;
  box-shadow: 0px 38px 72px 0px rgba(10, 4, 60, 0.06);
  cursor: pointer;
`
const StyledText = styled.div`
  color: #010101;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 10px;
  letter-spacing: 0.2px;
  min-width: 90px;
  text-align: left;
`
