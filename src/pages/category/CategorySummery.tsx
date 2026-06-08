import { TableCell, TableRow } from "@mui/material";
import type {
    TCategorySections,
    TCategorySummeryObj,
} from "../../utils/components";
import Text from "../../components/common/Text/Text";

interface TCategorySats {
    data: TCategorySummeryObj;
    config: TCategorySections["summery"];
}
export default function CategorySummery({ data, config }: TCategorySats) {
    return (
        <>
            <TableRow>
                <TableCell>
                    <Text font="semiBold" customClass="font20">
                        {config.title}
                    </Text>
                </TableCell>
            </TableRow>

            {config.fields.map((col) => (
                <TableRow key={col.key}>
                    <TableCell className="table-head">{col.label}</TableCell>
                    <TableCell>{col.render && col.render(data)}</TableCell>
                </TableRow>
            ))}
        </>
    );
}
