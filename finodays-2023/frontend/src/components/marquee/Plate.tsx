import styled from '@emotion/styled'

export type PlateProps = {
  key?: string
  name: string
  price: number
  change: number
  trend: '+' | '-'
  symbol: string
}

export const Plate = ({ name, price, change, trend, symbol }: PlateProps) => {
  return (
    <StyledContainer>
      <StyledCountryTitle>ТТ {name}</StyledCountryTitle>
      <StyledPriceContainer>
        <StyledPrice>
          {price}
          {symbol}
        </StyledPrice>
        <StyledChange trend={trend}>{`${trend}${change}%`}</StyledChange>
      </StyledPriceContainer>
    </StyledContainer>
  )
}

const StyledPrice = styled.div`
  color: #7d92a0;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%;
`
const StyledChange = styled.div<{ trend: '+' | '-' }>`
  color: ${({ trend }) => (trend === '+' ? '#C91A1A' : '#05B956')};
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%;
`

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 16px;
`
const StyledCountryTitle = styled.div`
  color: #7d92a0;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
`
const StyledPriceContainer = styled.div`
  color: #7d92a0;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%;
  display: flex;
  flex-direction: row;
  gap: 8px;
`
