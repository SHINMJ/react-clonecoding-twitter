import React, {
  useImperativeHandle,
  forwardRef,
  useState,
  useRef,
  useEffect,
} from 'react'
import { v4 as uuidv4 } from 'uuid'
import { storageService } from 'myFirebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'

const Attachment = ({ user, label = 'upload', url = '' }, ref) => {
  const [attachment, setAttachment] = useState(url)
  const fileInputRef = useRef()

  useImperativeHandle(ref, () => ({
    upload: async () => {
      if (attachment === '') {
        return ''
      }

      const attachmentRef = storageService
        .ref()
        .child(`${user.uid}/${uuidv4()}`)
      try {
        const result = await attachmentRef.putString(attachment, 'data_url')

        if (result) {
          setAttachment('')
          return await result.ref.getDownloadURL()
        }
      } catch (error) {
        console.log(error)
      }
    },
  }))

  const handleFileChange = (event) => {
    const {
      target: { files },
    } = event

    const theFile = files[0]
    const reader = new FileReader()
    reader.onloadend = (finishedEvent) => {
      const { currentTarget } = finishedEvent
      setAttachment(currentTarget.result)
    }

    reader.readAsDataURL(theFile)
  }

  const handleClearPhoto = (event) => {
    event.preventDefault()
    setAttachment(null)
  }

  const handleClick = (event) => {
    event.preventDefault()
    fileInputRef.current.click()
  }

  return (
    <>
      <label htmlFor='attach-file' className='factoryInput__label'>
        <span>{label}</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>
      <input
        id='attach-file'
        ref={fileInputRef}
        type='file'
        accept='image/*'
        multiple={false}
        onChange={handleFileChange}
        style={{
          opacity: 0,
        }}
      />

      {attachment && (
        <div className='factoryForm__attachment'>
          <img
            src={attachment}
            style={{
              backgroundImage: attachment,
            }}
          />
          <div className='factoryForm__clear' onClick={handleClearPhoto}>
            <span>Remove</span>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}
    </>
  )
}

export default forwardRef(Attachment)
