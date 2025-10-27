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
        valorultimaVenda: number | string;
        razaoSocial: string;
        nomBairro: string;
        nomLogradouro: string;
        dataUltimaVenda: string;
        cnpj: string;
    }[];
}

export const TableBoardCombustivel = ({ data }: TableBoardProps) => {
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
                    <TableHead>Razão Social</TableHead>
                    <TableHead>CNPJ</TableHead>
                    <TableHead className="w-[300px]">Descrição</TableHead>
                    <TableHead >Bairro</TableHead>
                    <TableHead >Logradouro</TableHead>
                    <TableHead>Data última venda</TableHead>
                    <TableHead>Valor Última Venda</TableHead>
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
                            <TableCell>{item.razaoSocial}</TableCell>
                            <TableCell>{item.cnpj}</TableCell>
                            <TableCell className="font-medium">{item.descricao}</TableCell>
                            <TableCell>{(item.nomBairro)}</TableCell>
                            <TableCell>{(item.nomLogradouro)}</TableCell>
                            <TableCell>{formatDate(item.dataUltimaVenda)}</TableCell>
                            <TableCell>{formatCurrency(item.valorultimaVenda)}</TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    );
};
