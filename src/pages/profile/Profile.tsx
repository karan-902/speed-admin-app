import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Box from "../../components/common/Box/Box";
import Text from "../../components/common/Text/Text";
import Button from "../../components/common/Button/Button";
import Input from "../../components/common/Input/Input";
import Modal from "../../components/common/Modal/Modal";
import RenderWithFallBack from "../../components/common/RenderWithFallBack";
import CustomSkeleton from "../../components/common/Skeleton/Skeleton";
import { callAPIInterface } from "../../utils";
import type { TProfile, TProfileUpdateResponse } from "../../utils/utils";
import type { TProfileForm } from "../../utils/components";
import {
    editProfileLabel,
    profileEmailLabel,
    profileFirstNameLabel,
    profileLastNameLabel,
    profilePageDescription,
    profilePageTitle,
    profilePhoneLabel,
} from "../../components/messages";
import { useReduxDispatch, useReduxSelector } from "../../redux/hooks";
import { showToast } from "../../redux/error/error.slice";

const validationSchema = Yup.object({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    phone: Yup.string()
        .required("Phone is required")
        .matches(/^\d+$/, "Phone must be a number"),
});

function ProfileEditModal({
    open,
    profile,
    onClose,
    onSaved,
}: {
    open: boolean;
    profile: TProfile | null;
    onClose: () => void;
    onSaved: (p: TProfile) => void;
}) {
    const [disabled, setDisabled] = useState(false);
    const session = useReduxSelector((state) => state.auth.session);
    const dispatch = useReduxDispatch();
    const formik = useFormik<TProfileForm>({
        enableReinitialize: true,
        initialValues: {
            first_name: profile?.first_name ?? "",
            last_name: profile?.last_name ?? "",
            phone: profile?.phone ? String(profile.phone) : "",
        },
        validationSchema,
        onSubmit: async (values) => {
            setDisabled(true);
            try {
                const payload = {
                    first_name: values.first_name,
                    last_name: values.last_name,
                    phone: Number(values.phone),
                };
                const res = await callAPIInterface<
                    typeof payload,
                    TProfileUpdateResponse
                >("PATCH", `/profile?id=${session.id}`, payload);
                dispatch(
                    showToast({ message: res.message, severity: "success" }),
                );
                onSaved(res.data);
                onClose();
            } catch (error) {
                console.error(error);
            } finally {
                setDisabled(false);
            }
        },
    });

    const handleClose = () => {
        formik.resetForm();
        onClose();
    };

    return (
        <Modal
            open={open}
            title="Edit Profile"
            buttonLabel="Save"
            disabled={disabled}
            onClose={handleClose}
            onSubmit={formik.handleSubmit}
        >
            <Input
                showLabel
                label={profileFirstNameLabel}
                customClass="modal-input"
                placeholder="Enter First Name"
                name="first_name"
                value={formik.values.first_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isError={
                    Boolean(formik.touched.first_name) &&
                    Boolean(formik.errors.first_name)
                }
                helperText={
                    formik.touched.first_name ? formik.errors.first_name : ""
                }
            />
            <Input
                showLabel
                label={profileLastNameLabel}
                customClass="modal-input"
                placeholder="Enter Last Name"
                name="last_name"
                value={formik.values.last_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isError={
                    Boolean(formik.touched.last_name) &&
                    Boolean(formik.errors.last_name)
                }
                helperText={
                    formik.touched.last_name ? formik.errors.last_name : ""
                }
            />
            <Input
                showLabel
                label={profilePhoneLabel}
                customClass="modal-input"
                placeholder="Enter Phone Number"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isError={
                    Boolean(formik.touched.phone) &&
                    Boolean(formik.errors.phone)
                }
                helperText={formik.touched.phone ? formik.errors.phone : ""}
            />
        </Modal>
    );
}

function Profile() {
    const [profile, setProfile] = useState<TProfile | null>(null);
    const [loading, setLoading] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const session = useReduxSelector((state) => state.auth.session);
    useEffect(() => {
        setLoading(true);
        callAPIInterface<void, TProfile>("GET", `/profile?id=${session.id}`)
            .then(setProfile)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const infoRows: { label: string; value: string | number | undefined }[] = [
        { label: profileFirstNameLabel, value: profile?.first_name },
        { label: profileLastNameLabel, value: profile?.last_name },
        { label: profileEmailLabel, value: profile?.email },
        { label: profilePhoneLabel, value: profile?.phone },
    ];

    return (
        <Box customClass="product-detail-wrapper">
            <Box customClass="header-content">
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Box>
                        <Text customClass="font28 font-SemiBold">
                            {profilePageTitle}
                        </Text>
                        <Text customClass="font14 grey-text" mt={1}>
                            {profilePageDescription}
                        </Text>
                    </Box>
                    <Button
                        customClass="button-edit-profile"
                        variant="outlined"
                        label={editProfileLabel}
                        onClick={() => setIsEditOpen(true)}
                    />
                </Box>
            </Box>

            <Box customClass="profile-section">
                {infoRows.map(({ label, value }) => (
                    <Box key={label} customClass="profile-info-row">
                        <Text customClass="profile-label">{label}</Text>
                        <RenderWithFallBack
                            loading={loading}
                            skeleton={
                                <CustomSkeleton variant="text" width={200} />
                            }
                        >
                            <Text customClass="profile-value">
                                {value ?? "—"}
                            </Text>
                        </RenderWithFallBack>
                    </Box>
                ))}
            </Box>

            <ProfileEditModal
                open={isEditOpen}
                profile={profile}
                onClose={() => setIsEditOpen(false)}
                onSaved={setProfile}
            />
        </Box>
    );
}

export default Profile;
