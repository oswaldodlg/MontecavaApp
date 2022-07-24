import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import useUploadDoc from 'src/hooks/useUploadDoc';
import { CircularProgress, Grid } from '@mui/material';

const MyUploader = ({name, id, order, handleClose, filesArray, setFilesArray, setShowDateContainer}) => {

    const {addDocuments , error, isPending, success } = useUploadDoc()
    
    


    // specify upload params and url for your files
    const getUploadParams = ({ file, meta }) => {
      const body = new FormData()
      body.append('fileField', file)
      return { url: 'https://httpbin.org/post', body }
    }
    
    // called every time a file's `status` changes
    const handleChangeStatus = ({ meta, file }, status) => { 
      console.log(status)
      if (status ==='preparing') {
      return setShowDateContainer(true)
      }
      else if (status === 'done') {
      return setFilesArray([...filesArray, file])
      } else if (status === 'removed'){
        return setShowDateContainer(false)
      }
      // if (status === 'removed')
      // return handleClose()
    }
    
    // receives array of files that are done uploading when submit button is clicked
    const handleSubmit = async (files, allFiles) => {
      //files.map((file) => filesArray.push(file))
      // files.map((file) => {return setFilesArray([...filesArray, file])})
      console.log(filesArray)
      addDocuments(id, name, order, filesArray)
      allFiles.forEach(f => f.remove())
    }

    useEffect(() => {
      !isPending && success && handleClose()
    }, [success, isPending])
    
  
    return (
     <>
      {isPending && !success
        ? 
        <Grid sx={{textAlign: 'center'}}>
          <CircularProgress color='primary' />
        </Grid>
        :<Dropzone
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        onSubmit={handleSubmit}
        accept=".pdf"
        submitButtonContent={"Subir"}
        inputContent={"Arrastra o elige los archivos"}
        inputWithFilesContent={"Agregar Archivo"}
        styles={
          {
          borderColor: 'transparent',
          dropzone: {
            overflow: 'hidden'
          }}
        }
      />}
      
     </>
    )
  }
  

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: {xs: '50vh', md: '150vh'},
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'inline-flex',
  flexDirection: 'row'
  
};

export default function UploadFileModal({name, id, order}) {
  const [open, setOpen] = useState(false);
  const [filesArray, setFilesArray] = useState([])
  const handleOpen = () => setOpen(true);
  const handleClose = () => {setOpen(false)
  setShowDateContainer(false)
  setFilesArray([])
  };
  const [dateContainer, setShowDateContainer] = useState(false)

  const {isPending, success} = useUploadDoc()

  return (
    <>
      <Button variant='contained' onClick={handleOpen}>Agregar Documentos</Button>
      <Modal
        open={open}
        onClose={() => !isPending && handleClose()}
       
      >
        <Box sx={style}>
            <Grid item xs={12} md={12}>
            <MyUploader name={name} id={id} order={order} handleClose={handleClose} filesArray={filesArray} setFilesArray={setFilesArray} setShowDateContainer={setShowDateContainer}/>
            </Grid>
            {/* {dateContainer && 
            <Grid xs={12} md={2} sx={{textAlign: 'center'}}>
              <Typography>
                Fechas
              </Typography>
              {filesArray && filesArray.map((doc) => {
                return (
                  <>
                    <Typography>{doc.name}</Typography>
                  </>
                )
              })}
            </Grid>} */}
            
        </Box>
      </Modal>
    </>
  );
}