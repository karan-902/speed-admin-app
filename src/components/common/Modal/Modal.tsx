import * as React from "react";
import "./modal.scss";
import {
    Dialog as CustomDialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    type DialogProps,
} from "@mui/material";
import IconButton from "../IconButton/IconButton";
import { buttonIcons } from "../../images";
import Text from "../Text/Text";
import classNames from "classnames";
import Button from "../Button/Button";
import AppBar from "../AppBar/AppBar";
import Box from "../Box/Box";
import Slide from "@mui/material/Slide";
import type { TransitionProps } from "@mui/material/transitions";
interface IDialogProps extends Omit<DialogProps, "onSubmit"> {
    title: string;
    buttonLabel: "Save" | "Add" | string;
    disabled?: boolean;
    open: boolean;
    customClass?: string;
    variant?: "default" | "fullscreen";
    children: React.ReactNode;
    isForm?: boolean;
    onSubmit?: () => void;
    onClose: () => void;
}
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children: React.ReactElement },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function Modal({
    open,
    title,
    children,
    onClose,
    onSubmit,
    customClass,
    isForm = false,
    variant = "default",
    buttonLabel,
    disabled,
    ...props
}: IDialogProps) {
    const isFullscreen = variant === "fullscreen";
    const classes = classNames("modal", customClass);

    const actionButtonProps = {
        disabled,
        label: buttonLabel,
        type: (isForm ? "submit" : "button") as "submit" | "button",
        onClick: !isForm ? onSubmit : undefined,
    };

    const renderModalBody = () => {
        if (isFullscreen) {
            return (
                <>
                    <AppBar customClass="modal-app-bar">
                        <IconButton onClick={onClose} customClass="close mr-11">
                            {buttonIcons.close}
                        </IconButton>
                        <Text
                            flex={1}
                            customClass="dialog-title divider flex-text"
                        >
                            {title}
                        </Text>

                        <Button
                            customClass="fullscreen-action-button"
                            {...actionButtonProps}
                        />
                    </AppBar>

                    <Box customClass="fullscreen-modal-box">
                        <Box customClass="modal-content"> {children}</Box>
                    </Box>
                </>
            );
        }
        return (
            <Box
                component={isForm ? "form" : "div"}
                className={classNames({ "form-modal": isForm })}
                {...(isForm ? { onSubmit } : {})}
            >
                <DialogTitle>
                    <Text customClass="dialog-title">{title}</Text>
                    <IconButton onClick={onClose}>
                        {buttonIcons.close}
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>{children}</DialogContent>
                {buttonLabel && (
                    <DialogActions>
                        <Button
                            customClass="normal-action-button button-create-submit"
                            {...actionButtonProps}
                        />
                    </DialogActions>
                )}
            </Box>
        );
    };
    return (
        <CustomDialog
            {...props}
            open={open}
            onClose={onClose}
            fullScreen={isFullscreen}
            className={classes}
            slots={{ transition: isFullscreen ? Transition : undefined }}
        >
            {renderModalBody()}
        </CustomDialog>
    );
}
