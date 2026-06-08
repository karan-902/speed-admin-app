import {
    Archive,
    ArchiveRestore,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    ChevronUp,
    Eye,
    LayoutGrid,
    LogOut,
    Mail,
    Package,
    Pencil,
    Plus,
    Settings,
    Trash2,
    User,
    UserCog,
    X,
} from "lucide-react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import WarningIcon from "@mui/icons-material/Warning";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import InfoIcon from "@mui/icons-material/Info";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import { SvgIcon, type SvgIconProps } from "@mui/material";
export const vector =
    import.meta.env.VITE_APP_IMAGE_ICON_DEV_URL + "/app/vector.png";
export const logo =
    import.meta.env.VITE_APP_IMAGE_ICON_S3_URL + "/chrome-wallet/logo.svg";
export const qrLogo =
    import.meta.env.VITE_APP_IMAGE_ICON_S3_URL + "/chrome-wallet/qr-logo.svg";
export const logoWhite =
    import.meta.env.VITE_APP_IMAGE_ICON_S3_URL +
    "/chrome-wallet/logo-white.svg";
export const line =
    import.meta.env.VITE_APP_IMAGE_ICON_S3_URL + "/chrome-wallet/line.svg";
export const fill =
    import.meta.env.VITE_APP_IMAGE_ICON_S3_URL + "/chrome-wallet/Fill.svg";
export const rotationIcon =
    import.meta.env.VITE_APP_IMAGE_ICON_S3_URL +
    "/chrome-wallet/3d_rotation_icon.svg";
export const sentIcon =
    import.meta.env.VITE_APP_IMAGE_ICON_S3_URL + "/chrome-wallet/sent.svg";
export const receiveIcon =
    import.meta.env.VITE_APP_IMAGE_ICON_S3_URL + "/chrome-wallet/receive.svg";
export const bitCoinSymbol =
    import.meta.env.VITE_APP_IMAGE_ICON_S3_URL + "/chrome-wallet/BitCoin.svg";
export const defaultUser =
    import.meta.env.VITE_APP_IMAGE_ICON_S3_URL +
    "/chrome-wallet/default-user.svg";
export const getStartedBgImage =
    import.meta.env.VITE_APP_IMAGE_ICON_S3_URL +
    "/chrome-wallet/get-started-bgimage.svg";
export const checkEmail =
    import.meta.env.VITE_APP_IMAGE_ICON_S3_URL +
    "/chrome-wallet/check-email.svg";
export const speedPreloader =
    import.meta.env.VITE_APP_IMAGE_ICON_S3_URL +
    "/chrome-wallet/speed-preloader.gif";
export const attentionIcon =
    import.meta.env.VITE_APP_IMAGE_ICON_S3_URL +
    "/chrome-wallet/attention-icon.svg";
export const timerIcon =
    import.meta.env.VITE_APP_IMAGE_ICON_S3_URL +
    "/chrome-wallet/timer-icon.svg";
export const personCancel =
    import.meta.env.VITE_APP_IMAGE_ICON_S3_URL +
    "/chrome-wallet/person-cancel.svg";
export const adminPanelSettings =
    import.meta.env.VITE_APP_IMAGE_ICON_S3_URL +
    "/chrome-wallet/admin-panel-settings.svg";
export const taskAlt =
    import.meta.env.VITE_APP_IMAGE_ICON_S3_URL + "/chrome-wallet/task-alt.svg";
export const logoWithName =
    import.meta.env.VITE_APP_IMAGE_ICON_S3_URL +
    "/chrome-wallet/App-Marketplace.svg";
export const fillGrey =
    import.meta.env.VITE_APP_IMAGE_ICON_S3_URL + "/app/fill-gray.svg";
export const bitCoinGrey =
    import.meta.env.VITE_APP_IMAGE_ICON_S3_URL + "/app/bitcoin-gray.svg";
export const noPendingTransactionIcon =
    import.meta.env.VITE_APP_IMAGE_ICON_S3_URL +
    "/chrome-wallet/no-pending-confirmation-icon.svg";
export const hourGlass =
    import.meta.env.VITE_APP_IMAGE_ICON_S3_URL +
    "/chrome-wallet/pending-transaction-icon.svg";
export const speedLogo =
    import.meta.env.VITE_APP_IMAGE_ICON_S3_URL +
    "/chrome-wallet/speed-logo.svg";
export const googleIcon =
    import.meta.env.VITE_APP_IMAGE_ICON_S3_URL +
    "/chrome-wallet/google-icon.svg";
export const appleIcon =
    import.meta.env.VITE_APP_IMAGE_ICON_S3_URL +
    "/chrome-wallet/apple-icon.svg";
export const pendingConfirmationIconNew =
    import.meta.env.VITE_APP_IMAGE_ICON_S3_URL +
    "/chrome-wallet/pending-confirmation.svg";
