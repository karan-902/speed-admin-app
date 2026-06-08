import type { BoxProps, ButtonProps, InputBaseProps } from "@mui/material";
import type { JSX, ReactNode } from "react";
import type { buttonIcons } from "../components/images";

export type AlertMessageProps = {
    open: boolean;
    onClose: () => void;
    severity?: "error" | "warning" | "info" | "success";
    title?: string;
    children: React.ReactNode;
    customClass?: string;
    variant?: "standard" | "filled" | "outlined";
};
//Common
export type TReactProps<Type = object> = React.FC<
    Type & { children: ReactNode }
>;
export type MenuItem = {
    type: "item" | "accordion";
    text: string;
    icon?: React.ReactNode;
    path?: string;
    children?: MenuItem[];
};
export interface EntityListProps {
    entity?: string;
    description?: string;
    buttonLabel?: string;
    children?: React.ReactNode;
    columns?: any[];
    onSubmit?: () => void;
}
export interface InputProps extends InputBaseProps {
    customClass?: string;
    isFileInput?: boolean;
    elementClass?: string;
    showLabel?: boolean;
    label?: string;
    optional?: boolean;
    type?: string;
    isError?: boolean;
    isPasswordVisible?: boolean;
    error?: boolean;
    helperText?: string;
    value?: string | number;
}
export interface IloaderProps {
    text?: string;
    customClass?: string;
}
export interface TButtonProps extends ButtonProps {
    label?: string;
    icon?: keyof typeof buttonIcons;
    iconPosition?: string;
    customClass?: string;
}
export interface DiagonalProps extends BoxProps {
    src: string;
    customClass?: string;
}
export type Column<T> = {
    key: keyof T;
    render?: (data: T) => ReactNode;
};
export type Ttabs = "all" | "available" | "archive";
export type Field<T> = {
    key?: keyof T;
    label: string;
    width?: string | number;
    render?: (row: T) => React.ReactNode;
};
export type Fields<T> = {
    title: string;
    fields: Field<T>[];
};
export interface TSection<T> {
    title: string;
    fields: Field<T>[];
}
export type TProductColumns = {
    id: string;
    name: string;
    price: number;
    visibility: boolean;
    created_at: number;
    updated_at: number;
};
export type TCategoryColumns = {
    id: string;
    name: string;
    visibility: boolean;
    created_at: number;
    updated_at: number;
};
export type TImage = {
    public_id: string;
    url: string;
};
export type TCategorySummeryObj = {
    total_products: number;
    total_stock: number;
    average_price: number;
    active_products: number;
    spotlighted_products: number;
};
export type TProductDetailsObj = {
    id: string;
    name: string;
    visibility: boolean;
    spotlight: boolean;
    price: number;
    stock: number;
    description: string;
    created_at: number;
    updated_at: number;
    category_name: string;
};
export type TProductForm = {
    category_id: string;
    name: string;
    price: string;
    stock: string;
    description: string;
    thumbnail: TImage | null;
    images: TImage[];
};
export type TProductSections = {
    details: TSection<TProductDetailsObj>;
    thumbnail: TSection<TImage>;
    images: TSection<TImage[]>;
};
export type TCategorySections = {
    summery: TSection<TCategorySummeryObj>;
};

export type VirtualTable<T> = {
    columns: Field<T>[];
    data: T[];
    header: () => ReactNode;
    loaderComponent: () => ReactNode;
    isLoading?: boolean;
    hasMore?: boolean;
    loadMore?: () => void;
};

export type TOrderColumns = {
    id: string;
    user_id: string;
    total_amount: number;
    status: string;
    payment_status: string;
    payment_method: string | null;
    created_at: number;
    updated_at: number;
    user: { first_name: string; last_name: string; email: string };
};

export type TUserColumns = {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    phone: number | null;
    role: "ADMIN" | "USER";
    is_active: boolean;
    created_at: number;
    updated_at: number;
};

export type TProfileForm = {
    first_name: string;
    last_name: string;
    phone: string;
};

export type TStats = {
    label: string;
    value: number;
    changePct?: number;
    icon: JSX.Element;
    tone: string;
};

export type CommonTab = { label: string; value: string };

export type TLoginForm = {
    email: string;
    password: string;
};

export type TCommonFilter = {
    categoryIds?: string[];
    minPrice?: number;
    maxPrice?: number;
    minStock?: number;
    maxStock?: number;
    price?: number;
    stock?: number;
    createdOn?: number;
    sortField?: string;
    sortOrder?: "asc" | "desc";
};
