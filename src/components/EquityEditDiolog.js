import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

const EquityEditDialog = ({ open, onClose, onSubmit, editData, handleInputChange }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edit Equity Data</DialogTitle>
            <DialogContent>
                {Object.keys(editData).map((key) => (
                    key !== "securityId" && (
                        <TextField
                            key={key}
                            name={key}
                            label={key.charAt(0).toUpperCase() + key.slice(1)}
                            fullWidth
                            margin="dense"
                            value={editData[key] || ""}
                            onChange={handleInputChange}
                        />
                    )
                ))}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">Cancel</Button>
                <Button onClick={onSubmit} color="primary">Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EquityEditDialog;
