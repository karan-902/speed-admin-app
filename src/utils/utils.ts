import type { TImage } from "./components";

export type TRegisterResponse = {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
};

export type TLoginResponse = {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
    is_active: boolean;
    created_at: string;
    access_token: string;
    refresh_token: string;
};

export type TGenerateTokenResponse = {
    access_token: string;
    refresh_token: string;
};

export type TCategory = {
    id: string;
    name: string;
    visibility: boolean;
    created_at: number;
    updated_at: number;
};

export type TProduct = {
    id: string;
    name: string;
    description: string | null;
    price: number;
    stock: number;
    category_id: string;
    spotlight: boolean;
    visibility: boolean;
    created_at: number;
    updated_at: number;
};

export type TProductsResponse = {
    has_more: boolean;
    object: "list" | null;
    data: TProduct[];
    ending_before: number | null;
};
export type TCategoriesResponse = {
    has_more: boolean;
    object: "list" | null;
    data: TCategory[];
    ending_before: number | null;
};

export type TCategoryDetailResponse = {
    id: string;
    name: string;
    details_products: {
        has_more: boolean;
        object: "list" | null;
        data: TCategoryProduct[];
        ending_before: number | null;
    };
    total_products: number;
    active_products: number;
    spotlighted_products: number;
    total_stock: number | null;
    average_price: number | null;
};

export type TProductDetail = {
    id: string;
    name: string;
    description: string;
    category_id: string;
    category_name: string;
    price: number;
    stock: number;
    spotlight: boolean;
    visibility: boolean;
    thumbnail_id: string | null;
    thumbnail_url: string | null;
    images: TImage[];
    created_at: number;
    updated_at: number;
};

export type TCategoryProduct = {
    id: string;
    name: string;
    description: string | null;
    thumbnail_id: string | null;
    thumbnail_url: string | null;
    price: number;
    stock: number;
    spotlight: boolean;
    created_at: number;
    updated_at: number;
};


// ── Orders ────────────────────────────────────────────────────────────────────

export type TOrderStatus =
    | "PENDING"
    | "CONFIRMED"
    | "SHIPPED"
    | "DELIVERED"
    | "CANCELLED";

export type TPaymentStatus = "PENDING" | "SUCCESS" | "FAILED";

export type TOrder = {
    id: string;
    user_id: string;
    total_amount: number;
    status: TOrderStatus;
    payment_status: TPaymentStatus;
    payment_method: string | null;
    created_at: number;
    updated_at: number;
    user: { first_name: string; last_name: string; email: string };
};

export type TOrderAddress = {
    full_name: string;
    phone: number;
    address_line: string;
    city: string;
    state: string;
    pincode: number;
    country: string;
};

export type TOrderItem = {
    id: string;
    product_id: string;
    product_name: string;
    quantity: number;
    price: number;
};

export type TOrderDetail = TOrder & {
    paid_at: number | null;
    address: TOrderAddress;
    items: TOrderItem[];
};

export type TOrdersResponse = {
    has_more: boolean;
    object: "list" | null;
    data: TOrder[];
    ending_before: number | null;
};

// ── Users ─────────────────────────────────────────────────────────────────────

export type TUser = {
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

export type TUserDetail = TUser & {
    avatar: string | null;
    total_orders: number;
};

export type TUsersResponse = {
    has_more: boolean;
    object: "list" | null;
    data: TUser[];
    ending_before: number | null;
};

// ── Profile ───────────────────────────────────────────────────────────────────

export type TProfile = {
    email: string;
    first_name: string;
    last_name: string;
    phone: number;
    is_active: boolean;
    created_at: number;
};

export type TProfileUpdateResponse = {
    message: string;
    data: TProfile;
};
