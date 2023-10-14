import styled from '@emotion/styled'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import { Avatar, Button, LinearProgress, Typography } from '@mui/material'
import Tooltip from '@mui/material/Tooltip'
import { BarChart, LineChart } from 'echarts/charts'
import {
  GridComponent,
  TitleComponent,
  TooltipComponent,
} from 'echarts/components'
import * as echarts from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import Marquee from 'react-fast-marquee'
import gce from '../public/icon.svg'
import swapImage from './assets/swap.png'
import { Balances } from './components/balance/Balances'
import { Plate } from './components/marquee/Plate'
import { AdditionalIcons } from './components/menu/AdditionalIcons'
import { Icons } from './components/menu/Icons'
import { Menu } from './components/menu/Menu'
import { Order } from './components/transaction/Order'
import { Transaction } from './components/transaction/Transaction'
import { Chart } from './components/widgets/Chart'
import { PieChart } from './components/widgets/PieChart'
import { useMediaQuery } from './hooks/useMediaQuery'
import { useWindowSize } from './hooks/useWindowSize'
import { useStore } from './stores/rootStore'

// Register the required components
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LineChart,
  BarChart,
  CanvasRenderer,
])

export default observer(() => {
  const { userStore } = useStore()
  const isTablet = useMediaQuery('(max-width: 768px)')
  const { width, height } = useWindowSize()

  const {
    countrySupply,
    currentBalance,
    transactionHistory,
    fetchGoldPrice,
    ordersHistory,
    operationStatus,
  } = userStore

  useEffect(() => {
    fetchGoldPrice()
  }, [])

  return (
    <>
      {operationStatus === 'sending' && <StyledLinearProgress />}
      <StyledAppContainer isTablet={isTablet}>
        <StyleLeftSideContainer isTablet={isTablet}>
          <StyledProfileInfo>
            <StyledProfileContainer>
              <Avatar sx={{ bgcolor: '#BFBFBF', width: 54, height: 54 }}>
                <PersonOutlineIcon />
              </Avatar>
              <StyledProfileTextContainer>
                <StyledProfileTitle>
                  ООО “Российский импортер”
                </StyledProfileTitle>
                <StyledProfileSubtext>Кошелек 0x66...c7e5</StyledProfileSubtext>
              </StyledProfileTextContainer>
            </StyledProfileContainer>
            <Balances />
          </StyledProfileInfo>
          <Tooltip title="Обмен через пулл ликвидности будет доступен позже">
            <StyledSwapContainer>
              <StyledSwapTitleContainer>
                <StyledBalanceTitle>Обмен ТТ</StyledBalanceTitle>
                <SettingsOutlinedIcon />
              </StyledSwapTitleContainer>
              <img src={swapImage} />
              <StyledButton disabled variant="contained">
                Обменять токены
              </StyledButton>
            </StyledSwapContainer>
          </Tooltip>
        </StyleLeftSideContainer>
        <StyledFeed>
          <StyledTop>Главная страница</StyledTop>
          <StyledPreferredContentContainer>
            <StyledPreferredContent>
              <StyledCoursesTitle>Курс ТТ</StyledCoursesTitle>
              <Marquee autoFill pauseOnHover direction="left">
                {countrySupply.map(props => (
                  <Plate {...props} />
                ))}
              </Marquee>
            </StyledPreferredContent>
          </StyledPreferredContentContainer>
          <StyledMainContentContainer>
            <StyledChartContainer isTablet={isTablet}>
              <Chart />
              <PieChart />
            </StyledChartContainer>
          </StyledMainContentContainer>
          <StyledBottomContainer isTablet={isTablet}>
            <StyledTransactionsHistory isTablet={isTablet} width={width}>
              <StyledTransactionsHistoryTitleContainer>
                <StyledTransactionsHistoryTitle>
                  История транзакций
                </StyledTransactionsHistoryTitle>
                <Menu />
              </StyledTransactionsHistoryTitleContainer>
              <StyledDateContainer>
                <StyledBalanceAmount>
                  {currentBalance.toLocaleString('ru-RU')} ₽
                </StyledBalanceAmount>
                <StyledSelectDate>
                  Август 2023
                  <KeyboardArrowDownIcon />
                </StyledSelectDate>
              </StyledDateContainer>
              {transactionHistory.map(
                ({ type, amountToken, tokenName, amountFiat, from }) => {
                  return (
                    <Transaction
                      type={type}
                      amountToken={amountToken}
                      amountFiat={amountFiat}
                      tokenName={tokenName}
                      from={from}
                    />
                  )
                },
              )}
            </StyledTransactionsHistory>
            <StyledTransactionsHistory isTablet={isTablet} width={width}>
              <StyledTransactionsHistoryTitleContainer>
                <StyledTransactionsHistoryTitle>
                  История заказов
                </StyledTransactionsHistoryTitle>
                <Menu />
              </StyledTransactionsHistoryTitleContainer>

              <StyledHeaderContainer>
                <StyledHeaderTitle>Номер заказа</StyledHeaderTitle>
                <StyledHeaderTitle>Статус</StyledHeaderTitle>
                <StyledHeaderTitle>Прогресс</StyledHeaderTitle>
                <StyledHeaderTitle>Сумма</StyledHeaderTitle>
              </StyledHeaderContainer>

              {ordersHistory.map((props: any) => (
                <Order {...props} />
              ))}
            </StyledTransactionsHistory>
          </StyledBottomContainer>
        </StyledFeed>
        <StyledSidebar isTablet={isTablet}>
          <img height="35px" src={gce} />
          <StyledIconsBlock>
            <Icons />
          </StyledIconsBlock>
          <StyledIconsBlock>
            <AdditionalIcons />
          </StyledIconsBlock>
        </StyledSidebar>
      </StyledAppContainer>
    </>
  )
})