export const ethereumIcon =
    import.meta.env.VITE_APP_IMAGE_ICON_S3_URL +
    "/chrome-wallet/ethereum-icon-svg.svg";
export const welcomeToSpeedIcon =
    import.meta.env.VITE_APP_IMAGE_ICON_S3_URL +
    "/chrome-wallet/welcome-to-speed-icon.svg";
export const maintenanceImage =
    import.meta.env.VITE_APP_IMAGE_ICON_S3_URL +
    "/chrome-wallet/maintenance.svg";
export const calenderClockIcon =
    import.meta.env.VITE_APP_IMAGE_ICON_S3_URL +
    "/chrome-wallet/calendar-clock-icon.svg";
export const usdtLightningIcon =
    import.meta.env.VITE_APP_IMAGE_ICON_S3_URL + "/chrome-wallet/USDT-L.png";
export const walletBackGroundImage =
    import.meta.env.VITE_APP_IMAGE_ICON_S3_URL +
    "/chrome-wallet/asset-card-background-layer.png";
export const hourGlassOrange =
    import.meta.env.VITE_APP_IMAGE_ICON_S3_URL +
    "/chrome-wallet/hour-glass-orange.svg";
export const createLnAddressIcon =
    import.meta.env.VITE_APP_IMAGE_ICON_S3_URL +
    "/chrome-wallet/create-ln-address-icon.svg";
export const tronIcon =
    import.meta.env.VITE_APP_IMAGE_ICON_S3_URL + "/chrome-wallet/tron-icon.svg";
export const promoCodeIcon =
    import.meta.env.VITE_APP_IMAGE_ICON_S3_URL +
    "/chrome-wallet/promo-code-icon.svg";
export const checkCircle =
    import.meta.env.VITE_APP_IMAGE_ICON_S3_URL +
    "/chrome-wallet/check-circle.svg";
export const referWallpaper =
    import.meta.env.VITE_APP_IMAGE_ICON_S3_URL +
    "/chrome-wallet/refer-wallpaper.svg";
export const referAvatarGroup =
    import.meta.env.VITE_APP_IMAGE_ICON_S3_URL +
    "/chrome-wallet/refer-avatar-group.svg";
export const referBackground =
    import.meta.env.VITE_APP_IMAGE_ICON_S3_URL +
    "/chrome-wallet/refer-background.svg";
export const referVector =
    import.meta.env.VITE_APP_IMAGE_ICON_S3_URL +
    "/chrome-wallet/refer-vector.svg";
export const couponCodeIcon =
    import.meta.env.VITE_APP_IMAGE_ICON_S3_URL +
    "/chrome-wallet/coupon-code-icon.svg";
export const couponCodeIconGrey =
    import.meta.env.VITE_APP_IMAGE_ICON_S3_URL +
    "/chrome-wallet/coupon-code-icon-grey.svg";
export const checkCircleCurved =
    import.meta.env.VITE_APP_IMAGE_ICON_S3_URL +
    "/chrome-wallet/check-circle-curved.svg";
export const twoFAIcon =
    import.meta.env.VITE_APP_IMAGE_ICON_S3_URL + "/chrome-wallet/2fa-icon.svg";
export const logoutIcon =
    import.meta.env.VITE_APP_IMAGE_ICON_S3_URL +
    "/chrome-wallet/logout-icon.svg";
export const usdSquare =
    import.meta.env.VITE_APP_IMAGE_ICON_S3_URL +
    "/chrome-wallet/usd-square.svg";
export const referAndEarnBTC =
    import.meta.env.VITE_APP_IMAGE_ICON_S3_URL +
    "/chrome-wallet/refer-and-earn-btc.svg";
export const megaphone =
    import.meta.env.VITE_APP_IMAGE_ICON_S3_URL + "/chrome-wallet/megaphone.svg";
export const giftBoxIcon =
    import.meta.env.VITE_APP_IMAGE_ICON_S3_URL + "/chrome-wallet/gift-box.svg";
export const swapIcon =
    import.meta.env.VITE_APP_IMAGE_ICON_S3_URL + "/chrome-wallet/swap-icon.svg";
export const usdcSymbol =
    import.meta.env.VITE_APP_IMAGE_ICON_S3_URL +
    "/chrome-wallet/usdc-symbol.svg";
export const loaderSpinner =
    import.meta.env.VITE_APP_IMAGE_ICON_S3_URL + "/app/loader-spinner";
export const createLnAddressIconUSDT =
    import.meta.env.VITE_APP_IMAGE_ICON_S3_URL +
    "/chrome-wallet/create-ln-address-icon-usdt.svg";
export const createLnAddressIconUSDC =
    import.meta.env.VITE_APP_IMAGE_ICON_S3_URL +
    "/chrome-wallet/create-ln-address-icon-usdc.svg";
