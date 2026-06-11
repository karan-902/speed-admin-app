import { useEffect } from "react";
import UserForm from "./UserForm";
import EntityListPage from "../../components/common/EntityListPage";
import EntityList from "../../components/common/EntityList";
import ColumnsTableHeader from "../../components/common/ColumnsTableHeader";
import { userColumns } from "../../components/columns";
import { usePaginatedList } from "../../hooks/usePaginatedList";
import { useEntityList } from "../../hooks/useEntityList";
import {
    usersActionButtonLabel,
    usersPageDescription,
    usersPageTitle,
} from "../../components/messages";
import { useReduxDispatch, useReduxSelector } from "../../redux/hooks";
import { appendUsers, setUsers } from "../../redux/users/users.slice";
import type { TUser } from "../../utils/utils";

const LIMIT = 20;

const USER_ROLE_TABS: { label: string; value: string }[] = [
    { label: "All", value: "all" },
    { label: "Admin", value: "ADMIN" },
    { label: "User", value: "USER" },
];

function Users() {
    const {
        tabValue,
        tabRef,
        loading,
        setLoading,
        onTabChange,
        isCreateOpen,
        openCreate,
        closeCreate,
    } = useEntityList();

    const users = useReduxSelector((state) => state.users.list);
    const dispatch = useReduxDispatch();

    const { load, reset, hasMoreRef } = usePaginatedList<TUser>({
        method: "GET",
        buildPath: (cursor) => {
            const role = tabRef.current;
            const roleParam = role !== "all" ? `&role=${role}` : "";
            return `/users?limit=${LIMIT}${roleParam}${cursor}`;
        },
        onFirstLoad: (data) => dispatch(setUsers(data)),
        onAppend: (data) => dispatch(appendUsers(data)),
        setLoading,
    });

    const refreshList = () => {
        dispatch(setUsers([]));
        reset();
        load(true);
    };

    useEffect(() => {
        refreshList();
    }, [tabValue]);

    return (
        <>
            <EntityListPage
                entity={usersPageTitle}
                buttonLabel={usersActionButtonLabel}
                description={usersPageDescription}
                onSubmit={openCreate}
            >
                <EntityList
                    hasMore={hasMoreRef.current}
                    loadMore={load}
                    loading={loading}
                    tabValue={tabValue}
                    onChange={onTabChange}
                    tabs={USER_ROLE_TABS}
                    columns={userColumns}
                    header={() => <ColumnsTableHeader columns={userColumns} />}
                    list={users}
                />
            </EntityListPage>

            <UserForm
                open={isCreateOpen}
                onClose={closeCreate}
                onSuccess={refreshList}
            />
        </>
    );
}

export default Users;
