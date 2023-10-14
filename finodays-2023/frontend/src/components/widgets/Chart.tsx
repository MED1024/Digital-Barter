import styled from '@emotion/styled'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { MenuItem, Select } from '@mui/material'
import ReactECharts from 'echarts-for-react'
import lock from '../../assets/lock.svg'

export const Chart = () => {
  const options = {
    textStyle: {
      fontFamily: 'Roboto',
    },
    grid: {
      top: 10,
      right: 40,
      left: 22,
      bottom: 25,
    },
    tooltip: {
      axisPointer: {
        type: 'cross',
      },
    },
    toolbox: {
      show: true,
      right: '30',
      feature: {
        magicType: {
          title: {
            line: 'Линейный режим',
            bar: 'Столбчатый режим',
          },
          type: ['line', 'bar'],
        },
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: [
        '19 АВГ',
        '20 АВГ',
        '21 АВГ',
        '22 АВГ',
        '23 АВГ',
        '24 АВГ',
        '25 АВГ',
        '26 АВГ',
        '27 АВГ',
        '28 АВГ',
        '29 АВГ',
      ],
    },
    yAxis: {
      type: 'value',
      splitNumber: 3,
      splitLine: false,
      axisLabel: {
        formatter: (value: number) => {
          return value >= 1000 ? value / 1000 + 'k' : value
        },
      },
    },
    series: [
      {
        // symbol: 'none',
        type: 'line',
        lineStyle: {
          width: 3,
        },
        areaStyle: {
          color: '#62d2ff13',
        },
        smooth: true,
        symbolSize: 1,
        color: '#62D2FF',
        data: [
          1000, 1500, 2300, 1000, 1500, 2300, 2240, 2180, 1350, 1470, 2600,
        ],
      },
    ],
  }
  return (
    <StyledContainer>
      <StyledTitleContainer>
        <StyledBlock>
          <StyledTitle>ТТР / ₽</StyledTitle>
          <StyledHelp>1 ТТР = 1 гр. золота</StyledHelp>
        </StyledBlock>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={1}
          label="Age"
        >
          <MenuItem value={1}>Дневной</MenuItem>
          <MenuItem value={2}>Месячный</MenuItem>
          <MenuItem value={3}>Годовой</MenuItem>
        </Select>
      </StyledTitleContainer>
      <ReactECharts option={options} style={{ height: 240 }} />
      <StyledBottomContainer>
        <StyledFull>
          Полный график <KeyboardArrowRightIcon />
        </StyledFull>
        <StyledQuestion>
          Как зафиксировать курс ?
          <img src={lock} />
        </StyledQuestion>
      </StyledBottomContainer>
    </StyledContainer>
  )
}
const StyledQuestion = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  text-wrap: nowrap;
  color: #0f3f62;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 0.12px;
  align-items: center;
  padding-right: 33px;
  cursor: pointer;
`
const StyledFull = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  color: #7c8db5;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 0.12px;
  cursor: pointer;
`
const StyledBottomContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const StyledHelp = styled.div`
  color: #7c8db5;
  font-size: 8px;
  font-style: normal;
  font-weight: 500;
  line-height: 3;
  letter-spacing: 0.08px;
`

const StyledTitle = styled.div`
  color: #0f3f62;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 0.32px;
`

const StyledBlock = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`
const StyledTitleContainer = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
  padding-right: 33px;

  .MuiSelect-select {
    padding: 5.5px 31px 5.5px 14px !important;
  }
  .MuiInputBase-root {
    border-radius: 11px;
  }
`
const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 7;
  /* width: 70%; */
`
