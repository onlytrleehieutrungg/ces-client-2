import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import { useConfirmDialogStore } from 'src/utils/confirmDialog'

export default function ConfirmDialog() {
  const { message, onSubmit, close } = useConfirmDialogStore()

  return (
    <Dialog open={Boolean(onSubmit)} onClose={close} fullWidth>
      <DialogTitle>Confirm this action</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancel</Button>
        <Button
          onClick={() => {
            if (onSubmit) {
              onSubmit()
            }
            close()
          }}
          autoFocus
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}
