import MenuItem from "../../components/common/MenuItem/MenuItem";
import SelectData from "../../components/common/Select/Select";
import type { FormikProps } from "formik";
import { useReduxSelector } from "../../redux/hooks";
import Box from "../../components/common/Box/Box";
import type { TProductForm } from "../../utils/components";
interface CategorySelectProps {
  formik: FormikProps<TProductForm>;
}
function CategorySelect({ formik }: CategorySelectProps) {
  const { handleBlur, touched, errors, values, setFieldValue } = formik;
  const categories = useReduxSelector((state) => state.category.categories);
  const categorySelectClass = `category-select-wrapper  modal-select`;
  const onChange = (e: any) => {
    setFieldValue("category_id", e.target.value);
  };
  return (
    <Box my={2}>
      <SelectData
        name="category_id"
        onBlur={handleBlur}
        error={touched.category_id && Boolean(errors.category_id)}
        helperText={touched.category_id && errors.category_id}
        placeholder="Select Product Category"
        value={values.category_id}
        onChange={onChange}
        variant="outlined"
        autoWidth
        customClass={categorySelectClass}
        disabled={categories.length === 0}
      >
        {categories.length > 0 &&
          categories.map((data) => (
            <MenuItem customClass="select-item" value={data.id} key={data.id}>
              {data.name}
            </MenuItem>
          ))}
      </SelectData>
    </Box>
  );
}

export default CategorySelect;
