import styled from '@emotion/styled'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import CloseIcon from '@mui/icons-material/Close'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import {
  Alert,
  Box,
  DialogActions,
  DialogContentText,
  Drawer,
  MenuItem,
  Select,
  Snackbar,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import {
  StyledBalanceAmount,
  StyledBalanceTitle,
  StyledButton,
} from '../../App'
import cbLogo from '../../assets/cb.png'
import sbpLogo from '../../assets/sbp.png'
import tokenSvg from '../../assets/token.svg'
import { useStore } from '../../stores/rootStore'
import { TokenBalance } from './TokenBalance'

export function CustomTabPanel(props: any) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

export const Balances = observer(() => {
  const [isOpen, setIsOpen] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [buyAmount, setBuyAmount] = useState(100)
  const [sellAmount, setSellAmount] = useState(0)
  const [tab, setTab] = useState(0)

  const { userStore } = useStore()

  const {
    tokenBalances,
    currentBalance,
    buyToken,
    sellToken,
    operationStatus,
    goldPrice,
  } = userStore

  useEffect(() => {
    if (operationStatus === 'success') {
      setIsSuccess(true)
      setTimeout(() => {
        setIsSuccess(false)
      }, 6000)
    }
  }, [operationStatus])

  const handleOpen = () => {
    setIsOpen(value => !value)
  }

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue)
  }

  return (
    <>
      <StyledBalanceContainer>
        <StyledBalanceTitle>Ваш Баланс</StyledBalanceTitle>
        <StyledBalanceAmount>
          {currentBalance.toLocaleString('ru-RU')} ₽
        </StyledBalanceAmount>
        {Object.entries(tokenBalances).map(([token, amount]) => {
          return <TokenBalance title={token} amount={amount} />
        })}
      </StyledBalanceContainer>
      <StyledButton variant="contained" onClick={handleOpen}>
        Купить / Продать ТТ
      </StyledButton>
      <Drawer anchor="right" open={isOpen} onClose={() => setIsOpen(false)}>
        <StyledDrawerContainer>
          <StyledCloseIcon onClick={() => setIsOpen(false)} />
          <Tabs value={tab} onChange={handleChange}>
            <Tab label="Покупка" />
            <Tab label="Продажа" />
          </Tabs>
          <CustomTabPanel value={tab} index={0}>
            <StyledDrawerContent>
              <StyledRow>
                <StyledContent>0x66...c7e5</StyledContent>
                <StyledContent>
                  РУБ <KeyboardArrowDownIcon />
                </StyledContent>
              </StyledRow>
              <StyledColumn>
                <StyledAmount
                  fullWidth
                  id="buy"
                  value={buyAmount}
                  onChange={(event: any) => setBuyAmount(event.target.value)}
                  type="number"
                  variant="standard"
                  InputProps={{ disableUnderline: true }}
                />
                <StyledSecondaryText>сумма покупки</StyledSecondaryText>
              </StyledColumn>

              <StyledColumn>
                <StyledText>
                  1 ТТР = 1 г. золота = {goldPrice * 95} ₽
                </StyledText>
                <StyledSecondaryText>
                  курс в реальном времени
                </StyledSecondaryText>
              </StyledColumn>

              <StyledBannerContent>
                <StyledRow>
                  <img src={tokenSvg} />
                  <StyledContentColumn>
                    <Typography>ТТР</Typography>
                    <StyledSecondaryText>EVM&nbsp;сеть</StyledSecondaryText>
                  </StyledContentColumn>
                </StyledRow>
                <StyledRow>
                  <Typography variant="caption">{buyAmount} ТТР</Typography>
                  <AccountBalanceWalletIcon />
                </StyledRow>
              </StyledBannerContent>

              <StyledBannerContent>
                <StyledRow>
                  <img src={sbpLogo} height="40px" />
                  <StyledContentColumn>
                    <Typography>СБП</Typography>
                    <StyledSecondaryText>
                      Система быстрых платежей
                    </StyledSecondaryText>
                  </StyledContentColumn>
                </StyledRow>
                <StyledRow>
                  <Typography variant="caption">1-2 мин</Typography>
                  <AccountBalanceWalletIcon />
                </StyledRow>
              </StyledBannerContent>

              <StyledHr />
              <StyledColumn>
                <StyledText isHighlight>Доступные продавцы</StyledText>
              </StyledColumn>

              <StyledBannerContent
                onClick={() => {
                  buyToken('ТТР', buyAmount)
                  handleOpen()
                  setBuyAmount(0)
                }}
              >
                <StyledRow>
                  <img src={cbLogo} height="40px" />
                  <StyledContentColumn>
                    <Typography>Банк России</Typography>
                  </StyledContentColumn>
                </StyledRow>
                <StyledContentColumn>
                  <Typography>1 ТТР</Typography>
                  <StyledSecondaryText>= {goldPrice * 95}</StyledSecondaryText>
                </StyledContentColumn>
              </StyledBannerContent>
            </StyledDrawerContent>
          </CustomTabPanel>
          <CustomTabPanel value={tab} index={1}>
            <StyledDrawerContent>
              <Typography>
                Вы можете продать имеющиеся торговые токены
              </Typography>
              <Select style={{ width: 150 }} value={'ТТР'}>
                <MenuItem value={'ТТР'}>ТТР</MenuItem>
                <MenuItem disabled value={'ТТК'}>
                  ТТК
                </MenuItem>
                <MenuItem disabled value={'ТТИ'}>
                  ТТИ
                </MenuItem>
              </Select>
              <DialogContentText>
                Количество
                <TextField
                  fullWidth
                  id="sell"
                  value={sellAmount}
                  onChange={(event: any) => setSellAmount(event.target.value)}
                  type="number"
                  variant="standard"
                />
              </DialogContentText>
              <DialogActions>
                <StyledSellButton
                  disabled={
                    tokenBalances['ТТР'] < sellAmount ||
                    tokenBalances['ТТР'] <= 0
                  }
                  onClick={() => {
                    sellToken('ТТР', sellAmount)
                    handleOpen()
                    setSellAmount(0)
                  }}
                >
                  Продать
                </StyledSellButton>
              </DialogActions>
            </StyledDrawerContent>
          </CustomTabPanel>
        </StyledDrawerContainer>
      </Drawer>
      <Snackbar
        open={isSuccess}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={() => setIsSuccess(false)}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Операция прошла успешно!
        </Alert>
      </Snackbar>
    </>
  )
})

