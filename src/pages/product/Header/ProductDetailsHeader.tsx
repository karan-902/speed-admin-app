import { useState, type MouseEvent } from "react";
import Box from "../../../components/common/Box/Box";
import Text from "../../../components/common/Text/Text";
import Breadcrumbs from "../../../components/common/Breadcrumb/Breadcrumb";
import { dialogText } from "../../../components/messages";
import ProductForm from "../ProductForm";
import { useReduxDispatch, useReduxSelector } from "../../../redux/hooks";

import Copy from "../../../components/common/Copy/Copy";
import Link from "../../../components/common/Link/Link";

import ProductStatus from "./ProductStatus";
import HeaderMenu from "./ProductMenu";
import ProductAction from "./ProductAction";
import RenderWithFallBack from "../../../components/common/RenderWithFallBack";
import { callAPIInterface } from "../../../utils";
import type {
    TProductArchivePayload,
    TProductSpotlightPayload,
} from "../../../types";
import type { TProductDetail } from "../../../utils/utils";
import { updateProduct } from "../../../redux/product/product.slice";
import ProductHeaderContent from "./ProductHeaderContent";

interface DataProps {
    previousNavlink: string;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
function DetailsHeader({ previousNavlink, loading, setLoading }: DataProps) {
    const data = useReduxSelector((state) => state.product.selectedProduct);
    const dispatch = useReduxDispatch();
    const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
    const [disabled, setDisabled] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isArchiveOpen, setIsArchiveOpen] = useState(false);

    const openMenu = (e: MouseEvent<HTMLElement>) => {
        setMenuAnchorEl((prev) => (prev ? null : e.currentTarget));
    };
    const openArchive = () => {
        closeMenu();
        setIsArchiveOpen(true);
    };

    const openEdit = () => {
        closeMenu();
        setIsEditOpen(true);
    };

    const closeMenu = () => setMenuAnchorEl(null);
    const closeArchive = () => setIsArchiveOpen(false);

    const closeEdit = () => setIsEditOpen(false);

    const handleArchiveProduct = async () => {
        if (!data || disabled) return;
        setDisabled(true);
        setLoading(true);
        closeMenu();
        try {
            const res = await callAPIInterface<
                TProductArchivePayload,
                TProductDetail
            >("PUT", `/products/archive/${data.id}`, {
                visiblity: !data.visibility,
            });
            dispatch(updateProduct(res));
            if (isArchiveOpen) closeArchive();
        } catch (error) {
            console.error("Archive/Unarchive action failed:", error);
        } finally {
            setDisabled(false);
            setLoading(false);
        }
    };

    return (
        <>
            <ProductHeaderContent
                setLoading={setLoading}
                data={data ? data : null}
                loading={loading}
                openMenu={openMenu}
                prevLink={previousNavlink}
                disabled={disabled}
            />
            <HeaderMenu
                anchorEl={menuAnchorEl}
                onClose={closeMenu}
                onEdit={openEdit}
                onArchive={openArchive}
            />
            <ProductAction
                title="Archive Product"
                customClass="product-archive-dialog"
                buttonLabel="Archive Product"
                content={dialogText.archive}
                open={isArchiveOpen}
                disabled={disabled}
                onSubmit={handleArchiveProduct}
                onClose={closeArchive}
            />
            <ProductForm open={isEditOpen} onClose={closeEdit} edit={true} />
        </>
    );
}

export default DetailsHeader;
