// next
import { useRouter } from 'next/router';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_CES, PATH_DASHBOARD } from '../../../../routes/paths';
// _mock_
import { _invoices } from '../../../../_mock';
// hooks
import useSettings from '../../../../hooks/useSettings';
// layouts
import Layout from '../../../../layouts';
// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
// sections
import { useOrderDetail } from 'src/hooks/@ces/useOrder';
import OrderDetails from 'src/sections/@ces/order/details';
import { orderApi } from 'src/api-client/order';
import { useSnackbar } from 'notistack';

// ----------------------------------------------------------------------

InvoiceDetails.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function InvoiceDetails() {
  const { themeStretch } = useSettings();
  const { enqueueSnackbar } = useSnackbar()

  const { query, push } = useRouter()
  const { orderId } = query
  const { data, mutate } = useOrderDetail({ id: `${orderId}` })
  const handleEditOrderSubmit = async (id: string, status: number) => {
    try {
      await orderApi.update(id, status)
      mutate()
      enqueueSnackbar('Update success!')

    } catch (error) {
      enqueueSnackbar('Update failed!')
      console.error(error)
    }
  }

  return (
    <Page title="Order: View">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Order Details"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Order',
              href: PATH_DASHBOARD.invoice.root,
            },
            { name: `${orderId}` || '' },
          ]}
        />

        <OrderDetails order={data?.data} handleEditOrderSubmit={handleEditOrderSubmit} />
      </Container>
    </Page>
  );
}
