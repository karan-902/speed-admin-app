import type { FormikProps } from "formik";
import Box from "../../components/common/Box/Box";
import FileUpload from "../../components/common/FileUpload";
import {
  imagesInputId,
  thumbnailInputId,
  uploadCommonDescription,
  uploadImagesTitle,
  uploadThumbnailTitle,
} from "../../components/messages";
import type { TImage, TProductForm } from "../../utils/components";
import ProductImagePreview from "./ProductImagePreview";
import { callAPIInterface } from "../../utils";
import uploadImage from "../../utils/imageUpload";
import { useReduxDispatch } from "../../redux/hooks";
import {
  addProductImage,
  removeProductImage,
} from "../../redux/product/product.slice";
interface ProductUploadProps {
  formik: FormikProps<TProductForm>;
}
function ProductUpload({ formik }: ProductUploadProps) {
  const { values, setFieldValue } = formik;
  const dispatch = useReduxDispatch();

  const onUpload = async <K extends keyof TProductForm>(
    files: File[],
    field: K,
  ) => {
    if (!files) return;
    const isFieldArray = Array.isArray(formik.values[field]);
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
        await callAPIInterface("DELETE", `/delete/image?public_id=${publicId}`);
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
  return (
    <Box>
      <FileUpload
        id={thumbnailInputId}
        value={values.thumbnail}
        title={uploadThumbnailTitle}
        description={uploadCommonDescription}
        onChange={async (files) => onUpload(files, "thumbnail")}
        onRemove={async (id) => onRemove(id, "thumbnail")}
      />

      {values?.images?.length < 4 && (
        <FileUpload
          title={uploadImagesTitle}
          description={uploadCommonDescription}
          id={imagesInputId}
          value={values.images}
          multiple={true}
          onChange={async (files) => onUpload(files, "images")}
        />
      )}
      {values.images.length > 0 && (
        <ProductImagePreview
          images={values.images}
          onRemove={async (id) => onRemove(id, "images")}
        />
      )}
    </Box>
  );
}

export default ProductUpload;