export const usdcLightningIcon =
    import.meta.env.VITE_APP_IMAGE_ICON_S3_URL +
    "/chrome-wallet/usdc-lightning-icon.svg";
export const contactIcon =
    import.meta.env.VITE_APP_IMAGE_ICON_S3_URL +
    "/chrome-wallet/contacts-icon.svg";
export const contactIconGrey =
    import.meta.env.VITE_APP_IMAGE_ICON_S3_URL +
    "/chrome-wallet/contacts-icon-grey.svg";
export const failedIcon =
    import.meta.env.VITE_APP_IMAGE_ICON_S3_URL + "/chrome-wallet/failed.svg";
export const deleteIcon =
    import.meta.env.VITE_APP_IMAGE_ICON_S3_URL +
    "/chrome-wallet/delete-icon.svg";
export const noDataFoundIcon =
    import.meta.env.VITE_APP_IMAGE_ICON_S3_URL +
    "/chrome-wallet/no-data-found.svg";
export const dashBoardRevenuEarth =
    import.meta.env.VITE_APP_IMAGE_ICON_S3_URL +
    "/app/dashboard-balance-earth.png";
export const noDataFoundImage =
    import.meta.env.VITE_APP_IMAGE_ICON_DEV_URL + "/app/empty_transactions.svg";
export const timerIconGrey =
    import.meta.env.VITE_APP_IMAGE_ICON_S3_URL +
    "/chrome-wallet/timer-icon-grey.svg";
export const authAppIcon =
    import.meta.env.VITE_APP_IMAGE_ICON_S3_URL +
    "/chrome-wallet/auth-app-icon.svg";
export const smsAuthIcon =
    import.meta.env.VITE_APP_IMAGE_ICON_S3_URL +
    "/chrome-wallet/sms-auth-icon.svg";
const PRIMARY = "#2a67ff";
const MUTED = "#848b9e";

export const DropdownIcon = ({ className }: { className?: string }) => (
    <ChevronDown color={PRIMARY} size={18} className={className} />
);

export const buttonIcons = {
    google: <img src={googleIcon} height={20} width={20} alt="google-icon" />,
    arrowUp: <ChevronUp color={PRIMARY} size={18} />,
    arrowDown: <ChevronDown color={PRIMARY} size={18} />,
    email: <Mail color={PRIMARY} size={20} />,
    add: <Plus color={PRIMARY} size={20} className="add-icon" />,
    back: <ChevronLeft color={PRIMARY} size={20} />,
    next: <ChevronRight color={PRIMARY} size={20} />,
    visible: <Eye color={PRIMARY} size={20} />,
    close: <X color={PRIMARY} size={20} />,
    logoutPower: <LogOut color={PRIMARY} size={20} />,
    profile: <User color={PRIMARY} size={20} />,
    category: <LayoutGrid color={PRIMARY} size={20} />,
    products: <Package color={PRIMARY} size={20} />,
    settings: <Settings color={MUTED} size={20} />,
    dropdown: <ChevronDown color={PRIMARY} size={16} />,
    admin: <UserCog color={PRIMARY} size={20} />,
    profileIcon: defaultUser,
    archive: (
        <span className="menu-icon">
            <Archive color={PRIMARY} size={18} />
        </span>
    ),
    unarchive: <ArchiveRestore color={PRIMARY} size={20} />,
    edit: (
        <span className="menu-icon">
            <Pencil color={PRIMARY} size={18} />
        </span>
    ),
    delete: (
        <span className="menu-icon">
            <Trash2 color={PRIMARY} size={18} />
        </span>
    ),
    checked: <CheckCircleIcon className="checked-icon" />,
    horizontalThreeDots: (
        <MoreHorizIcon
            tabIndex={0}
            sx={{
                "&.Mui-focused": {
                    outline: "3px solid #bfd1ff",
                },
            }}
            className="horizontal-dot-icon"
        />
    ),
    copyIcon: <FileCopyIcon tabIndex={0} className="copy-icon" />,
};

export const iconsForAlert = {
    success: <CheckCircleIcon />,
    error: <ErrorIcon />,
    warning: <WarningIcon />,
    info: <InfoIcon />,
};

