import styled from '@emotion/styled'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import SearchIcon from '@mui/icons-material/Search'
import { Drawer, Tab, Tabs, Tooltip, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import noImg from '../../assets/noImg.png'
import { useStore } from '../../stores/rootStore'
import {
  CustomTabPanel,
  StyledCloseIcon,
  StyledDrawerContainer,
  StyledHr,
  StyledText,
} from '../balance/Balances'

export const Icons = observer(() => {
  const [isOpen, setIsOpen] = useState(false)
  const [orderIds, setOrderIds] = useState<string[]>([])
  const [tab, setTab] = useState(0)
  const { userStore } = useStore()

  const {
    buyInvoices,
    sellInvoices,
    transferToken,
    tokenBalances,
    operationStatus,
    selectedProduct,
    selectProduct,
    clearSelectedProduct,
  } = userStore

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue)
    clearSelectedProduct()
  }

  const buyPrice = orderIds.reduce((acc, orderId) => {
    const order = buyInvoices.find(({ id }) => id === orderId)
    if (order) {
      return acc + order.price
    } else return acc
  }, 0)

  const handleExpand = (event: any, data: any) => {
    event.stopPropagation()
    selectProduct(data)
  }

  const handleClose = () => {
    setIsOpen(false)
    clearSelectedProduct()
  }
  return (
    <>
      <Drawer anchor="right" open={isOpen} onClose={handleClose}>
        <StyledDrawerContainer>
          <StyledCloseIcon onClick={handleClose} />
          <Tabs value={tab} onChange={handleChange}>
            <Tab label="Заявки на оплату" />
            <Tab label="Заявки на продажу" />
          </Tabs>
          <CustomTabPanel value={tab} index={0}>
            {selectedProduct ? (
              <StyledProductContent>
                <StyledContentColumn>
                  <StyledText isHighlight>{selectedProduct.product}</StyledText>
                  <img src={noImg} height="180px" width="180px" />

                  <StyledContentBlock>
                    <Typography>
                      Описание: {selectedProduct.description}
                    </Typography>
                    <Typography>
                      Количество: {selectedProduct.count} шт.
                    </Typography>
                    <Typography>Цена: {selectedProduct.price}</Typography>
                    <Typography>ГОТП: Китай</Typography>
                    <Typography>Продавец: {selectedProduct.wallet}</Typography>
                  </StyledContentBlock>
                  <StyledButton
                    onClick={() => {
                      clearSelectedProduct()
                    }}
                  >
                    Назад
                  </StyledButton>
                </StyledContentColumn>
              </StyledProductContent>
            ) : (
              <>
                <StyledDrawerContent>
                  <StyledListContainer>
                    {buyInvoices.map(
                      (
                        {
                          id,
                          product,
                          description,
                          dateFrom,
                          dateTo,
                          count,
                          price,
                          currency,
                          wallet,
                        },
                        index,
                      ) => {
                        const isSelected = orderIds.includes(id)
                        return (
                          <StyledContent
                            key={id}
                            isSelected={isSelected}
                            onClick={() => {
                              setOrderIds(ids =>
                                !isSelected
                                  ? [...ids, id]
                                  : ids.filter(orderId => orderId !== id),
                              )
                            }}
                          >
                            <StyledBlock>
                              <Typography>#{index + 1}</Typography>
                              <div>
                                <StyledText isHighlight>{product}</StyledText>
                                <Typography>
                                  {`${count}шт. ${description}`}
                                </Typography>
                              </div>
                            </StyledBlock>
                            <StyledBlock>
                              <Typography>
                                {price} {currency}
                              </Typography>
                              <AccountBalanceWalletIcon />
                              <StyledOpenInNewIcon
                                onClick={e => {
                                  console.log('clocked')
                                  handleExpand(e, {
                                    id,
                                    product,
                                    description,
                                    dateFrom,
                                    dateTo,
                                    count,
                                    price,
                                    currency,
                                    wallet,
                                  })
                                }}
                              />
                            </StyledBlock>
                          </StyledContent>
                        )
                      },
                    )}
                  </StyledListContainer>

                  <StyledHr />

                  <StyledButton
                    disabled={
                      buyPrice === 0 ||
                      buyPrice > tokenBalances['ТТР'] ||
                      operationStatus === 'sending'
                    }
                    onClick={() => {
                      transferToken('ТТР', buyPrice, orderIds)
                    }}
                  >
                    Оплатить поставки
                  </StyledButton>
                </StyledDrawerContent>
              </>
            )}
          </CustomTabPanel>
          <CustomTabPanel value={tab} index={1}>
            {selectedProduct ? (
              <StyledProductContent>
                <StyledContentColumn>
                  <StyledText isHighlight>{selectedProduct.product}</StyledText>
                  <img src={noImg} height="180px" width="180px" />

                  <StyledContentBlock>
                    <Typography>
                      Описание: {selectedProduct.description}
                    </Typography>
                    <Typography>
                      Количество: {selectedProduct.count} шт.
                    </Typography>
                    <Typography>Цена: {selectedProduct.price}</Typography>
                    <Typography>ГОТП: Россия</Typography>
                    <Typography>Продавец: {selectedProduct.wallet}</Typography>
                  </StyledContentBlock>
                  <StyledButton
                    onClick={() => {
                      clearSelectedProduct()
                    }}
                  >
                    Назад
                  </StyledButton>
                </StyledContentColumn>
              </StyledProductContent>
            ) : (
              <StyledDrawerContent>
                <StyledListContainer>
                  {sellInvoices.map(
                    (
                      {
                        id,
                        product,
                        description,
                        dateFrom,
                        dateTo,
                        count,
                        price,
                        currency,
                        wallet,
                      },
                      index,
                    ) => {
                      return (
                        <StyledContent key={id}>
                          <StyledBlock>
                            <Typography>#{index + 1}</Typography>
                            <div>
                              <StyledText isHighlight>{product}</StyledText>
                              <Typography>
                                {`${count}шт. ${description}`}
                              </Typography>
                            </div>
                          </StyledBlock>
                          <StyledBlock>
                            <Typography>
                              {price} {currency}
                            </Typography>
                            <AccountBalanceWalletIcon />
                            <StyledOpenInNewIcon
                              onClick={e => {
                                console.log('clocked')
                                handleExpand(e, {
                                  id,
                                  product,
                                  description,
                                  dateFrom,
                                  dateTo,
                                  count,
                                  price,
                                  currency,
                                  wallet,
                                })
                              }}
                            />
                          </StyledBlock>
                        </StyledContent>
                      )
                    },
                  )}
                </StyledListContainer>
              </StyledDrawerContent>
            )}
          </CustomTabPanel>
        </StyledDrawerContainer>
      </Drawer>
      <Tooltip title="Заказы">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          onClick={() => setIsOpen(value => !value)}
        >
          <path
            d="M14.4968 2.96559C14.8982 2.96559 15.2236 3.28008 15.2236 3.66801C15.2236 4.02362 14.9502 4.31751 14.5954 4.36402L14.4968 4.37043H7.45429C5.07567 4.37043 3.54548 5.89283 3.45752 8.26762L3.45352 8.48584V16.0555C3.45352 18.4929 4.89102 20.0677 7.2384 20.1582L7.45429 20.1623H15.7918C18.1725 20.1623 19.7007 18.6458 19.7886 16.2735L19.7926 16.0555V9.46312C19.7926 9.07518 20.1179 8.7607 20.5193 8.7607C20.8872 8.7607 21.1913 9.02495 21.2394 9.36781L21.2461 9.46312V16.0555C21.2461 19.2308 19.1721 21.4615 16.0188 21.5635L15.7918 21.5672H7.45429C4.2269 21.5672 2.10063 19.4223 2.00348 16.2815L2 16.0555V8.48584C2 5.30904 4.07521 3.07161 7.22732 2.96926L7.45429 2.96559H14.4968ZM16.5473 9.36222C16.8358 9.57822 16.9099 9.96249 16.7363 10.261L16.6767 10.3477L13.8384 13.8882C13.6139 14.1683 13.2139 14.2391 12.9047 14.0687L12.815 14.0103L10.0835 11.9368L7.63115 15.0179C7.40864 15.2974 7.01131 15.3703 6.7019 15.2035L6.61198 15.1463C6.32279 14.9312 6.24735 14.5472 6.41992 14.2481L6.47916 14.1612L9.37954 10.5178C9.60364 10.2364 10.0046 10.1647 10.3145 10.3353L10.4045 10.3938L13.1368 12.4688L15.5277 9.48725C15.7736 9.18059 16.2301 9.12461 16.5473 9.36222ZM19.4106 2.17691C20.8407 2.17691 22 3.2974 22 4.67959C22 6.06178 20.8407 7.18226 19.4106 7.18226C17.9805 7.18226 16.8212 6.06178 16.8212 4.67959C16.8212 3.2974 17.9805 2.17691 19.4106 2.17691ZM19.4106 3.58175C18.7833 3.58175 18.2747 4.07327 18.2747 4.67959C18.2747 5.2859 18.7833 5.77742 19.4106 5.77742C20.0379 5.77742 20.5465 5.2859 20.5465 4.67959C20.5465 4.07327 20.0379 3.58175 19.4106 3.58175Z"
            fill="#0F3F62"
          />
        </svg>
      </Tooltip>
      <Tooltip title="Мониторинг">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          onClick={() => {
            window
              ?.open(
                'http://51.250.29.186:3000/d/a1lVy7ycin9Yv/goquorum-overview?orgId=1',
                '_blank',
              )
              .focus()
          }}
        >
          <path
            d="M7 13.8486V18.1629"
            stroke="#0F3F62"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12.3899 10.7171V18.1629"
            stroke="#0F3F62"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M17.78 7.58554V18.1629"
            stroke="#0F3F62"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </Tooltip>
      <Tooltip title="Обозреватель блоков">
        <StyledSearchIcon
          onClick={() => {
            window?.open('http://51.250.29.186:25000/', '_blank').focus()
          }}
        />
      </Tooltip>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
      >
        <path
          d="M19.7699 14.8622V17.7028C19.7699 18.3457 19.5065 18.9622 19.0377 19.4167C18.5689 19.8713 17.933 20.1266 17.2699 20.1266H5.67993C5.01689 20.1266 4.38101 19.8713 3.91216 19.4167C3.44332 18.9622 3.17993 18.3457 3.17993 17.7028V7.40663C3.17993 6.7638 3.44332 6.14731 3.91216 5.69276C4.38101 5.23821 5.01689 4.98285 5.67993 4.98285H17.2699C17.933 4.98285 18.5689 5.23821 19.0377 5.69276C19.5065 6.14731 19.7699 6.7638 19.7699 7.40663V10.2473"
          stroke="#A5B4CB"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M14.8701 10.2473H19.8701C20.1353 10.2473 20.3897 10.3494 20.5772 10.5313C20.7648 10.7131 20.8701 10.9597 20.8701 11.2168V13.8927C20.8701 14.1498 20.7648 14.3964 20.5772 14.5782C20.3897 14.76 20.1353 14.8622 19.8701 14.8622H14.8701C14.3397 14.8622 13.831 14.6579 13.4559 14.2942C13.0808 13.9306 12.8701 13.4374 12.8701 12.9232V12.1863C12.8701 11.9317 12.9218 11.6795 13.0224 11.4443C13.1229 11.209 13.2702 10.9953 13.4559 10.8152C13.6416 10.6352 13.8621 10.4923 14.1048 10.3949C14.3474 10.2975 14.6075 10.2473 14.8701 10.2473V10.2473Z"
          stroke="#A5B4CB"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M15.5601 12.5547H16.3001"
          stroke="#A5B4CB"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M18 17.8165C18.8811 16.9625 19.5553 15.929 19.9736 14.7911C20.3919 13.6532 20.5438 12.4394 20.4184 11.2375C20.293 10.0356 19.8934 8.87588 19.2485 7.84225C18.6037 6.80863 17.7297 5.92703 16.69 5.26135C15.3871 4.38969 13.8503 3.90526 12.2678 3.86738C10.6853 3.8295 9.12568 4.2398 7.77998 5.04806C6.81419 5.60729 5.97393 6.34868 5.30895 7.22836C4.64397 8.10805 4.16778 9.10813 3.90856 10.1694C3.64935 11.2307 3.61239 12.3316 3.79986 13.407C3.98733 14.4824 4.39542 15.5104 4.99998 16.4301L4.13998 18.4952C4.06724 18.6714 4.04944 18.8644 4.08877 19.0503C4.12811 19.2362 4.22285 19.4068 4.36127 19.541C4.49968 19.6752 4.67567 19.7671 4.86742 19.8052C5.05918 19.8433 5.25826 19.8261 5.43998 19.7556L7.55998 18.9024C9.16855 19.8982 11.0789 20.3332 12.9765 20.1358C14.8742 19.9384 16.6459 19.1204 18 17.8165V17.8165Z"
          stroke="#A5B4CB"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </>
  )
})
const StyledContentBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`
const StyledOpenInNewIcon = styled(OpenInNewIcon)`
  z-index: 9;
`

const StyledSearchIcon = styled(SearchIcon)`
  color: #0f3f62;
`

const StyledListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const StyledContentColumn = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`

export const StyledButton = styled.div<{ disabled?: boolean }>`
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

const StyledDrawerContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 32px;
`

const StyledContent = styled.div<{ isSelected?: boolean }>`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  gap: 12px;
  padding: 15px;
  background: #ebf8ff;
  color: black;
  width: fit-content;
  height: fit-content;
  border-radius: 12px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  ${({ isSelected }) => isSelected && 'outline: 1.5px solid #1976d2'}
`
const StyledBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
`

const StyledProductContent = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 40px;
`
