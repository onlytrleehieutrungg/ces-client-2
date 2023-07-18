import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { UseFormSetValue } from 'react-hook-form'
import { CategoryPayload } from 'src/@types/@ces'
import { storage } from 'src/contexts/FirebaseContext'
import { v4 } from 'uuid'
interface uploadImageCategoryProps {
  setValue: UseFormSetValue<CategoryPayload>
  acceptedFiles: File[]
}
const uploadImageCategory = async ({ setValue, acceptedFiles }: uploadImageCategoryProps) => {
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

export default uploadImageCategory
