import { useEffect, useRef, useState } from "react";
import { TableCell, TableRow } from "@mui/material";
import EntityListPage from "../../components/common/EntityListPage";
import EntityList from "../../components/common/EntityList";
import { userColumns } from "../../components/columns";
import { usePaginatedList } from "../../hooks/usePaginatedList";
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

const UsersTableHeader = () => (
    <TableRow>
        {userColumns.map((col, i) => (
            <TableCell key={col.label ?? i} component="th">
                {col.label}
            </TableCell>
        ))}
    </TableRow>
);

function Users() {
    const [loading, setLoading] = useState(false);
    const [tabValue, setTabValue] = useState("all");
    const tabRef = useRef(tabValue);
    tabRef.current = tabValue;

    const users = useReduxSelector((state) => state.users.list);
    const dispatch = useReduxDispatch();

    const { load, reset, hasMoreRef } = usePaginatedList<TUser>({
        buildPath: (cursor) => {
            const role = tabRef.current;
            const roleParam = role !== "all" ? `&role=${role}` : "";
            return `/users?limit=${LIMIT}${roleParam}${cursor}`;
        },
        onFirstLoad: (data) => dispatch(setUsers(data)),
        onAppend: (data) => dispatch(appendUsers(data)),
        setLoading,
    });

    useEffect(() => {
        dispatch(setUsers([]));
        reset();
        load(true);
    }, [tabValue]);

    const onTabChange = (_: React.SyntheticEvent, value: string) =>
        setTabValue(value);

    return (
        <EntityListPage
            entity={usersPageTitle}
            buttonLabel={usersActionButtonLabel}
            description={usersPageDescription}
            onSubmit={() => {}}
        >
            <EntityList
                hasMore={hasMoreRef.current}
                loadMore={load}
                loading={loading}
                tabValue={tabValue}
                onChange={onTabChange}
                tabs={USER_ROLE_TABS}
                columns={userColumns}
                header={UsersTableHeader}
                list={users}
            />
        </EntityListPage>
    );
}

export default Users;
