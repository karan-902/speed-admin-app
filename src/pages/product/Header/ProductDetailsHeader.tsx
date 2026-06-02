import { useState, type MouseEvent } from "react";
import Box from "../../../components/common/Box/Box";
import Text from "../../../components/common/Text/Text";
import Breadcrumbs from "../../../components/common/Breadcrumb/Breadcrumb";
import { dialogText } from "../../../components/messages";
import ProductForm from "../ProductForm";
import { useReduxDispatch, useReduxSelector } from "../../../redux/hooks";
import CustomSkeleton from "../../../components/common/Skeleton/Skeleton";
import Copy from "../../../components/common/Copy/Copy";
import Link from "../../../components/common/Link/Link";

import ProductStatus from "./ProductStatus";
import HeaderMenu from "./HeaderMenu";
import ProductAction from "./ProductAction";
import RenderWithFallBack from "../../../components/common/RenderWithFallBack";
import { deleteProduct } from "../../../redux/thunks";
import { useNavigate } from "react-router-dom";
import { callAPIInterface } from "../../../utils";
import type {
  TProductArchivePayload,
  TProductSpotlightPayload,
} from "../../../types";
import type { TProductDetail } from "../../../utils/utils";
import { updateProduct } from "../../../redux/product/product.slice";

interface DataProps {
  previousNavlink: string;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
function DetailsHeader({ previousNavlink, loading, setLoading }: DataProps) {
  const data = useReduxSelector((state) => state.product.selectedProduct);
  const navigate = useNavigate();
  const dispatch = useReduxDispatch();
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [disabled, setDisabled] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const openMenu = (e: MouseEvent<HTMLElement>) => {
    setMenuAnchorEl((prev) => (prev ? null : e.currentTarget));
  };
  const openArchive = () => {
    closeMenu();
    setIsArchiveOpen(true);
  };
  const openDelete = () => {
    closeMenu();
    setIsDeleteOpen(true);
  };
  const openEdit = () => {
    closeMenu();
    setIsEditOpen(true);
  };

  const closeMenu = () => setMenuAnchorEl(null);
  const closeArchive = () => setIsArchiveOpen(false);
  const closeDelete = () => setIsDeleteOpen(false);
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
      >("PUT", `/products/archive/${data.id}`, { visiblity: !data.visibility });
      dispatch(updateProduct(res));
      if (isArchiveOpen) closeArchive();
    } catch (error) {
      console.error("Archive/Unarchive action failed:", error);
    } finally {
      setDisabled(false);
      setLoading(false);
    }
  };
  const handleSpotlightProduct = async () => {
    if (!data || disabled) return;
    setDisabled(true);
    setLoading(true);
    try {
      const res = await callAPIInterface<
        TProductSpotlightPayload,
        TProductDetail
      >("PUT", `/products/spotlight/${data.id}`, {
        spotlight: !data.spotlight,
      });
      dispatch(updateProduct(res));
    } catch (error) {
      console.error("Spotlight toggle failed:", error);
    } finally {
      setDisabled(false);
      setLoading(false);
    }
  };
  const handleDeleteProduct = async () => {
    if (!data || disabled) return;
    setDisabled(true);
    setLoading(true);
    try {
      await dispatch(deleteProduct({ id: data.id })).unwrap();
      if (isDeleteOpen) closeDelete();
    } catch (error) {
      console.error("Delete product failed:", error);
    } finally {
      setDisabled(false);
      setLoading(false);
      navigate("/products");
    }
  };
  return (
    <>
      <Box component={"nav"}>
        <RenderWithFallBack
          loading={loading}
          skeleton={
            <CustomSkeleton
              customClass="product-nav-wrapper"
              variant="text"
              width={"40%"}
            />
          }
        >
          <Breadcrumbs component={"ol"} separator="›">
            <Link customClass="breadcrumb-link" to={`/${previousNavlink}`}>
              {previousNavlink[0]?.toUpperCase() + previousNavlink.slice(1)}
            </Link>
            <Text customClass="grey-text font14">Details</Text>
          </Breadcrumbs>
        </RenderWithFallBack>
      </Box>
      <Box className="header-content">
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <RenderWithFallBack
            loading={loading}
            skeleton={
              <CustomSkeleton
                customClass="product-title-wrapper"
                variant="text"
              />
            }
          >
            <Text customClass="font28 font-SemiBold">{data?.name}</Text>
          </RenderWithFallBack>

          <Box customClass="flex flex-col items-end">
            <RenderWithFallBack
              loading={loading}
              skeleton={
                <CustomSkeleton
                  customClass="product-status-wrapper"
                  variant="rectangular"
                />
              }
            >
              <ProductStatus
                product={data}
                onOpenMenu={openMenu}
                disabled={disabled}
                onToggleSpotlight={handleSpotlightProduct}
                onUnarchive={handleArchiveProduct}
              />
            </RenderWithFallBack>

            <RenderWithFallBack
              loading={loading}
              skeleton={
                <CustomSkeleton
                  customClass="copy-text-wrapper"
                  variant="rounded"
                />
              }
            >
              <Box mt={1} gap={1} customClass="flex items-center">
                <Text customClass="detail-id font-regular">{data?.id}</Text>
                <Copy value={String(data?.id)} />
              </Box>
            </RenderWithFallBack>
          </Box>
        </Box>
      </Box>
      <Box width={1000} mt={2}>
        <RenderWithFallBack
          loading={loading}
          skeleton={
            <CustomSkeleton
              customClass="product-description-wrapper"
              variant="text"
              sx={{ marginBlock: "12px" }}
            />
          }
        >
          <Text customClass="font14 grey-text">{data?.description}</Text>
        </RenderWithFallBack>
      </Box>

      <HeaderMenu
        anchorEl={menuAnchorEl}
        onDelete={openDelete}
        onClose={closeMenu}
        onEdit={openEdit}
        onArchive={openArchive}
      />
      <ProductAction
        title="Delete Product"
        customClass="product-delete-dialog"
        buttonLabel="Delete Product"
        content={dialogText.delete}
        open={isDeleteOpen}
        onSubmit={handleDeleteProduct}
        disabled={disabled}
        onClose={closeDelete}
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
