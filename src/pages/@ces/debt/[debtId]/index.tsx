// next
// @mui
import { Container } from '@mui/material';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { Role } from 'src/@types/@ces';
import { orderApi } from 'src/api-client/order';
import LoadingScreen from 'src/components/LoadingScreen';
import RoleBasedGuard from 'src/guards/RoleBasedGuard';
import { useDebtDetail } from 'src/hooks/@ces/useDebt';
// sections
import { useOrderDetail } from 'src/hooks/@ces/useOrder';
import DebtDetails from 'src/sections/@ces/debt/detail';
import OrderDetails from 'src/sections/@ces/order/details';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
// components
import Page from '../../../../components/Page';
// hooks
import useSettings from '../../../../hooks/useSettings';
// layouts
import Layout from '../../../../layouts';
// routes
import { PATH_CES, PATH_DASHBOARD } from '../../../../routes/paths';

// ----------------------------------------------------------------------

DebtDetail.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function DebtDetail() {
  const { themeStretch } = useSettings();
  const { enqueueSnackbar } = useSnackbar()

  const { query, push } = useRouter()
  const { debtId } = query
  const { data, mutate, isLoading } = useDebtDetail({ id: `${debtId}` })
 
  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <RoleBasedGuard hasContent roles={[Role['System Admin']]}>
      <Page title="Debt: View">
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <HeaderBreadcrumbs
            heading="Debt Details"
            links={[
              { name: 'Dashboard', href: PATH_CES.debt.root },
              {
                name: 'Debt',
                href: PATH_CES.debt.root,
              },
              { name: `${debtId}` || '' },
            ]}
          />

          <DebtDetails debt={data?.data} />
        </Container>
      </Page>
    </RoleBasedGuard>
  );
}
