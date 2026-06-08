import { useFormik } from "formik";
import { object, string, mixed } from "yup";
import Modal from "../../components//common/Modal/Modal";
import { useReduxDispatch, useReduxSelector } from "../../redux/hooks";
import type { TImage, TProductForm } from "../../utils/components";
import { toProductForm } from "../../utils/mapper"; // Assuming this utility correctly maps product.category_id
import { getCategories, saveProduct } from "../../redux/thunks";
import { useEffect, useMemo, type SetStateAction } from "react";

import ComponentLoader from "../../components/common/Loader/ComponentLoader";
import {
    CATEGORY_REQUIRED_MESSAGE,
    DESCRIPTION_REQUIRED_MESSAGE,
    imagesInputId,
    loadingProductForm,
    NAME_REQUIRED_MESSAGE,
    PRICE_INVALID_MESSAGE,
    PRICE_REQUIRED_MESSAGE,
    productDescriptionInputId,
    productDescriptionLabel,
    productDescriptionPlaceholder,
    productNameInputId,
    productNameLabel,
    productNamePlaceholder,
    productPriceInputId,
    productPriceLabel,
    productPricePlaceholder,
    productStockInputId,
    productStockLabel,
    productStockPlaceholder,
    STOCK_INVALID_MESSAGE,
    STOCK_REQUIRED_MESSAGE,
    THUMBNAIL_REQUIRED_MESSAGE,
    thumbnailInputId,
    uploadCommonDescription,
    uploadImagesTitle,
    uploadThumbnailTitle,
} from "../../components/messages";
import Box from "../../components/common/Box/Box";
import SelectData from "../../components/common/Select/Select";
import MenuItem from "../../components/common/MenuItem/MenuItem";
import Input from "../../components/common/Input/Input";
import FileUpload from "../../components/common/FileUpload";
import { callAPIInterface } from "../../utils";
import {
    addProductImage,
    removeProductImage,
} from "../../redux/product/product.slice";
import uploadImage from "../../utils/imageUpload";
import IconButton from "../../components/common/IconButton/IconButton";

const productSchema = object({
    category_id: string().required(CATEGORY_REQUIRED_MESSAGE),
    name: string().trim().required(NAME_REQUIRED_MESSAGE),
    description: string().trim().required(DESCRIPTION_REQUIRED_MESSAGE),
    price: string()
        .required(PRICE_REQUIRED_MESSAGE)
        .matches(/^\d+(\.\d{1,2})?$/, {
            message: PRICE_INVALID_MESSAGE,
            excludeEmptyString: true,
        }),
    stock: string().required(STOCK_REQUIRED_MESSAGE).matches(/^\d+$/, {
        message: STOCK_INVALID_MESSAGE,
        excludeEmptyString: true,
    }),
    thumbnail: mixed<TImage>().required(THUMBNAIL_REQUIRED_MESSAGE),
});

interface IProductFormProps {
    open: boolean;
    edit: boolean;
    loading?: boolean;
    onSuccess?: () => void;
    onDisabled?: React.Dispatch<SetStateAction<boolean>>;
    onClose: () => void;
}

function ProductImagePreview({
    images,
    onRemove,
}: {
    images: TImage[] | TImage | null;
    onRemove?: (index: number) => void;
}) {
    const normalizedImages = Array.isArray(images)
        ? images
        : images
          ? [images]
          : [];

    if (normalizedImages.length === 0) return null;

    return (
        <Box my={2} customClass="product-img-box flex">
            {normalizedImages.map((img, index) => (
                <Box
                    key={img.public_id || index}
                    customClass="flex"
                    mx={1.5}
                    position="relative"
                    width={80}
                >
                    <img width={80} height={80} src={img.url} alt="img" />

                    <IconButton
                        icon="close"
                        onClick={() => onRemove?.(index)}
                        customClass="product-remove-button"
                    />
                </Box>
            ))}
        </Box>
    );
}

