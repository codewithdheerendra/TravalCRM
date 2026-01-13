import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from "@mui/material";
import { useEffect, useState } from "react";

export interface DeleteDialogProp {
    isOpen: boolean;
    message?: string;
    cancelBtnText?: string;
    acceptBtnText?: string;
    onAction: (value: string) => void;
}

export function DeleteDialog({isOpen, cancelBtnText, acceptBtnText, message, onAction}: DeleteDialogProp) {
    const [open, setOpen] = useState<boolean>(isOpen);
    useEffect(() => {
        if(isOpen !== open) setOpen(isOpen);
    }, [isOpen, open]);

    const handleClose = (action: string) => {
        if(onAction) onAction(action);
        setOpen(false);
    }
    return (
        <Dialog open={open} onClose={(event, reason) => {
            console.log(event,reason);
            if(reason !== 'backdropClick') setOpen(false);
        }} disableEscapeKeyDown slotProps={{paper: {sx: {minWidth: {xs: '90dvw', md: '200px'}}}}}>
            <DialogContent>
                <DialogContentText textAlign={"center"} color="text.primary" maxWidth={"90%"} mx={"auto"} sx={{textWrap: "balance"}} gutterBottom>{message || 'Are you sure you want to delete this item?'}</DialogContentText><br/>
                <DialogActions>
                    <Button variant="outlined" size="small" fullWidth onClick={() => handleClose('cancel')}>{cancelBtnText || 'Cancel'}</Button>
                    <Button variant="contained" size="small" fullWidth onClick={() => handleClose('yes')}>{acceptBtnText || 'Delete'}</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
}

DeleteDialog.defaultProps = {
    message: 'Are you sure you want to delete this item?',
    cancelBtnText: 'Cancel',
    acceptBtnText: 'Delete',
}