const StyledSellButton = styled.div<{ disabled?: boolean }>`
  width: 100%;
  height: 46px;
  text-align: center;
  color: #fff;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  background: black;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 7px;
  ${({ disabled }) =>
    disabled
      ? 'opacity: 0.5;  cursor: not-allowed; pointer-events: none;'
      : 'opacity: 1;  cursor: pointer;'};
`

export const StyledHr = styled.hr`
  margin: 0;
  width: 100%;
  height: 1px;
  background: rgba(0, 0, 0, 0.3);
`

export const StyledBannerContent = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  padding: 15px 20px;
  background: #141519;
  color: white;
  width: 100%;
  height: 50px;
  border-radius: 12px;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  box-sizing: border-box;
  height: 75px;
`

export const StyledContentColumn = styled.div`
  display: flex;
  flex-direction: column;
`

export const StyledText = styled.div<{ isHighlight?: boolean }>`
  color: #000;
  font-size: ${({ isHighlight }) => (isHighlight ? '20px' : '24px')};
  font-style: normal;
  font-weight: ${({ isHighlight }) => (isHighlight ? 'bold' : 400)};
  line-height: normal;
`

export const StyledSecondaryText = styled.div`
  color: #abacb4;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`

export const StyledAmount = styled(TextField)`
  input {
    color: #000;
    font-size: 64px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-align: center;
    padding: 0;
    height: 60px;
  }
`

export const StyledRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  justify-content: center;
  align-items: center;
`

export const StyledColumn = styled.div<{ gap?: number }>`
  display: flex;
  flex-direction: column;
  gap: ${({ gap }) => (gap ? gap : '4px')};
  justify-content: center;
  text-align: center;
`

export const StyledDrawerContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 32px;
`

export const StyledContent = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  padding: 15px;
  background: #141519;
  color: white;
  width: fit-content;
  height: fit-content;
  border-radius: 12px;
`

export const StyledCloseIcon = styled(CloseIcon)`
  cursor: pointer;
  position: absolute;
  right: 20px;
  top: 30px;
  z-index: 2;
`

export const StyledDrawerContainer = styled.div`
  max-width: 470px;
  padding: 20px;
`

const StyledBalanceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`
