import axios from "axios";

const AppToken = ""
const headers = {
    "AppToken": AppToken,
    "Content-Type": "application/json",
};

export const sefazAPI = {
    consultarPrecosCombustivel: async (
        codTipoCombustivel = 1,
        dias = 3,
        latitude = -9.6432331,
        longitude = -35.7190686,
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
            console.log("✅ Requisição Realizada", response.data);
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
            console.log("✅ Requisição Realizada", response.data);
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
            console.log("✅ Requisição Realizada", response.data);
        } catch (error) {
            if (error.response) {
                console.error("❌ Erro na API:", error.response.status, error.response.data);
            } else {
                console.error("⚠️ Erro inesperado:", error.message);
            }
        }

    },

    consultarNotasDeEstabelecimento: async (

    ) => {
        const url = "http://api.sefaz.al.gov.br/sfz-economiza-alagoas-api/api/public/produto/pesquisa"
        const body = {
            "produto": {
                "descricao": "LEITE"
            },
            "estabelecimento": {
                "individual": {
                    "cnpj": "32136781000132"
                }
            },
            "dias": 6,
            "pagina": 1,
            "registrosPorPagina": 50
        }
        try {
            const response = await axios.post(url, body, { headers });
            console.log("✅ Requisição Realizada", response.data.conteudo);
        } catch (error) {
            if (error.response) {
                console.error("❌ Erro na API:", error.response.status, error.response.data);
            } else {
                console.error("⚠️ Erro inesperado:", error.message);
            }
        }

    }

}


sefazAPI.consultarNotasDeEstabelecimento()
