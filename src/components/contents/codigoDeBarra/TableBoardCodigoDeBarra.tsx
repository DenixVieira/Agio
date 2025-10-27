import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
    TableCell,
} from "../../ui/table";

interface TableBoardProps {
    data: {
        descricao: string;
        dataVenda: string; // ISO string
        valorVenda: number | string;
        razaoSocial: string;
        nomBairro: string;
        valorMinimo: number;
        valorMaximo: number;
        cnpj: string;
    }[];
}

export const TableBoardCodigoDeBarra = ({ data }: TableBoardProps) => {
    const formatDate = (isoDate: string) => {
        const date = new Date(isoDate);
        return date.toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const formatCurrency = (value: number | string) => {
        const numberValue = typeof value === "string" ? parseFloat(value) : value;
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(numberValue);
    };

    return (

        <Table>
            <TableHeader >
                <TableRow>
                    <TableHead >Bairro</TableHead>
                    <TableHead>Razão Social</TableHead>
                    <TableHead>CNPJ</TableHead>
                    <TableHead className="w-[300px]">Descrição</TableHead>
                    <TableHead>Data última venda</TableHead>
                    <TableHead>Valor Mínimo</TableHead>
                    <TableHead>Valor Máximo</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={4} className="text-center">
                            Nenhuma nota encontrada
                        </TableCell>
                    </TableRow>
                ) : (
                    data.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{(item.nomBairro)}</TableCell>
                            <TableCell>{item.razaoSocial}</TableCell>
                            <TableCell>{item.cnpj}</TableCell>
                            <TableCell className="font-medium">{item.descricao}</TableCell>
                            <TableCell>{formatDate(item.dataUltimaVenda)}</TableCell>
                            <TableCell>{formatCurrency(item.valorMinimo)}</TableCell>
                            <TableCell>{formatCurrency(item.valorMaximo)}</TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    );
};
