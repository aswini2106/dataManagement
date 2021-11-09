import React, {useState} from "react";
import DataTable from 'react-data-table-component';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import CloseIcon from '@material-ui/icons/Close';
import Box from '@material-ui/core/Box/index';
import IconButton from '@material-ui/core/IconButton/index';
import Button from "@material-ui/core/Button/index";
import Grid from "@material-ui/core/Grid/index";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import FileUploadIcon from '@material-ui/icons/CloudUpload';
import Modal from "@material-ui/core/Modal/index";
import 'react-dropzone-uploader/dist/styles.css'
import Typography from "@material-ui/core/Typography";
import Dropzone from 'react-dropzone-uploader';
import * as XLSX from 'xlsx';

const columns = [
    {
        name: 'Date',
        selector: row => row.year,
    },
    {
        name: 'First Name',
        sortable: true,
        selector: row => row.title,
    },
    {
        name: 'Last Name',
        selector: row => row.title,
    },
    {
        name: 'Email',
        selector: row => row.title,
    },
    {
        name: 'Actions',
        selector: row => row.title,
        cell: row => {
            return (
                <div>
                <IconButton color="primary">
                <EditIcon fontSize="small" label="Edit" />
                </IconButton>

                <IconButton>
                <DeleteIcon fontSize="small" label="Delete" />
                </IconButton>
                </div>

            );
        }
    },
];

const data = [
    {
        id: 1,
        title: 'Beetlejuice',
        year: '1988',
    },
    {
        id: 2,
        title: 'Ghostbusters',
        year: '1984',
    },
    {
        id: 3,
        title: 'Beetlejuice',
        year: '1988',
    },
    {
        id: 4,
        title: 'Ghostbusters',
        year: '1984',
    },
    {
        id: 5,
        title: 'Beetlejuice',
        year: '1988',
    },
    {
        id: 6,
        title: 'Ghostbusters',
        year: '1984',
    },
    {
        id: 7,
        title: 'Beetlejuice',
        year: '1988',
    },
    {
        id: 8,
        title: 'Ghostbusters',
        year: '1984',
    },
    {
        id: 9,
        title: 'Beetlejuice',
        year: '1988',
    },
    {
        id: 10,
        title: 'Ghostbusters',
        year: '1984',
    },
    {
        id: 11,
        title: 'Beetlejuice',
        year: '1988',
    },
    {
        id: 12,
        title: 'Ghostbusters',
        year: '1984',
    },
]

const style = {
    position: 'absolute',
    top: '54%',
    left: '52%',
    transform: 'translate(-50%, -50%)',
    width: '93%',
    height: '85%',
    bgcolor: 'background.paper',
    border: '35px solid rgb(0 0 0 / 12%)',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

export default function Table() {
    const [open, setOpen] = React.useState(false);


    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);

    // process CSV data
    const processData = dataString => {
        const dataStringLines = dataString.split(/\r\n|\n/);
        const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);

        const list = [];
        for (let i = 1; i < dataStringLines.length; i++) {
            const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
            if (headers && row.length == headers.length) {
                const obj = {};
                for (let j = 0; j < headers.length; j++) {
                    let d = row[j];
                    if (d.length > 0) {
                        if (d[0] == '"')
                            d = d.substring(1, d.length - 1);
                        if (d[d.length - 1] == '"')
                            d = d.substring(d.length - 2, 1);
                    }
                    if (headers[j]) {
                        obj[headers[j]] = d;
                    }
                }

                // remove the blank rows
                if (Object.values(obj).filter(x => x).length > 0) {
                    list.push(obj);
                }
            }
        }

        // prepare columns list from headers
        let columnsE = headers.map(c => ({
            name: c,
            sortable: true,
            selector: c,
        }));

        columnsE.push({
            name: 'Actions',
            selector: row => row.title,
            cell: row => {
                return (
                    <div>
                        <IconButton color="primary">
                            <EditIcon fontSize="small" label="Edit" />
                        </IconButton>

                        <IconButton>
                            <DeleteIcon fontSize="small" label="Delete" />
                        </IconButton>
                    </div>

                );
            }
        })

        setData(list);
        setColumns(columnsE);
    }




    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    // specify upload params and url for your files
    const getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } }

    // called every time a file's `status` changes
    const handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }

    // receives array of files that are done uploading when submit button is clicked
    const handleSubmit = (files, allFiles) => {
        handleClose();
        console.log(files.map(f => f.meta))
       // allFiles.forEach(f => f.remove())
        handleFileUpload(allFiles);
    }

    // handle file upload
    const handleFileUpload = (files) => {
        debugger
        const file = files[0].file;
        const reader = new FileReader();
        reader.onload = (evt) => {
            /* Parse data */
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, { type: 'binary' });
            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            /* Convert array of arrays */
            const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
            processData(data);
        };
        reader.readAsText(file);
    }

    return (
        <>
            <header className="table-header">
                <Grid container spacing={2}>
                    <Grid item xs={6}>
            <Button color="primary" variant="contained" endIcon={<FileUploadIcon/>} onClick={handleOpen}>Upload Data</Button>
                    </Grid>
                    <Grid item xs={6} container justify="flex-end">

                    <Grid item xs={3} style={{flexBasis:'15%'}}>
            <Button color="primary" variant="outlined"  startIcon={<AddCircleOutlineIcon/>}  >Add</Button>
                    </Grid>
                        <Grid item xs={3} style={{flexBasis:'12%'}}>
                            <Button color="primary" variant="outlined" startIcon={<DeleteIcon />} >Delete</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </header>
        <DataTable
            columns={columns}
            data={data}
            selectableRows
            pagination={data.length > 10}
            paginationTotalRows={data.length}
            paginationPerPage={10}
            defaultSortField='title'
            dense
            paginationRowsPerPageOptions={[10, 15, 20, 25, 30, 50, 100]}

        />
            <Modal
                hideBackdrop
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style }}>
                    <header>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                        <Typography variant="h6" id="parent-modal-title">Upload data</Typography>
                        </Grid>
                        <Grid item xs={6} container justify="flex-end">
                        <Button variant="outlined" startIcon={<CloseIcon />} onClick={handleClose}>Cancel</Button>
                        </Grid>
                    </Grid>
                    </header>


                    <Typography variant="body2" id="parent-modal-title">Only upload xlsx/xls, csv files and not more than 500 kb</Typography>
                    <p id="parent-modal-description">
                        <Dropzone
                            getUploadParams={getUploadParams}
                            onChangeStatus={handleChangeStatus}
                            onSubmit={handleSubmit}
                            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                            styles={{ dropzone: { minHeight: 350, maxHeight: 350 } }}
                        />
                    </p>

                </Box>
            </Modal>
        </>
    );
};