import {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import useUploadDoc from 'src/hooks/useUploadDoc';

const MyUploader = ({name, id}) => {

    const {addDocuments , error, isPending, success} = useUploadDoc()
    const [filesArray, setFilesArray] = useState([])

    // specify upload params and url for your files
    const getUploadParams = ({ file, meta }) => {
      const body = new FormData()
      body.append('fileField', file)
      return { url: 'https://httpbin.org/post', body }
    }
    
    // called every time a file's `status` changes
    const handleChangeStatus = ({ meta, file }, status) => { 
      if (status === 'done')
      return setFilesArray([...filesArray, file])
    }
    
    // receives array of files that are done uploading when submit button is clicked
    const handleSubmit = async (files, allFiles) => {
      //files.map((file) => filesArray.push(file))
      // files.map((file) => {return setFilesArray([...filesArray, file])})
      console.log(filesArray)
      addDocuments(id, name, filesArray)
      allFiles.forEach(f => f.remove())
    }
  
    return (
      <Dropzone
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        onSubmit={handleSubmit}
        accept=".pdf"
        submitButtonContent={"Subir"}
        inputContent={"Arrastra o elige los archivos"}
        inputWithFilesContent={"Agregar Archivo"}
        styles={
          {
          dropzone: {
            overflow: 'hidden'
          }}
        }
      />
    )
  }
  

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: {xs: '50vh', md: '70vh'},
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({name, id}) {
  const [open, setOpen] = useState(false);
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button variant='contained' onClick={handleOpen}>Agregar Documento</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <MyUploader name={name} id={id}/>
        </Box>
      </Modal>
    </div>
  );
}