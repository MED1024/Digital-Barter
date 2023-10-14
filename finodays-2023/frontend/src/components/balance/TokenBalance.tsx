import styled from '@emotion/styled'
import { Typography } from '@mui/material'
import tokenSvg from '../../assets/token.svg'

export const TokenBalance = ({
  title,
  amount,
}: {
  title: string
  amount: number | undefined
}) => {
  return (
    <StyledContainer>
      <StyledTokenContainer>
        <img src={tokenSvg} />
        <StyledTitle>{title}</StyledTitle>
      </StyledTokenContainer>
      <StyledAmount>{amount}</StyledAmount>
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`
const StyledTokenContainer = styled.div`
  display: flex;
  gap: 25px;
  width: 100%;
  align-items: center;
`
const StyledTitle = styled(Typography)`
  color: #0f3f62;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`
const StyledAmount = styled(Typography)`
  color: #0f3f62;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`
