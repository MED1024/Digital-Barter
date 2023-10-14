import styled from '@emotion/styled'
import TrendingDownIcon from '@mui/icons-material/TrendingDown'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import { Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import tokenSvg from '../../assets/token.svg'
import { useStore } from '../../stores/rootStore'

export const Transaction = observer(
  ({
    type,
    amountToken,
    tokenName,
    amountFiat,
    from,
  }: {
    type: string
    amountToken: number
    tokenName: string
    amountFiat: number
    from: string
  }) => {
    const { userStore } = useStore()

    if (type === 'transfer')
      return (
        <StyledContainer>
          <StyledBlock>
            <img src={tokenSvg} />
            <StyledTitleContainer>
              <StyledTitle>{`Отправка ${amountToken} ${tokenName}`}</StyledTitle>
              <StyledSubTitle>{from}</StyledSubTitle>
            </StyledTitleContainer>
          </StyledBlock>
        </StyledContainer>
      )

    const text =
      type === 'sell'
        ? `Продажа ${amountToken} ${tokenName}`
        : `Покупка ${amountToken} ${tokenName}`
    const fiat =
      type === 'sell'
        ? `+ ${amountFiat.toLocaleString('ru-RU')} руб.`
        : `- ${amountFiat.toLocaleString('ru-RU')} руб.`

    const trend =
      type === 'sell' ? <StyledTrendingUpIcon /> : <StyledTrendingDownIcon />

    return (
      <StyledContainer>
        <StyledBlock>
          <img src={tokenSvg} />
          <StyledTitleContainer>
            <StyledTitle>{text}</StyledTitle>
            <StyledSubTitle>{from}</StyledSubTitle>
          </StyledTitleContainer>
        </StyledBlock>
        <StyledBlock>
          <StyledTitle>{fiat}</StyledTitle>
          {trend}
        </StyledBlock>
      </StyledContainer>
    )
  },
)

const StyledTrendingUpIcon = styled(TrendingUpIcon)`
  color: #54c1fb;
`

const StyledTrendingDownIcon = styled(TrendingDownIcon)`
  color: #f94e4e;
`

const StyledSubTitle = styled(Typography)`
  color: #7c8db5;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 12px; /* 100% */
  letter-spacing: 0.24px;
`

const StyledTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

const StyledTitle = styled(Typography)`
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 100% */
  letter-spacing: 0.32px;
`

const StyledBlock = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  cursor: pointer;
`

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 7.5px;
  background: #fff;
  box-shadow: 0px 38px 72px 0px rgba(10, 4, 60, 0.06);
  align-items: center;
  justify-content: space-between;
  padding: 16px;
`