export default function ProductForm({
    open,
    edit,
    onSuccess,
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
    const loaderClass = edit ? "product-edit-loader" : "product-create-loader";

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
            onSuccess?.();
            handleOnClose();
        } catch (error) {
            console.error(error);
        } finally {
            onDisabled?.(false);
        }
    };
    const {
        values,
        handleChange,
        handleBlur,
        errors,
        touched,
        setFieldValue,
        resetForm,
        isValid,
        dirty,
        isSubmitting,
        handleSubmit,
    } = useFormik<TProductForm>({
        enableReinitialize: true,
        validateOnMount: true,
        initialValues: initialData,
        validationSchema: productSchema,
        onSubmit: (values) => onAction(values),
    });
    const onSelectChange = (e: any) =>
        setFieldValue("category_id", e.target.value);
    const handleOnClose = () => {
        resetForm();
        onClose();
    };

    const onUpload = async <K extends keyof TProductForm>(
        files: File[],
        field: K,
    ) => {
        if (!files) return;
        const isFieldArray = Array.isArray(values[field]);
        if (isFieldArray && field === "images") {
            const results = await Promise.all(
                files.map((file) => uploadImage(file)),
            );
            const uploaded = results.filter((img): img is TImage => !!img);
            setFieldValue("images", [...values.images, ...uploaded]);
            dispatch(addProductImage({ field: "images", data: uploaded }));
            return uploaded;
        }
        const uploaded = await uploadImage(files[0]);
        if (!uploaded) return;
        setFieldValue("thumbnail", uploaded);
        dispatch(addProductImage({ field: "thumbnail", data: uploaded }));
        return uploaded;
    };
    const onRemove = async <K extends keyof TProductForm>(
        index: number,
        field: K,
    ) => {
        const fieldValue = values[field];
        let publicId = "";

        if (field === "images" && Array.isArray(fieldValue)) {
            publicId = fieldValue[index]?.public_id;
        } else if (
            field === "thumbnail" &&
            fieldValue &&
            !Array.isArray(fieldValue)
        ) {
            publicId = (fieldValue as { public_id: string }).public_id;
        }

        if (publicId) {
            try {
                await callAPIInterface(
                    "DELETE",
                    `/delete/image?public_id=${publicId}`,
                );
            } catch (error) {
                console.error("Error deleting image from server:", error);
            }
        }

        if (field === "images" && Array.isArray(fieldValue)) {
            const updated = fieldValue.filter((_, i) => i !== index);
            setFieldValue("images", updated);
            dispatch(removeProductImage({ field: "images", index }));
        } else if (field === "thumbnail") {
            setFieldValue("thumbnail", null);
            dispatch(removeProductImage({ field: "thumbnail" }));
        }
    };
    useEffect(() => {
        if (open && categories.length === 0) {
            dispatch(getCategories());
        }
    }, [open, categories.length, dispatch]);

    return (
        <Modal
            variant={modalVariant}
            open={open}
            buttonLabel={modalActionLabel}
            title={modalTitle}
            className={modalClass}
            disabled={!dirty || !isValid || isSubmitting}
            onClose={handleOnClose}
            onSubmit={handleSubmit}
        >
            {isLoading ? (
                <ComponentLoader
                    customClass={`flex flex-col items-center ${loaderClass}`}
                    text={loadingProductForm}
                />
            ) : (
                <>
                    <Box my={2}>
                        <SelectData
                            name="category_id"
                            onBlur={handleBlur}
                            error={
                                touched.category_id &&
                                Boolean(errors.category_id)
                            }
                            helperText={
                                touched.category_id && errors.category_id
                            }
                            placeholder="Select Product Category"
                            value={values.category_id}
                            onChange={onSelectChange}
                            variant="outlined"
                            autoWidth
                            customClass={`category-select-wrapper  modal-select`}
                            disabled={categories.length === 0}
                        >
                            {categories.length > 0 &&
                                categories.map((data) => (
                                    <MenuItem
                                        customClass="select-item"
                                        value={data.id}
                                        key={data.id}
                                    >
                                        {data.name}
                                    </MenuItem>
                                ))}
                        </SelectData>
                    </Box>
                    <Input
                        name={productNameInputId}
                        id={productNameInputId}
                        elementClass="modal-input"
                        value={values.name}
                        error={touched.name && Boolean(errors.name)}
                        helperText={touched.name ? errors.name : undefined}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        label={productNameLabel}
                        placeholder={productNamePlaceholder}
                        showLabel
                    />
                    <Input
                        name={productPriceInputId}
                        elementClass="modal-input"
                        id={productPriceInputId}
                        value={values.price}
                        error={touched.price && Boolean(errors.price)}
                        helperText={touched.price ? errors.price : undefined}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        label={productPriceLabel}
                        placeholder={productPricePlaceholder}
                        showLabel
                    />
                    <Input
                        name={productStockInputId}
                        id={productStockInputId}
                        elementClass="modal-input"
                        value={values.stock}
                        error={touched.stock && Boolean(errors.stock)}
                        helperText={touched.stock ? errors.stock : undefined}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        label={productStockLabel}
                        placeholder={productStockPlaceholder}
                        showLabel
                    />
                    <Input
                        name={productDescriptionInputId}
                        elementClass="modal-input"
                        id={productDescriptionInputId}
                        value={values.description}
                        error={
                            touched.description && Boolean(errors.description)
                        }
                        helperText={
                            touched.description ? errors.description : undefined
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                        label={productDescriptionLabel}
                        placeholder={productDescriptionPlaceholder}
                        showLabel
                    />
                    <Box>
                        <FileUpload
                            id={thumbnailInputId}
                            value={values.thumbnail}
                            title={uploadThumbnailTitle}
                            description={uploadCommonDescription}
                            onChange={async (files) =>
                                onUpload(files, "thumbnail")
                            }
                            onRemove={async (id) => onRemove(id, "thumbnail")}
                        />

                        {values?.images?.length < 4 && (
                            <FileUpload
                                title={uploadImagesTitle}
                                description={uploadCommonDescription}
                                id={imagesInputId}
                                value={values.images}
                                multiple={true}
                                onChange={async (files) =>
                                    onUpload(files, "images")
                                }
                            />
                        )}
                        {values.images.length > 0 && (
                            <ProductImagePreview
                                images={values.images}
                                onRemove={async (id) => onRemove(id, "images")}
                            />
                        )}
                    </Box>
                </>
            )}
        </Modal>
    );
}
