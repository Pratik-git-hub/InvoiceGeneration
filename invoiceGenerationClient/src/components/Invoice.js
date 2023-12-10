import { useState, useContext } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import Backdrop from '@mui/material/Backdrop';
import { useNavigate } from "react-router-dom";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import Download from "@mui/icons-material/Download";
import { DataContext } from "../Context/DataContext";
import BasicInput from "./BasicInput";
import BackDrop from "./BackDrop";

export default function Invoice() {
  const navigate = useNavigate();

  let { data, setData } = useContext(DataContext);
  let { rows, setRows } = useContext(DataContext);

  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [rowModesModel, setRowModesModel] = useState({});
  const [open, setOpen] = useState(false);

  function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
      const id = rows.length + 1;
      setRows((oldRows) => [
        ...oldRows,
        {
          id: id,
          Particulars: "",
          HSNSACCode: "",
          Units: "",
          Qty: "",
          rate: "",
          Cgst: "",
          Sgst: "",
        },
      ]);
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
      }));
    };

    return (
      <GridToolbarContainer>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
          Add record
        </Button>
        <Button variant="outlined" startIcon={<Download />} onClick={generate}>
          Generate{" "}
        </Button>
        <Button variant="outlined" startIcon={<Download />} onClick={view}>
          View{" "}
        </Button>
      </GridToolbarContainer>
    );
  }

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    if (rows.length === 0) {
      return;
    }
    setRows((prevRows) => {
      const rowToDeleteIndex = id - 1;
      return [
        ...rows.slice(0, rowToDeleteIndex),
        ...rows.slice(rowToDeleteIndex + 1),
      ];
    });
    setRows((prevRows) =>
      prevRows.map((row, index) => {
        return { ...row, id: index + 1 };
      })
    );
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: "id", width: 80, headerAlign: "left" },
    { field: "Particulars", editable: true, width: 250, headerAlign: "left" },
    {
      field: "HSNSACCode",
      headerName: "HSN/SAC Code",
      headerAlign: "left",
      editable: true,
      width: 200,
    },
    { field: "Units", editable: true, headerAlign: "left", width: 160 },
    {
      field: "Qty",
      type: "number",
      headerAlign: "left",
      editable: true,
      width: 140,
    },
    {
      field: "rate",
      type: "number",
      headerAlign: "left",
      editable: true,
      width: 140,
    },
    {
      field: "Cgst",
      type: "number",
      headerAlign: "left",
      editable: true,
      width: 140,
    },
    {
      field: "Sgst",
      type: "number",
      headerAlign: "left",
      editable: true,
      width: 140,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const handleChangeData = (event) => {
    let { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const generate = () => {
    let flag = true;
    for (let i in rows) {
      console.log("i  : ", rows[i]);
      if (rows[i].Particulars === "") {
        flag = false;
        break;
      }
    }
    console.log("data.InvoiceNo", data.InvoiceNo, "  ", flag);
    if (data.InvoiceNo && flag) {
      setOpen(true)
      axios
        .post("/generate", { data: data, rows: rows }, { responseType: "blob" })
        .then((res) => {
          // downloadFile(res,"qw.pdf")
          if (res.data.error) {
            console.error(res.data.error);
          }

          const href = URL.createObjectURL(res.data);

          // create "a" HTML element with href to file & click
          const link = document.createElement("a");
          link.href = href;
          link.setAttribute("download", `${data.InvoiceNo}.pdf`); //or any other extension
          document.body.appendChild(link);
          link.click();

          // clean up "a" element & remove ObjectURL
          document.body.removeChild(link);
          URL.revokeObjectURL(href);
          setOpen(false)
        })
        .catch((error) => {
          setOpen(false)
          setAlert(true);
          console.log("sdffffffffffffffffff");
          setAlertMessage("Internal Server Error");
        });
    } else {
      console.log("ddddddddddddddddddd", flag);
      setAlert(true);
      if (!flag) {
        console.log("iff");
        setAlertMessage("Please Add Atleast one product");
      } else {
        console.log("else");
        setAlertMessage("Invoice No can't be empty");
      }
    }
  };

  const view = async () => {
    navigate("/view", { state: { data, rows } });
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <Paper elevation={3} sx={{ margin: "60px 60px 60px 60px " }}>
      {alert && (
        <Alert
          onClose={() => {
            setAlert(false);
          }}
          severity="warning"
        >
          {alertMessage}
        </Alert>
      )}
      <h2>Invoice Generator</h2>

      <BasicInput handleChangeData={handleChangeData} data setData />
      <Box
        sx={{
          height: 500,
          width: "100%",
          "& .actions": {
            color: "text.secondary",
          },
          "& .textPrimary": {
            color: "text.primary",
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          showColumnVerticalBorder
          showCellVerticalBorder
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          slots={{
            toolbar: EditToolbar,
          }}
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
        />
      </Box>
      {open && <BackDrop open/>}
    </Paper>
  );
}
