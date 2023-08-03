// @mui
import { alpha, useTheme, styled } from '@mui/material/styles'
import { Box, Card, Typography, Stack, CardProps } from '@mui/material'
// utils
import { fNumber, fPercent } from '../../../../utils/formatNumber'
// components
import Iconify from '../../../../components/Iconify'
import ReactApexChart from '../../../../components/chart'

// ----------------------------------------------------------------------

const IconWrapperStyle = styled('div')(({ theme }) => ({
  width: 24,
  height: 24,
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.success.main,
  backgroundColor: alpha(theme.palette.success.main, 0.16),
}))

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title: string
  total: number
  percent?: number
  chartColor: string
  chartData: number[]
}

export default function AppWidgetSummary({
  title,
  percent,
  total,
  chartColor,
  chartData,
  sx,
  ...other
}: Props) {
  const theme = useTheme()

  const chartOptions = {
    colors: [chartColor],
    chart: { sparkline: { enabled: true } },
    plotOptions: { bar: { columnWidth: '68%', borderRadius: 2 } },
    tooltip: {
      x: { show: false },
      y: {
        formatter: (seriesName: number | string) => fNumber(seriesName),
        title: {
          formatter: (seriesName: number | string) => '',
        },
      },
      marker: { show: false },
    },
  }

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3, ...sx }} {...other}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h6">{title}</Typography>

        {percent ? (
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2, mb: 1 }}>
            <IconWrapperStyle
              sx={{
                ...(percent < 0 && {
                  color: 'error.main',
                  bgcolor: alpha(theme.palette.error.main, 0.16),
                }),
              }}
            >
              <Iconify
                width={16}
                height={16}
                icon={percent >= 0 ? 'eva:trending-up-fill' : 'eva:trending-down-fill'}
              />
            </IconWrapperStyle>

            <Typography component="span" variant="subtitle2">
              {percent > 0 && '+'}
              {fPercent(percent)}
            </Typography>
          </Stack>
        ) : (
          <Box sx={{ mt: 2, mb: 1 }} />
        )}

        <Typography variant="h3">{fNumber(total)}</Typography>
      </Box>

      <ReactApexChart
        type="bar"
        series={[{ data: chartData }]}
        options={chartOptions}
        width={60}
        height={36}
      />
    </Card>
  )
}
