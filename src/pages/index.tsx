// // @mui
// import { styled } from '@mui/material/styles'
// // layouts
// import Layout from '../layouts'
// // components
// import Page from '../components/Page'
// // sections
// import {
//   HomeHero,
//   HomeMinimal,
//   HomeDarkMode,
//   HomeLookingFor,
//   HomeColorPresets,
//   HomePricingPlans,
//   HomeAdvertisement,
//   HomeCleanInterfaces,
//   HomeHugePackElements,
// } from '../sections/home'

// // ----------------------------------------------------------------------

// const ContentStyle = styled('div')(({ theme }) => ({
//   overflow: 'hidden',
//   position: 'relative',
//   backgroundColor: theme.palette.background.default,
// }))

// // ----------------------------------------------------------------------

// HomePage.getLayout = function getLayout(page: React.ReactElement) {
//   return <Layout variant="main">{page}</Layout>
// }

// // ----------------------------------------------------------------------

// export default function HomePage() {
//   return (
//     <Page title="The starting point for your next project">
//       <HomeHero />

//       <ContentStyle>
//         <HomeMinimal />

//         <HomeHugePackElements />

//         <HomeDarkMode />

//         <HomeColorPresets />

//         <HomeCleanInterfaces />

//         <HomePricingPlans />

//         <HomeLookingFor />

//         <HomeAdvertisement />
//       </ContentStyle>
//     </Page>
//   )
// }

import { useEffect } from 'react'
// next
import { useRouter } from 'next/router'
// config
import { PATH_AFTER_LOGIN } from '../config'

// ----------------------------------------------------------------------

export default function Index() {
  const { pathname, replace, prefetch } = useRouter()

  useEffect(() => {
    if (pathname === '/') {
      replace(PATH_AFTER_LOGIN)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    prefetch(PATH_AFTER_LOGIN)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
