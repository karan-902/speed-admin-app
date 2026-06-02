import type { FormikProps } from "formik";
import Input from "../../components/common/Input/Input";
import {
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
} from "../../components/messages";
import type { TProductForm } from "../../utils/components";

interface ProductBasicFieldsProps {
  formik: FormikProps<TProductForm>;
}
function ProductBasicFields({ formik }: ProductBasicFieldsProps) {
  const { values, touched, errors, handleChange, handleBlur } = formik;
  const elementClasses = "modal-input";
  return (
    <>
      <Input
        name={productNameInputId}
        id={productNameInputId}
        elementClass={elementClasses}
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
        elementClass={elementClasses}
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
        elementClass={elementClasses}
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
        elementClass={elementClasses}
        id={productDescriptionInputId}
        value={values.description}
        error={touched.description && Boolean(errors.description)}
        helperText={touched.description ? errors.description : undefined}
        onChange={handleChange}
        onBlur={handleBlur}
        label={productDescriptionLabel}
        placeholder={productDescriptionPlaceholder}
        showLabel
      />
    </>
  );
}

export default ProductBasicFields;
