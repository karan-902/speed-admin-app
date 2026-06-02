import Box from "./Box/Box";
import Text from "./Text/Text";
import Button from "./Button/Button";

interface EntityListProps {
    entity: string;
    buttonLabel: string;
    onSubmit: () => void;
    description: string;
    children: React.ReactNode;
}
export default function EntityListPage({
    entity,
    description,
    buttonLabel,
    children,
    onSubmit,
}: EntityListProps) {
    return (
        <Box customClass="section-wrapper">
            <Box customClass="section-header-wrapper">
                <Box customClass="section-header-left">
                    <Text variant="h6" customClass="flex-text font-SemiBold font20">
                        {entity}
                    </Text>
                    <Text variant="body1" customClass="font13 grey-text" marginTop={"4px"}>
                        {description}
                    </Text>
                </Box>
                <Button
                    customClass="button-create"
                    variant="outlined"
                    size="medium"
                    label={buttonLabel}
                    onClick={onSubmit}
                    iconPosition="start"
                    icon={"add"}
                />
            </Box>
            <Box customClass="entity-content">{children}</Box>
        </Box>
    );
}
