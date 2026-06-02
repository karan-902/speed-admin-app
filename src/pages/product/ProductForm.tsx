import { useFormik } from "formik";
import Modal from "../../components//common/Modal/Modal";
import CategorySelect from "./CategorySelect";
import ProductUpload from "./ProductUpload";
import ProductBasicFields from "./ProductBasicFields";
import { useReduxDispatch, useReduxSelector } from "../../redux/hooks";
import type { TProductForm } from "../../utils/components";
import { toProductForm } from "../../utils/mapper"; // Assuming this utility correctly maps product.category_id
import { getCategories, saveProduct } from "../../redux/thunks";
import { useEffect, useMemo, type SetStateAction } from "react";

import ComponentLoader from "../../components/common/Loader/ComponentLoader";

interface IProductFormProps {
    open: boolean;
    edit: boolean;
    loading?: boolean;
    disabled?: boolean;
    onDisabled?: React.Dispatch<SetStateAction<boolean>>;
    onClose: () => void;
}

function ProductForm({
    open,
    edit,
    loading = false,
    disabled,
    onDisabled,
    onClose,
}: IProductFormProps) {
    const dispatch = useReduxDispatch();
    const categories = useReduxSelector((state) => state.category.categories);
    const product = useReduxSelector((state) => state.product.selectedProduct);

    const initialData = useMemo(() => {
        if (edit && product) {
            return toProductForm(product);
        }
        return {
            category_id: "",
            name: "",
            description: "",
            price: "",
            stock: "",
            thumbnail: null,
            images: [],
        };
    }, [edit, product]);

    const isEditMode = edit;
    const isLoading =
        open && (categories.length === 0 || (isEditMode && !product));

    const modalTitle = isEditMode ? "Edit Product" : "Add Product";
    const modalClass = isEditMode
        ? "product-edit-modal"
        : "product-create-modal fullscreen-modal";
    const modalActionLabel: "Save" | "Add" = isEditMode ? "Save" : "Add";
    const modalVariant = isEditMode ? "default" : "fullscreen";
    const onAction = async (values: TProductForm) => {
        onDisabled?.(true);
        try {
            await dispatch(
                saveProduct({ values, id: edit ? product?.id : undefined }),
            ).unwrap();
            handleOnClose();
        } catch (error) {
            console.error(error);
        } finally {
            onDisabled?.(false);
        }
    };
    const formik = useFormik<TProductForm>({
        enableReinitialize: true,
        initialValues: initialData,
        onSubmit: (values) => onAction(values),
    });
    const handleOnClose = () => {
        formik.resetForm();
        onClose();
    };

    useEffect(() => {
        if (open && categories.length === 0) {
            dispatch(getCategories());
        }
    }, [open, categories.length, dispatch]);
    const renderProductForm = () => {
        if (loading || isLoading) {
            const loaderClass = edit
                ? "product-edit-loader"
                : "product-create-loader";
            return (
                <ComponentLoader
                    customClass={`flex flex-col items-center ${loaderClass}`}
                />
            );
        }
        return (
            <>
                <CategorySelect formik={formik} />
                <ProductBasicFields formik={formik} />
                <ProductUpload formik={formik} />
            </>
        );
    };
    return (
        <Modal
            variant={modalVariant}
            open={open}
            actionButtonLabel={modalActionLabel}
            title={modalTitle}
            className={modalClass}
            disabled={disabled}
            onClose={handleOnClose}
            onSubmit={formik.handleSubmit}
        >
            {renderProductForm()}
        </Modal>
    );
}

export default ProductForm;
