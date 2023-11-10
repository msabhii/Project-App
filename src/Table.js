// Table.jsx
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import axios from "axios";

const apiUrl = "https://api.publicapis.org/entries";

const DataTable = () => {
  const [data, setData] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // State to manage form fields in the edit dialog
  const [editedName, setEditedName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedLink, setEditedLink] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(apiUrl);
      setData(response.data.entries);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEditOpen = (item) => {
    setSelectedItem(item);
    setEditedName(item.API);
    setEditedDescription(item.Description);
    setEditedLink(item.Link);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setSelectedItem(null);
  };

  const handleDeleteOpen = (item) => {
    setSelectedItem(item);
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
    setSelectedItem(null);
  };

  const handleCreateOpen = () => {
    setCreateOpen(true);
  };

  const handleCreateClose = () => {
    setCreateOpen(false);
  };

  const handleEditSave = () => {
    // Update the data array with the edited item
    setData((prevData) =>
      prevData.map((item) =>
        item.API === selectedItem.API
          ? {
              ...item,
              API: editedName,
              Description: editedDescription,
              Link: editedLink,
            }
          : item
      )
    );

    handleEditClose();
  };

  const handleDeleteConfirm = () => {
    // Remove the deleted item from the data array
    setData((prevData) =>
      prevData.filter((item) => item.API !== selectedItem.API)
    );

    handleDeleteClose();
  };

  const handleCreateSave = () => {
    // Add the new item to the data array
    setData((prevData) => [
      ...prevData,
      {
        API: editedName,
        Description: editedDescription,
        Link: editedLink,
      },
    ]);

    handleCreateClose();
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleCreateOpen}>
        Create ➕
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Link</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.API}>
                <TableCell>{item.API}</TableCell>
                <TableCell>{item.Description}</TableCell>
                <TableCell>{item.Link}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEditOpen(item)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeleteOpen(item)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onClose={handleEditClose}>
        {/* ... (unchanged) */}
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteOpen} onClose={handleDeleteClose}>
        {/* ... (unchanged) */}
      </Dialog>

      {/* Create Dialog */}
      <Dialog open={createOpen} onClose={handleCreateClose}>
        <DialogTitle>Create New Entry</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Description"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            fullWidth
          />
          <TextField
            label="Link"
            value={editedLink}
            onChange={(e) => setEditedLink(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateClose}>Cancel</Button>
          <Button onClick={handleCreateSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};



export default DataTable;
