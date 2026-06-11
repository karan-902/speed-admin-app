import type { TImage } from "./utils/components";

export type TTimeRange = "today" | "yesterday" | "2d" | "7d" | "30d" | "1y";

export type RevenuePoint = {
    date: string; // "DD-MM-YYYY"
    revenue: number;
    orders: number;
};

export type RevenueResponse = {
    points: RevenuePoint[];
};

export type TUserRole = "SUPER_ADMIN" | "ADMIN" | "USER" | "DELIVERY_PARTNER";

export type TCreateAdmin = {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    phone?: number;
    role: TUserRole;
};

export type TLoginPayload = {
    email: string;
    password: string;
};
export type TRegisterPayload = {
    first_name: string;
    last_name: string;
    phone: number;
    email: string;
    password: string;
};
export type TRegisterForm = {
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    password: string;
};
export type TGenerateTokenPayload = {
    refresh_token: string;
};
export type TCategoryPayload = {
    name: string;
};
export type TProductPayload = {
    category_id: string;
    name: string;
    price: number;
    stock: number;
    description: string;
    thumbnail: TImage | null;
    images: TImage[];
};

export type TProductArchivePayload = {
    id?: string;
    visibility?: boolean;
};
export type TProductSpotlightPayload = {
    id?: string;
    spotlight: boolean;
};
export type TProductDeletePayload = {
    id: string;
};
export type TFilterPayload = "available" | "archive";

export type Field = {
    key?: any;
    label: string;
    render?: (row: any) => React.ReactNode;
};
export type TProductsList = {
    id: string;
    name: string;
    price: number;
    visiblity: boolean;
    created_at: number;
    updated_at: number;
};
export type TCloudinaryResponse = { secure_url: string; public_id: string };

export type TCreateDeliveryPayload = {
    order_id: string;
    estimated_at: number;
};

export type TUpdateDeliveryPayload = {
    carrier?: string;
    tracking_number?: string;
    assigned_to?: string;
    estimated_at?: number;
    status?: string;
};

export type TAddTrackingEventPayload = {
    status: string;
    message: string;
    location: string;
};