const StyledLinearProgress = styled(LinearProgress)`
  width: 100%;
  position: absolute;
  top: 0px;
  height: 4px;
  z-index: 1;
`

const StyledHeaderContainer = styled.div`
  padding: 9px;
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
`
const StyledHeaderTitle = styled.div`
  color: #010101;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 10px;
  letter-spacing: 0.24px;
  min-width: 90px;
  text-align: left;
`

const StyledCoursesTitle = styled.div`
  color: #0f3f62;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-wrap: nowrap;
  width: 135.535px;
  height: 33px;
  flex-shrink: 0;
  border-radius: 2px;
  background: #ebf8ff;
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledSwapTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  svg {
    color: #5d6785;
    cursor: pointer;
  }
`

const StyledSwapContainer = styled.div`
  background: white;
  max-width: 100%;
  border-radius: 7.5px;
  flex-shrink: 0;
  min-width: 240px;
  height: calc(42% - 20px);
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 9px;
  justify-content: space-between;
`

const StyledIconsBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`

const StyledDateContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  align-items: center;
`

const StyledSelectDate = styled.div`
  display: flex;
  align-items: center;
  color: #7c8db5;
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 14px; /* 100% */
  letter-spacing: 0.28px;
  border-left: 1px solid #7c8db5;
  padding-left: 16px;
  cursor: pointer;
`

const StyledTransactionsHistoryTitle = styled(Typography)`
  color: #0f3f62;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0.36px;
`

const StyledTransactionsHistoryTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
  justify-content: space-between;
  margin-bottom: 8px;
`

export const StyledButton = styled(Button)`
  border-radius: 5px;
  border: 0px solid var(--primary-6, #62d2ff);
  background: var(--primary-2, #bae7ff);
  box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.04);
  color: #001f7d;
  text-transform: none !important;

  &:hover {
    border: 0px solid var(--primary-6, #62d2ff);
    background: var(--primary-2, #a1deff);
    box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.04);
    color: #001f7d;
  }
`

export const StyledBalanceAmount = styled.div`
  color: #0f3f62;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`

export const StyledBalanceTitle = styled.div`
  color: #0f3f62;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`

const StyledProfileTitle = styled(Typography)`
  color: #0f3f62;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`

const StyledProfileSubtext = styled(Typography)`
  color: #7c8db5;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`

const StyledProfileTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: flex-start;
`

const StyledProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
  align-items: center;
  justify-content: center;
`

const StyledTransactionsHistory = styled.div<any>`
  flex: 3;
  width: ${({ isTablet, width }) => (isTablet ? `${width - 73}px` : '100%')};
  background: white;
  border-radius: 7.5px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  ${({ isTablet }) => isTablet && 'overflow-y: auto;'};
`

const StyledChartContainer = styled.div<any>`
  width: 100%;
  background: white;
  border-radius: 7.5px;
  height: fit-content;
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: ${({ isTablet }) => (isTablet ? 'column' : 'row')};
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
`

const StyledBottomContainer = styled.div<any>`
  display: flex;
  flex-direction: ${({ isTablet }) => (isTablet ? 'column' : 'row')};
  gap: 6px;
  flex-wrap: wrap;
  height: fit-content;
`

const StyledMainContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 6px;
  flex-wrap: nowrap;
  height: fit-content;
`

const StyledPreferredContent = styled.div`
  background: white;
  width: 100%;
  height: 60px;
  border-radius: 7.5px;
  padding: 13px 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
`

const StyledCountryDataText = styled.div`
  color: #0f3f62;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`

const StyledRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const StyledCountryDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-wrap: nowrap;
`

const StyledPreferredContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 18px;
  flex-wrap: wrap;
`

const StyledTop = styled.div`
  width: 100%;
  min-height: 60px;
  height: 60px;
  border-radius: 7.5px;
  box-sizing: border-box;
  background: #fff;
  padding: 16px 20px;
  color: var(--character-primary-88, rgba(0, 0, 0, 0.85));
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 26px; /* 133.333% */
`

const StyledFeed = styled.div`
  flex: 9;
  display: flex;
  flex-direction: column;
  gap: 6px;
  overflow: auto;
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
`
const StyleLeftSideContainer = styled.div<any>`
  position: relative;
  flex: 4;
  max-width: ${({ isTablet }) => (isTablet ? '100%' : '300px')};
  height: calc(100% - 13px);
  flex-shrink: 0;
  min-width: 240px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 6px;
`

const StyledProfileInfo = styled.div`
  background: white;
  max-width: 100%;
  border-radius: 7.5px;
  flex-shrink: 0;
  min-width: 240px;
  height: 58%;
  padding: 16px 25px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 25px;
  justify-content: space-between;
`

const StyledSidebar = styled.div<any>`
  background: white;
  flex: 1;
  height: calc(100% - 20px);
  border-radius: 7.5px;
  flex-shrink: 0;
  min-width: 100px;
  display: flex;
  flex-direction: column;
  padding: 25px;
  box-sizing: border-box;
  align-items: center;
  align-content: center;
  justify-content: space-between;
  ${({ isTablet }) => (isTablet ? 'flex-direction: row;' : 'max-width: 100px;')}

  svg {
    cursor: pointer;
  }
`

const StyledAppContainer = styled.div<any>`
  display: flex;
  flex-direction: ${({ isTablet }) => (isTablet ? 'column' : 'row')};
  gap: 6px;
  position: relative;
  height: ${({ isTablet }) => (isTablet ? '100%' : 'calc(100vh - 20px)')};
  padding: 20px 20px 0px 20px;
  background: #d7e4f3;
`
