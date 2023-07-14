import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { UseFormSetValue } from 'react-hook-form'
import { AccountPayload } from 'src/@types/@ces'
import { storage } from 'src/contexts/FirebaseContext'
import { v4 } from 'uuid'
interface uploadImageAccountProps {
  setValue: UseFormSetValue<AccountPayload>
  acceptedFiles: File[]
}
const uploadImageAccount = async ({ setValue, acceptedFiles }: uploadImageAccountProps) => {
  const file: File = acceptedFiles[0]
  const imageRef = ref(storage, `image/${file?.name + v4()}`)
  if (file) {
    await uploadBytes(imageRef, file!).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setValue('imageUrl', url)
      })
    })
  }
}

export default uploadImageAccount
