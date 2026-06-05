import { useEffect, useRef, useState, type FC } from "react";
import { InputBase } from "@mui/material";
import { Trash2, TriangleAlert, CheckCircle2, Info } from "lucide-react";
import Modal from "../Modal/Modal";
import Box from "../Box/Box";
import Text from "../Text/Text";

type Step = "confirm" | "success";

interface BulkDeleteModalProps {
    open: boolean;
    count: number;
    isDeleting?: boolean;
    onConfirm: () => Promise<void>;
    onClose: () => void;
}

const BulkDeleteModal: FC<BulkDeleteModalProps> = ({
    open,
    count,
    isDeleting,
    onConfirm,
    onClose,
}) => {
    const [step, setStep] = useState<Step>("confirm");
    const [inputValue, setInputValue] = useState("");
    const deletedCountRef = useRef(0);

    useEffect(() => {
        if (!open) {
            setStep("confirm");
            setInputValue("");
        }
    }, [open]);

    const isSingle = count === 1;
    const confirmKeyword = isSingle ? "DELETE" : "DELETE ALL";
    const confirmTitle = isSingle
        ? "Delete this product?"
        : "Delete all products?";
    const deleteButtonLabel = isSingle ? "Delete product" : "Delete all products";

    const isConfirmValid = inputValue === confirmKeyword;

    const handleDelete = async () => {
        deletedCountRef.current = count;
        try {
            await onConfirm();
            setStep("success");
        } catch {
            // error handled in parent
        }
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            title=""
            actionButtonLabel=""
            className="bulk-delete-modal"
        >
            {step === "confirm" ? (
                <Box customClass="bdm-confirm">
                    <Box customClass="bdm-icon-wrapper">
                        <TriangleAlert size={24} />
                    </Box>

                    <Text customClass="bdm-title">{confirmTitle}</Text>

                    <Text customClass="bdm-description">
                        You are about to permanently delete{" "}
                        <span className="bdm-count">
                            {count} {count === 1 ? "product" : "products"}
                        </span>
                        . This will remove all product data, images and
                        associations.
                    </Text>

                    <Box customClass="bdm-notice">
                        <Info size={16} />
                        <Text customClass="bdm-notice-text">
                            Orders linked to these products will retain a
                            snapshot. This action cannot be undone.
                        </Text>
                    </Box>

                    <Text customClass="bdm-input-label">
                        Type{" "}
                        <code className="bdm-keyword">{confirmKeyword}</code>{" "}
                        to confirm
                    </Text>
                    <InputBase
                        className="bdm-input"
                        placeholder={confirmKeyword}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        fullWidth
                    />

                    <Box customClass="bdm-actions">
                        <button
                            className="bdm-btn bdm-cancel"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            className={`bdm-btn bdm-delete${isConfirmValid ? " enabled" : ""}`}
                            disabled={!isConfirmValid || isDeleting}
                            onClick={handleDelete}
                        >
                            <Trash2 size={14} />
                            {isDeleting ? "Deleting..." : deleteButtonLabel}
                        </button>
                    </Box>
                </Box>
            ) : (
                <Box customClass="bdm-success">
                    <Box customClass="bdm-success-icon">
                        <CheckCircle2 size={32} />
                    </Box>
                    <Text customClass="bdm-success-title">
                        {deletedCountRef.current === 1
                            ? "Product deleted"
                            : "All products deleted"}
                    </Text>
                    <Text customClass="bdm-success-sub">
                        {deletedCountRef.current}{" "}
                        {deletedCountRef.current === 1
                            ? "product has"
                            : "products have"}{" "}
                        been permanently removed.
                    </Text>
                </Box>
            )}
        </Modal>
    );
};

export default BulkDeleteModal;
