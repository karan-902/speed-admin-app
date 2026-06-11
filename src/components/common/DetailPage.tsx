import type { ReactNode } from "react";
import Box from "./Box/Box";
import Text from "./Text/Text";
import Breadcrumbs from "./Breadcrumb/Breadcrumb";
import Link from "./Link/Link";
import CustomSkeleton from "./Skeleton/Skeleton";
import RenderWithFallBack from "./RenderWithFallBack";

interface BreadcrumbConfig {
    label: string;
    to?: string;
    onBack?: () => void;
}

interface DetailPageProps {
    loading?: boolean;
    breadcrumb: BreadcrumbConfig;
    title: ReactNode;
    chip?: ReactNode;
    menuButton?: ReactNode;
    children: ReactNode;
}

export default function DetailPage({
    loading = false,
    breadcrumb,
    title,
    chip,
    menuButton,
    children,
}: DetailPageProps) {
    return (
        <Box customClass="category-detail-wrapper">
            <Box component={"nav"}>
                <RenderWithFallBack
                    loading={loading}
                    skeleton={
                        <CustomSkeleton
                            customClass="product-nav-wrapper"
                            variant="text"
                            width="30%"
                        />
                    }
                >
                    <Breadcrumbs component={"ol"} separator="›">
                        {breadcrumb.to ? (
                            <Link
                                customClass="breadcrumb-link"
                                to={breadcrumb.to}
                            >
                                {breadcrumb.label}
                            </Link>
                        ) : (
                            <Box
                                customClass="breadcrumb-link"
                                onClick={breadcrumb.onBack}
                            >
                                {breadcrumb.label}
                            </Box>
                        )}
                        <Text customClass="grey-text font14">Details</Text>
                    </Breadcrumbs>
                </RenderWithFallBack>
            </Box>

            <Box className="header-content">
                <Box customClass="flex justify-between items-center">
                    <RenderWithFallBack
                        loading={loading}
                        skeleton={
                            <CustomSkeleton
                                customClass="product-title-wrapper"
                                variant="text"
                            />
                        }
                    >
                        <Box customClass="flex items-center" gap={1.5}>
                            <Text customClass="font28 font-SemiBold">
                                {title}
                            </Text>
                            {chip}
                        </Box>
                    </RenderWithFallBack>

                    <RenderWithFallBack
                        loading={loading}
                        skeleton={
                            <CustomSkeleton
                                customClass="product-status-wrapper"
                                variant="rectangular"
                            />
                        }
                    >
                        {menuButton ?? null}
                    </RenderWithFallBack>
                </Box>
            </Box>

            {children}
        </Box>
    );
}
