// @mui

import AccountTableCustom from "../../account/AccountTableCustom"

// ----------------------------------------------------------------------

type Props = {
  any?: any
}

export default function ProjectMember({}: Props) {
  // const { enqueueSnackbar } = useSnackbar()
  // const { data } = useAccount()
  // const accountList = data?.data || []

  return (
    <>
      <AccountTableCustom />
    </>
  )
}
