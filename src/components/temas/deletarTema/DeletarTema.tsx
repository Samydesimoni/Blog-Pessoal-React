import React, { useEffect, useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@material-ui/core";
import { Box } from "@mui/material";
import "./DeletarTema.css";
import { useNavigate, useParams } from "react-router-dom";
import { buscaId, deleteId } from "../../../services/Service";
import Tema from "../../../models/Tema";
import { useSelector } from "react-redux";
import { TokenState } from "../../../store/tokens/tokensReducer";

function DeletarTema() {
  let navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );
  const [tema, setTema] = useState<Tema>();

  useEffect(() => {
    if (token == "") {
      alert("Você precisa estar logado");
      navigate("/login");
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      findById(id);
    }
  }, [id]);

  async function findById(id: string) {
    buscaId(`/temas/${id}`, setTema, {
      headers: {
        Authorization: token,
      },
    });
  }

  async function sim() {
    navigate("/temas");
    try {
      await deleteId(`/temas/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      alert("Tema deletado com sucesso");
    } catch (error) {
      alert("Erro ao deletar");
    }
  }

  function nao() {
    navigate("/temas");
  }

  return (
    <>
      <Box m={2}>
        <Card variant="outlined" className="bgListaP">
          <CardContent>
            <Box justifyContent="center">
              <Typography
                color="textSecondary"
                gutterBottom
                className="fonteCadastroP"
              >
                Deseja deletar o Tema:
              </Typography>
              <Typography color="textSecondary">{tema?.descricao}</Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Box display="flex" justifyContent="start" ml={1.0} mb={2}>
              <Box mx={2}>
                <Button
                  onClick={sim}
                  variant="contained"
                  className="marginLeft fonteCadastroP bgCadastroP"
                  size="large"
                  color="primary"
                >
                  Sim
                </Button>
              </Box>
              <Box mx={2}>
                <Button
                  onClick={nao}
                  variant="contained"
                  size="large"
                  color="secondary"
                  className="fonteCadastroP bgListaPB2"
                >
                  Não
                </Button>
              </Box>
            </Box>
          </CardActions>
        </Card>
      </Box>
    </>
  );
}
export default DeletarTema;
