// @mui
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { AccountData, PaymentPayload } from 'src/@types/@ces'
import { paymentApi } from 'src/api-client/payment'
import Iconify from 'src/components/Iconify'
import { fCurrency } from 'src/utils/formatNumber'
import Image from '../../../../components/Image'
// utils

// ----------------------------------------------------------------------

type Props = {
  title?: string
  used: number
  payLoad: PaymentPayload
  data?: AccountData
  color: string
}

export default function UsedAnalytic({ title, used, color, data, payLoad }: Props) {
  const [payment, setPayment] = useState(false)
  // 4c6aefa8-9fcf-4e46-9370-bebdef6ea55c
  // 05C93858-F520-4391-B72B-D48BC5F2990B
  async function handlePayment() {
    payLoad.paymentid = payment
      ? '4c6aefa8-9fcf-4e46-9370-bebdef6ea55c'
      : '05C93858-F520-4391-B72B-D48BC5F2990B'
    try {
      await paymentApi.pay(payLoad).then((res) => {
        console.log('log res.data', res.data)
        window.location.href = `${res.data?.url}`
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Accordion>
      <AccordionSummary
        disableRipple
        disableTouchRipple
        expandIcon={<Iconify icon={'eva:arrow-ios-downward-fill'} width={20} height={20} />}
      >
        <Typography variant="subtitle1">
          <Stack
            direction="row"
            alignItems="left"
            justifyContent="space-between"
            // sx={{ p: 2, width: 1, minWidth: 200 }}
          >
            <Stack spacing={0.5}>
              <Typography variant="h6">{title}</Typography>
              <Typography variant="h6" sx={{ color, fontSize: 24 }}>
                {fCurrency(used)}đ
              </Typography>
              <Typography variant="caption">Expired date: 10/08/2023</Typography>
            </Stack>
          </Stack>
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          {' '}
          <Stack
            direction="row"
            alignItems="left"
            justifyContent="space-between"
            // sx={{ p: 2, width: 1, minWidth: 200 }}
          >
            <Stack
              spacing={0.5}
              direction="row"
              justifyContent="space-between"
              sx={{ width: 1, minWidth: 200 }}
            >
              <Typography variant="overline">Payment Method </Typography>
            </Stack>
          </Stack>
          <Stack spacing={2} sx={{ py: 3 }} direction={{ xs: 'column', md: 'row' }}>
            {data?.wallets?.map((x) => (
              <>
                <Box
                  key={x.id}
                  onClick={() => setPayment(!payment)}
                  sx={{
                    p: 3,
                    width: 1,
                    borderRadius: '8px',
                    position: 'relative',
                    border: (theme) =>
                      `solid 4px  ${payment ? theme.palette.info.main : theme.palette.grey[50032]}`,
                  }}
                >
                  <Image alt="icon" src={'/vnpay.svg'} sx={{ mb: 1, maxWidth: 72 }} />
                  <Typography variant="subtitle1">{fCurrency(x.used)}đ</Typography>
                </Box>
                <Paper
                  key={x.id}
                  onClick={() => setPayment(!payment)}
                  sx={{
                    p: 3,
                    width: 1,
                    borderRadius: '8px',
                    position: 'relative',
                    border: (theme) =>
                      `solid 4px  ${
                        !payment ? theme.palette.info.main : theme.palette.grey[50032]
                      }`,
                  }}
                >
                  <Image alt="icon" src={'/zalopay.svg'} sx={{ mb: 1, maxWidth: 72 }} />
                  <Typography variant="subtitle1">{fCurrency(x.used)}đ</Typography>
                </Paper>
              </>
            ))}
          </Stack>
          <Stack>
            {' '}‚
            <Stack>
              <Button variant="contained" color="info" onClick={handlePayment}>
                Payment
              </Button>
            </Stack>
          </Stack>
        </Typography>
      </AccordionDetails>
    </Accordion>
  )
}
