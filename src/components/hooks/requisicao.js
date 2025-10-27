import axios from "axios";


const AppToken = ""
const headers = {
    "AppToken": AppToken,
    "Content-Type": "application/json",
};

export const sefazAPI = {
    consultarPrecosCombustivel: async (
        codTipoCombustivel = 2,
        dias = 3,
        latitude = -9.607793655858874,
        longitude = -35.745427817498026,
        raio = 15
    ) => {
        const url = "http://api.sefaz.al.gov.br/sfz_nfce_api/api/public/consultarPrecosCombustivel"
        const body = {
            "codTipoCombustivel": codTipoCombustivel,
            "dias": dias,
            "latitude": latitude,
            "longitude": longitude,
            "raio": raio
        }
        try {
            const response = await axios.post(url, body, { headers });
                const resultado = response.data.map(item => ({
                razaoSocial: item.nomRazaoSocial,
                cnpj: item.numCNPJ,
                descricao: item.dscProduto,
                nomBairro: item.nomBairro,
                nomLogradouro: item.nomLogradouro,
                dataUltimaVenda: item.dthEmissaoUltimaVenda,
                valorultimaVenda: item.valUnitarioUltimaVenda,
            }));

            return resultado;
        } catch (error) {
            if (error.response) {
                console.error("❌ Erro na API:", error.response.status, error.response.data);
            } else {
                console.error("⚠️ Erro inesperado:", error.message);
            }
        }

    },


    consultarPrecosPorCodigoDeBarras: async (
        codigoDeBarras = "07894900010015",
        dias = 3,
        latitude = -9.6432331,
        longitude = -35.7190686,
        raio = 15
    ) => {
        const url = "http://api.sefaz.al.gov.br/sfz_nfce_api/api/public/consultarPrecosPorCodigoDeBarras"
        const body = {
            "codigoDeBarras": codigoDeBarras,
            "dias": dias,
            "latitude": latitude,
            "longitude": longitude,
            "raio": raio
        }
        try {
            const response = await axios.post(url, body, { headers });
            console.log(response.data)

            const resultado = response.data.map(item => ({
                razaoSocial: item.nomRazaoSocial,
                cnpj: item.numCNPJ,
                descricao: item.dscProduto,
                nomBairro: item.nomBairro,
                valorMinimo: item.valMinimoVendido,
                valorMaximo: item.valMaximoVendido,
                dataUltimaVenda: item.dthEmissaoUltimaVenda
            }));

            return resultado;
        } catch (error) {
            if (error.response) {
                console.error("❌ Erro na API:", error.response.status, error.response.data);
            } else {
                console.error("⚠️ Erro inesperado:", error.message);
            }
        }

    },



    consultarPrecosPorDescricao: async (
        descricao = "gasolina",
        dias = 3,
        latitude = -9.6432331,
        longitude = -35.7190686,
        raio = 15
    ) => {
        const url = "http://api.sefaz.al.gov.br/sfz_nfce_api/api/public/consultarPrecosPorDescricao"
        const body = {
            "descricao": descricao,
            "dias": dias,
            "latitude": latitude,
            "longitude": longitude,
            "raio": raio
        }
        try {
            const response = await axios.post(url, body, { headers });
            console.log(response.data.conteudo)
            let teste = response.data.conteudo
            const resultado = teste.map(item => ({
                descricao: item.produto.descricao,
                dataVenda: item.produto.venda.dataVenda,
                valorVenda: item.produto.venda.valorVenda,
                cnpj: item.estabelecimento.cnpj,
                razaoSocial: item.estabelecimento.razaoSocial
            }));

            return resultado;
        } catch (error) {
            if (error.response) {
                console.error("❌ Erro na API:", error.response.status, error.response.data);
            } else {
                console.error("⚠️ Erro inesperado:", error.message);
            }
        }

    },

    consultarNotasDeEstabelecimento: async (
        descricao = "gasolina", cnpj = "15503894000100"
    ) => {
        const url = "http://api.sefaz.al.gov.br/sfz-economiza-alagoas-api/api/public/produto/pesquisa"
        const body = {
            "produto": {
                "descricao": descricao
            },
            "estabelecimento": {
                "individual": {
                    "cnpj": cnpj
                }
            },
            "dias": 6,
            "pagina": 1,
            "registrosPorPagina": 50
        }
        try {
            const response = await axios.post(url, body, { headers });
            const resultado = response.data.conteudo.map(item => ({
                descricao: item.produto.descricao,
                dataVenda: item.produto.venda.dataVenda,
                valorVenda: item.produto.venda.valorVenda,
                cnpj: item.estabelecimento.cnpj,
                razaoSocial: item.estabelecimento.razaoSocial
            }));

            return resultado;
        } catch (error) {
            if (error.response) {
                console.error("❌ Erro na API:", error.response.status, error.response.data);
            } else {
                console.error("⚠️ Erro inesperado:", error.message);
            }
        }

    }

}


sefazAPI.consultarPrecosCombustivel() 
