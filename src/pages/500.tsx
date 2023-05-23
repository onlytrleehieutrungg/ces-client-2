import { NextPageWithLayout } from '@/@types'
import { EmptyLayout, MainLayout } from '@/components/layouts'

const Page500: NextPageWithLayout = () => {
  return <>Hello from Page500</>
}

Page500.Layout = MainLayout

export default Page500
