import { Container } from '@mui/material'
import { capitalCase } from 'change-case'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { BenefitPayload } from 'src/@types/@ces'
import { benefitApi } from 'src/api-client'
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs'
import Page from 'src/components/Page'
import { useBenefitDetails } from 'src/hooks/@ces'
import useSettings from 'src/hooks/useSettings'
import Layout from 'src/layouts'
import { PATH_CES } from 'src/routes/paths'
import BenefitNewEditForm from 'src/sections/@ces/benefit/BenefitNewEditForm'

// ----------------------------------------------------------------------

BenefitEditPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

// ----------------------------------------------------------------------

export default function BenefitEditPage() {
  const { themeStretch } = useSettings()

  const { enqueueSnackbar } = useSnackbar()

  const { query, push } = useRouter()
  const { benefitId } = query

  const { data, mutate } = useBenefitDetails({ id: `${benefitId}` })

  const handleEditAccountSubmit = async (payload: BenefitPayload) => {
    try {
      await benefitApi.update(`${benefitId}`, payload)
      mutate()
      enqueueSnackbar('Update success!')
      push(PATH_CES.benefit.root)
    } catch (error) {
      enqueueSnackbar('Update failed!')
      console.error(error)
    }
  }

  return (
    <Page title="Benefit: Edit Benefit">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Edit benefit"
          links={[
            { name: 'Dashboard', href: '' },
            { name: 'Benefit', href: '' },
            { name: capitalCase(benefitId as string) },
          ]}
        />

        {!data ? (
          <>Loading...</>
        ) : (
          <BenefitNewEditForm isEdit currentUser={data?.data} onSubmit={handleEditAccountSubmit} />
        )}
      </Container>
    </Page>
  )
}
