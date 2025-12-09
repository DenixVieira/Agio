import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
    TableCell,
} from "./../ui/table";

interface Column<T> {
    header: string;
    accessor: keyof T;
    width?: string;
    align?: "left" | "right" | "center";
    formatter?: (value: any, row: T) => React.ReactNode;
}

interface CompactTableProps<T> {
    data: T[];
    columns: Column<T>[];
    maxHeight?: string; // ex: "600px"
}

export const CompactTable = <T extends Record<string, any>>({
    data,
    columns,
    maxHeight = "600px",
}: CompactTableProps<T>) => {
    return (
        <div className={`w-full overflow-x-auto max-h-[${maxHeight}] border-3`}>
            <Table className="text-xs">
                <TableHeader>
                    <TableRow>
                        {columns.map((col, idx) => (
                            <TableHead
                                key={idx}
                                className={`sticky top-0 z-30 bg-cyan-500 text-white px-2 py-1 ${col.width || "w-auto"} ${
                                    col.align === "right" ? "text-right" : col.align === "center" ? "text-center" : ""
                                }`}
                            >
                                {col.header}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="text-center px-2 py-1">
                                Nenhuma nota encontrada
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((row, rowIndex) => (
                            <TableRow key={rowIndex}>
                                {columns.map((col, colIndex) => (
                                    <TableCell
                                        key={colIndex}
                                        className={`px-2 py-1 ${col.width || "w-auto"} ${
                                            col.align === "right" ? "text-right" : col.align === "center" ? "text-center" : ""
                                        }`}
                                    >
                                        {col.formatter ? col.formatter(row[col.accessor], row) : row[col.accessor]}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};
