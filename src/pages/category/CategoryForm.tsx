import Input from "../../components/common/Input/Input";
import { useFormik } from "formik";
import Modal from "../../components/common/Modal/Modal";
import { object, string } from "yup";
import { useReduxDispatch } from "../../redux/hooks";
import { callAPIInterface } from "../../utils";
import type { TCategoryPayload } from "../../types";
import {
    categoryAdded,
    categoryUpdated,
} from "../../redux/category/category.slice";
import type { TCategory } from "../../utils/utils";

interface ICategoryFormProps {
    open: boolean;
    onClose: () => void;
    editMode?: boolean;
    categoryId?: string;
    initialName?: string;
}

const categorySchema = object({
    name: string().required("Category name is required"),
});

export default function CategoryForm({
    open,
    onClose,
    editMode = false,
    categoryId,
    initialName = "",
}: ICategoryFormProps) {
    const dispatch = useReduxDispatch();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: { name: editMode ? initialName : "" },
        validationSchema: categorySchema,
        onSubmit: async (values) => {
            try {
                if (editMode && categoryId) {
                    const data = await callAPIInterface<
                        TCategoryPayload,
                        TCategory
                    >("PATCH", `/categories/${categoryId}`, values);
                    dispatch(categoryUpdated(data));
                } else {
                    const data = await callAPIInterface<
                        TCategoryPayload,
                        TCategory
                    >("POST", "/categories", values);
                    dispatch(categoryAdded(data));
                }
            } catch (error) {
                console.error(error);
            } finally {
                handleClose();
            }
        },
    });

    const handleClose = () => {
        formik.resetForm();
        onClose();
    };

    if (!open) return null;

    return (
        <Modal
            key={editMode ? "edit" : "create"}
            disabled={!formik.dirty || !formik.isValid || formik.isSubmitting}
            title={editMode ? "Edit Category" : "Add New Category"}
            className="category-create-modal"
            open={open}
            actionButtonLabel={editMode ? "Save" : "Add"}
            isForm
            onSubmit={formik.handleSubmit}
            onClose={handleClose}
        >
            <Input
                name="name"
                id="name"
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={
                    formik.touched.name ? formik.errors.name : undefined
                }
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Category Name"
                placeholder="Enter Category Name"
                showLabel
            />
        </Modal>
    );
}
