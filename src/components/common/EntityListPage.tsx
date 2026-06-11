import { SlidersHorizontal } from "lucide-react";
import Box from "./Box/Box";
import Text from "./Text/Text";
import Button from "./Button/Button";

interface EntityListProps {
    entity: string;
    buttonLabel?: string;
    onSubmit?: () => void;
    description: string;
    onFilter?: () => void;
    children: React.ReactNode;
}
export default function EntityListPage({
    entity,
    description,
    buttonLabel,
    children,
    onSubmit,
    onFilter,
}: EntityListProps) {
    return (
        <Box customClass="section-wrapper">
            <Box customClass="section-header-wrapper">
                <Box customClass="section-header-left">
                    <Text
                        variant="h6"
                        customClass="flex-text font-SemiBold font18"
                    >
                        {entity}
                    </Text>
                    <Text
                        variant="body1"
                        customClass="font13 grey-text"
                        marginTop={"4px"}
                    >
                        {description}
                    </Text>
                </Box>
                <Box customClass="flex items-center" gap={1.5}>
                    {onFilter && (
                        <button
                            className="header-filter-btn"
                            onClick={onFilter}
                        >
                            <SlidersHorizontal size={16} />
                            Filter
                        </button>
                    )}
                    {buttonLabel && onSubmit && (
                        <Button
                            customClass="button-create"
                            variant="outlined"
                            size="medium"
                            label={buttonLabel}
                            onClick={onSubmit}
                            iconPosition="start"
                            icon={"add"}
                        />
                    )}
                </Box>
            </Box>
            <Box customClass="entity-content">{children}</Box>
        </Box>
    );
}
