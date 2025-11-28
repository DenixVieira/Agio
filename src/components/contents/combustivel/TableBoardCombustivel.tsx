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
            <TableHeader className="bg-cyan-500">
                <TableRow>
                    <TableHead className=" text-white">Razão Social</TableHead>
                    <TableHead className=" text-white">CNPJ</TableHead>
                    <TableHead className="w-[300px] text-white">Descrição</TableHead>
                    <TableHead className=" text-white" >Bairro</TableHead>
                    <TableHead className=" text-white" >Logradouro</TableHead>
                    <TableHead className=" text-white" >Data última venda</TableHead>
                    <TableHead className=" text-white" >Valor Última Venda</TableHead>
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
                            <TableCell className="text-right">{formatCurrency(item.valorultimaVenda)}</TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    );
};