// Svg Icons
export const DashboardIcon = (props: SvgIconProps) => {
    return (
        <SvgIcon
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            {...props}
        >
            <path
                d="M10.7498 2.75024C11.0258 2.75024 11.2499 2.97373 11.25 3.24976C11.25 3.5259 11.0259 3.75 10.7498 3.75H8.75024C7.48919 3.75 6.58337 3.75093 5.88208 3.82691C5.19014 3.90188 4.75665 4.0452 4.41796 4.29126C4.17745 4.46601 3.96576 4.6777 3.79102 4.91822C3.54505 5.25685 3.4016 5.69054 3.32666 6.38233C3.25072 7.08353 3.24976 7.989 3.24976 9.24976C3.24976 10.5108 3.25068 11.4166 3.32666 12.1179C3.40162 12.8098 3.54499 13.2434 3.79102 13.5821C3.96577 13.8226 4.17745 14.0342 4.41796 14.209C4.75663 14.455 5.19019 14.5984 5.88208 14.6734C6.58337 14.7493 7.48921 14.7502 8.75024 14.7502C10.011 14.7502 10.9165 14.7493 11.6177 14.6734C12.3095 14.5984 12.7432 14.4549 13.0818 14.209C13.3224 14.0342 13.534 13.8225 13.7087 13.5821C13.9548 13.2434 14.0981 12.8098 14.1731 12.1179C14.2491 11.4166 14.25 10.5109 14.25 9.24976V7.25024C14.25 6.9741 14.4741 6.75 14.7502 6.75C15.0262 6.75012 15.2498 6.97417 15.2498 7.25024V9.28051C15.2498 10.5047 15.2501 11.4643 15.1677 12.2256C15.0835 13.0027 14.9087 13.6327 14.5181 14.1702C14.2817 14.4955 13.9951 14.7812 13.6699 15.0175C13.1323 15.4081 12.5024 15.583 11.7253 15.6672C10.964 15.7496 10.0045 15.75 8.78027 15.75H8.71949C7.49534 15.75 6.53574 15.7496 5.77442 15.6672C4.99739 15.583 4.36739 15.4081 3.82984 15.0175C3.50468 14.7813 3.21872 14.4953 2.98242 14.1702C2.59188 13.6327 2.41695 13.0027 2.33276 12.2256C2.25028 11.4642 2.24999 10.5041 2.25 9.27979V9.21973C2.24999 7.99556 2.25031 7.036 2.33276 6.27466C2.41695 5.49763 2.59187 4.86764 2.98242 4.33008C3.2188 4.00478 3.50453 3.7183 3.82984 3.48194C4.36739 3.09139 4.99739 2.91646 5.77442 2.83228C6.53582 2.74979 7.49587 2.75024 8.72021 2.75024H10.7498Z"
                fill="#667085"
            ></path>
            <path
                d="M11.6345 7.125C11.7563 6.87721 12.0553 6.77503 12.3032 6.89648C12.5511 7.01804 12.6538 7.31731 12.5325 7.56518L11.5583 9.55005C10.8766 10.9397 8.87356 10.8719 8.28735 9.43946C8.02795 8.80526 7.1411 8.77518 6.83935 9.39038L5.86523 11.3752C5.74352 11.6229 5.44432 11.7252 5.19653 11.6038C4.94861 11.4821 4.8464 11.1823 4.96802 10.9343L5.94141 8.95019C6.62312 7.56044 8.627 7.62811 9.21313 9.06079C9.47266 9.69477 10.3595 9.72499 10.6611 9.10986L11.6345 7.125Z"
                fill="#667085"
            ></path>
            <path
                d="M14.0837 2.25C15.0041 2.2502 15.75 2.99665 15.75 3.917C15.7499 4.83719 15.004 5.58305 14.0837 5.58326C13.1634 5.58326 12.4169 4.83731 12.4168 3.917C12.4168 2.99652 13.1632 2.25 14.0837 2.25Z"
                fill="#667085"
            ></path>
        </SvgIcon>
    );
};

export const ProductIcon = (props: SvgIconProps) => {
    return (
        <>
            <SvgIcon
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                {...props}
            >
                <path
                    d="M10.1733 11.9078C10.4601 11.9078 10.6926 12.1403 10.6926 12.4271C10.6926 12.7139 10.4601 12.9464 10.1733 12.9464H8.3042C8.01749 12.9464 7.78496 12.7139 7.78491 12.4271C7.78491 12.1403 8.01746 11.9078 8.3042 11.9078H10.1733Z"
                    fill="#667085"
                ></path>
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14.0852 2.25012C15.1365 2.25027 15.9886 3.10244 15.9888 4.15369V5.12341C15.9887 6.16318 15.155 7.00626 14.1196 7.02478V13.1537C14.1196 14.5897 12.9592 15.7501 11.5232 15.7501H6.95435C5.51836 15.7501 4.35791 14.5897 4.35791 13.1537V7.02478C3.32254 7.00625 2.48888 6.16318 2.48877 5.12341V4.15369C2.48892 3.10245 3.34109 2.25027 4.39233 2.25012H14.0852ZM5.39648 13.1537C5.39648 14.0161 6.09188 14.7115 6.95435 14.7115H11.5232C12.3857 14.7115 13.0811 14.0161 13.0811 13.1537V7.02698H5.39648V13.1537Z"
                    fill="#667085"
                ></path>
            </SvgIcon>
        </>
    );
};
