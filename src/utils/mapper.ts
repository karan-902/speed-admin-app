import type { TProductPayload, TRegisterForm, TRegisterPayload } from "../types";
import type { TProductForm } from "./components";
import type { TProductDetail } from "./utils";

export const toProductForm = (values: TProductDetail): TProductForm => ({
    category_id: values.category_id,
    name: values.name,
    price: String(values.price),
    stock: String(values.stock),
    description: values.description,
    thumbnail: values.thumbnail_id
        ? { public_id: values.thumbnail_id, url: values.thumbnail_url! }
        : null,
    images: values.images,
});

export const toProductPayload = (values: TProductForm): TProductPayload => ({
    ...values,
    price: Number(values.price),
    stock: Number(values.stock),
});

export const toRegisterPayload = (values: TRegisterForm): TRegisterPayload => ({
    ...values,
    phone: Number(values.phone_number),
});
