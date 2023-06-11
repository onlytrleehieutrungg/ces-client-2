// next
import { useRouter } from 'next/router';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
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
import Invoice from '../../../../sections/@ces/order/details';
import { useOrderDetail } from 'src/hooks/@ces/useOrder';

// ----------------------------------------------------------------------

InvoiceDetails.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function InvoiceDetails() {
  const { themeStretch } = useSettings();

  const { query, push } = useRouter()
  const { orderId } = query
  const { data } = useOrderDetail({ id: `${orderId}` })
  // const handleEditProductSubmit = async (payload: Product) => {
  //   try {
  //     await productApi.update(`${productId}`, payload)
  //     // await update(data?.data.id, payload)
  //     enqueueSnackbar('Update success!')
  //     push(PATH_CES.product.root)
  //   } catch (error) {
  //     enqueueSnackbar('Update failed!')
  //     console.error(error)
  //   }
  // }

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

        <Invoice order={data?.data} />
      </Container>
    </Page>
  );
}
