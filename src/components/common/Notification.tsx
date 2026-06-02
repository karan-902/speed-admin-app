import { Snackbar, Slide } from "@mui/material";
import classNames from "classnames";
import { useReduxDispatch, useReduxSelector } from "../../redux/hooks";
import { hideToast } from "../../redux/error/error.slice";
import AlertMessage from "./AlertMessage/AlertMessage";

interface IAlertProps {
  customClass?: string;
}
export default function Notification({ customClass }: IAlertProps) {
  const dispatch = useReduxDispatch();
  const { open, severity, message, title } = useReduxSelector(
    (state) => state.toast,
  );
  const classes = classNames(customClass, "common-alert");

  const closeNotification = (
    _event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") return;
    dispatch(hideToast());
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={open}
      autoHideDuration={1500}
      onClose={closeNotification}
      slots={{ transition: Slide }}
      slotProps={{ transition: { direction: "left" } }}
    >
      <AlertMessage
        message={message}
        severity={severity}
        variant="standard"
        className={classes}
      >
        {title && title}
      </AlertMessage>
    </Snackbar>
  );
}
