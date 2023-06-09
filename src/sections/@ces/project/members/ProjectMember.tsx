// @mui
import {
  Button,
  Card,
  CardHeader,
  Checkbox,
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import Iconify from 'src/components/Iconify'
import { useAccount } from 'src/hooks/@ces'

// ----------------------------------------------------------------------

type Props = {
  any?: any
}

export default function ProjectMember({}: Props) {
  // const { enqueueSnackbar } = useSnackbar()
  const { data } = useAccount()
  const accountList = data?.data || []

  return (
    <Card>
      <EnhancedTransferList accountList={accountList} />
    </Card>
  )
}

// ----------------------------------------------------------------------

function not(a: number[], b: number[]) {
  return a.filter((value) => b.indexOf(value) === -1)
}

function intersection(a: number[], b: number[]) {
  return a.filter((value) => b.indexOf(value) !== -1)
}

function union(a: number[], b: number[]) {
  return [...a, ...not(b, a)]
}

type EnhancedTransferListProps = {
  accountList: any
}

function EnhancedTransferList({ accountList }: EnhancedTransferListProps) {
  const [checked, setChecked] = useState<number[]>([])
  const [left, setLeft] = useState<any[]>(accountList)
  const [right, setRight] = useState<any[]>([])
  const leftChecked = intersection(checked, left)
  const rightChecked = intersection(checked, right)

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }

  const numberOfChecked = (items: number[]) => intersection(checked, items).length

  const handleToggleAll = (items: number[]) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items))
    } else {
      setChecked(union(checked, items))
    }
  }

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked))
    setLeft(not(left, leftChecked))
    setChecked(not(checked, leftChecked))
  }

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked))
    setRight(not(right, rightChecked))
    setChecked(not(checked, rightChecked))
  }

  const customList = (title: React.ReactNode, items: number[]) => (
    <Card sx={{ borderRadius: 1.5 }}>
      <CardHeader
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
            disabled={items.length === 0}
            inputProps={{ 'aria-label': 'all items selected' }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
        sx={{ p: 2 }}
      />

      <Divider />

      <List
        dense
        component="div"
        role="list"
        sx={{
          width: 200,
          height: 220,
          overflow: 'auto',
        }}
      >
        {items.map((value: any) => {
          const labelId = `transfer-list-all-item-${value}-label`
          return (
            <ListItemButton key={value} role="listitem" onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId}>{value.name}</ListItemText>
            </ListItemButton>
          )
        })}
      </List>
    </Card>
  )

  return (
    <Grid container alignItems="center" sx={{ width: 'auto', p: 3 }}>
      <Grid item>{customList('Choices', left)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center" sx={{ p: 3 }}>
          <Button
            color="inherit"
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
            sx={{ my: 1 }}
          >
            <Iconify icon={'eva:arrow-ios-forward-fill'} width={18} height={18} />
          </Button>
          <Button
            color="inherit"
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
            sx={{ my: 1 }}
          >
            <Iconify icon={'eva:arrow-ios-back-fill'} width={18} height={18} />
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList('Chosen', right)}</Grid>
    </Grid>
  )
}
