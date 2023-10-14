import styled from '@emotion/styled'
import {
  Drawer,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { useState } from 'react'
import { useStore } from '../../stores/rootStore'
import {
  CustomTabPanel,
  StyledCloseIcon,
  StyledDrawerContainer,
  StyledDrawerContent,
  StyledHr,
  StyledRow,
  StyledText,
} from '../balance/Balances'
import { StyledButton } from './Icons'

export const AdditionalIcons = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [id, setId] = useState('')
  const [product, setProduct] = useState('')
  const [description, setDescription] = useState('')
  const [dateFrom, setDateFrom] = useState(null)
  const [dateTo, setDateTo] = useState(null)
  const [amount, setAmount] = useState('')
  const [price, setPrice] = useState('')
  const [currency, setCurrency] = useState('ТТР')
  const [wallet, setWallet] = useState('')

  const [tab, setTab] = useState(0)
  const { userStore } = useStore()

  const { sendInvoice, operationStatus } = userStore

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue)
  }

  const allFieldsFilled =
    id &&
    product &&
    description &&
    dateFrom &&
    dateTo &&
    amount &&
    price &&
    currency &&
    wallet

  return (
    <>
      <Drawer anchor="right" open={isOpen} onClose={() => setIsOpen(false)}>
        <StyledDrawerContainer>
          <StyledCloseIcon onClick={() => setIsOpen(false)} />
          <Tabs value={tab} onChange={handleChange}>
            <Tab label="Оформление инвойса" />
          </Tabs>
          <CustomTabPanel value={tab} index={0}>
            <StyledDrawerContent>
              <StyledContainer>
                <TextField
                  label="Идентификатор плательщика"
                  placeholder="Получатель инвойса"
                  variant="outlined"
                  value={id}
                  onChange={({ target: { value } }) => setId(value)}
                />
                <TextField
                  label="Товар"
                  placeholder="Наименование поставки"
                  variant="outlined"
                  value={product}
                  onChange={({ target: { value } }) => setProduct(value)}
                />
                <TextField
                  label="Описание"
                  placeholder="Дополнительная информация о товаре"
                  multiline={true}
                  rows={2}
                  variant="outlined"
                  value={description}
                  onChange={({ target: { value } }) => setDescription(value)}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <StyledRow>
                    <DateTimePicker
                      label="Дата выкупа"
                      views={['year', 'month', 'day']}
                      value={dateFrom}
                      onChange={value => setDateFrom(value as any)}
                    />
                    <DateTimePicker
                      label="Дата поставки"
                      views={['year', 'month', 'day']}
                      value={dateTo}
                      onChange={value => setDateTo(value as any)}
                    />
                  </StyledRow>
                </LocalizationProvider>
                <StyledContentRow>
                  <TextField
                    label="Количество"
                    variant="outlined"
                    type="number"
                    value={amount}
                    onChange={({ target: { value } }) => setAmount(value)}
                  />
                  <TextField
                    label="Цена"
                    variant="outlined"
                    type="number"
                    value={price}
                    onChange={({ target: { value } }) => setPrice(value)}
                  />
                  <Select
                    value={currency}
                    onChange={({ target: { value } }) => setCurrency(value)}
                  >
                    <MenuItem value={'ТТР'}>ТТР</MenuItem>
                    <MenuItem value={'ТТК'}>ТТК</MenuItem>
                    <MenuItem value={'ТТИ'}>ТТИ</MenuItem>
                  </Select>
                </StyledContentRow>
                <TextField
                  label="Кошелек для зачисления токенов"
                  variant="outlined"
                  value={wallet}
                  onChange={({ target: { value } }) => setWallet(value)}
                />
              </StyledContainer>

              <StyledHr />

              <StyledContentColumn>
                <StyledContentRow>
                  <Typography>Сумма к оплате</Typography>
                  <StyledText isHighlight>
                    {price && `${price} ${currency}`}
                  </StyledText>
                </StyledContentRow>
                <StyledButton
                  disabled={!allFieldsFilled || operationStatus === 'sending'}
                  onClick={() => {
                    sendInvoice({
                      id,
                      product,
                      description,
                      dateFrom,
                      dateTo,
                      count: amount,
                      price,
                      currency,
                      wallet,
                    })
                    setId('')
                    setProduct('')
                    setDescription('')
                    setDateFrom(null)
                    setDateTo(null)
                    setAmount('')
                    setPrice('')
                    setCurrency('ТТР')
                    setWallet('')
                  }}
                >
                  Отправить инвойс
                </StyledButton>
              </StyledContentColumn>
            </StyledDrawerContent>
          </CustomTabPanel>
        </StyledDrawerContainer>
      </Drawer>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        onClick={() => setIsOpen(true)}
      >
        <path
          d="M28.8297 9.37702C29.337 10.5446 29.6916 11.7899 29.8692 13.0893L29.1261 13.1909C29.2078 13.7884 29.25 14.3983 29.25 15.0181C29.25 15.638 29.2078 16.2479 29.1261 16.8454L29.8692 16.947C29.6916 18.2464 29.337 19.4917 28.8297 20.6593L28.1419 20.3604C27.6529 21.4859 27.0136 22.5362 26.2478 23.4875L26.8321 23.9578C26.0261 24.959 25.088 25.8552 24.0431 26.6219L23.5994 26.0172C22.621 26.735 21.5438 27.3334 20.391 27.7898L20.667 28.4872C19.4888 28.9536 18.2356 29.279 16.9299 29.4416L16.8372 28.6973C16.2361 28.7722 15.6229 28.8108 15 28.8108C14.3771 28.8108 13.7639 28.7722 13.1628 28.6973L13.0701 29.4416C11.7644 29.279 10.5112 28.9536 9.33297 28.4872L9.60904 27.7898C8.45618 27.3334 7.37899 26.735 6.4006 26.0172L5.95694 26.6219C4.912 25.8552 3.97385 24.959 3.16794 23.9578L3.75217 23.4875C2.98639 22.5362 2.34715 21.4859 1.85815 20.3604L1.17027 20.6593C0.662964 19.4917 0.308381 18.2464 0.130771 16.947L0.873862 16.8454C0.792193 16.2479 0.75 15.638 0.75 15.0181C0.75 14.3983 0.792193 13.7884 0.873862 13.1909L0.130771 13.0893C0.308381 11.7899 0.662964 10.5446 1.17027 9.37702L1.85815 9.67589C2.34715 8.55041 2.98639 7.50012 3.75217 6.54879L3.16794 6.0785C3.97385 5.07731 4.912 4.18105 5.95694 3.41441L6.4006 4.01912C7.37899 3.30129 8.45618 2.70288 9.60904 2.24648L9.33297 1.54913C10.5112 1.08267 11.7644 0.757312 13.0701 0.594715L13.1628 1.33897C13.7639 1.2641 14.3771 1.22546 15 1.22546C15.6229 1.22546 16.2361 1.2641 16.8372 1.33897L16.9299 0.594715C18.2356 0.757312 19.4888 1.08267 20.667 1.54913L20.391 2.24648C21.5438 2.70288 22.621 3.30129 23.5994 4.01912L24.0431 3.41441C25.088 4.18105 26.0261 5.07731 26.8321 6.0785L26.2478 6.54879C27.0136 7.50012 27.6529 8.55041 28.1419 9.67589L28.8297 9.37702Z"
          fill="#E0F4FF"
          stroke="#0277FA"
          stroke-width="1.5"
          stroke-linejoin="round"
          stroke-dasharray="4 4"
        />
        <path
          d="M15 11.3826V18.6539"
          stroke="#0277FA"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M11.25 15.0182L18.75 15.0182"
          stroke="#0277FA"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="18"
        viewBox="0 0 16 18"
        fill="none"
        style={{ marginLeft: '10px' }}
      >
        <path
          d="M7 1.52441H3C1.89543 1.52441 1 2.41984 1 3.52441V15.0366C1 16.1412 1.89543 17.0366 3 17.0366H7"
          stroke="#A5B4CB"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M4 9.28055H15"
          stroke="#A5B4CB"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M11 5.40253L15 9.28058L11 13.1586"
          stroke="#A5B4CB"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </>
  )
}

const StyledContentColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const StyledContentRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 16px;
`

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`
