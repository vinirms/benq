import { Main, Formulario, Container_form } from "./DadosContaStyle";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Rodape from "../Rodape/Rodape";
import {
  addDoc,
  doc,
  setDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { useValueAutenticacao } from "../../Context/AutenticacaoContext";

import db from "../../Firebase/db.config";
import Perfil from "../Perfil/Perfil";
import { useFetchDado } from "../../Hooks/useFetchDado";
const DadosConta = () => {
  const [nome, setNome] = useState("");
  const [contato, setContato] = useState("");
  const [cpf, setCpf] = useState("");
  const [idade, setIdade] = useState("");
  const [saldo, setSaldo] = useState("");
  const [erro, setErro] = useState("");
  const { user } = useValueAutenticacao();
  const { dado } = useFetchDado();
  const redirect = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await setDoc(doc(db, "user", user.uid), {
      nome,
      contato,
      email: user.email,
      cpf,
      saldo,
      historico: [],
      idade,
      time: serverTimestamp(),
    });
    redirect("/");
  };
  return (
    <>
      <NavBar />
      <Main>
        <Container_form className="container_form">
          <Formulario dado={dado}>
            <legend>Complete seus dados</legend>

            <div className="container_input">
              <label htmlFor="nome">Nome</label>
              <input
                type="text"
                name="nome"
                placeholder="Digite seu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>

            <div className="container_input">
              <label htmlFor="contato">Contato</label>
              <input
                type="text"
                name="contato"
                placeholder="(00)00000-0000"
                value={contato}
                onChange={(e) => setContato(e.target.value)}
                required
              />
            </div>
            <div className="container_input">
              <label htmlFor="cpf">CPF</label>
              <input
                type="text"
                name="cpf"
                placeholder="000.000.000-00"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                required
              />
            </div>
            <div className="container_input">
              <label htmlFor="idade">Data de Nascimento</label>
              <input
                type="text"
                name="idade"
                placeholder="Data de Nascimento"
                value={idade}
                onChange={(e) => setIdade(e.target.value)}
                required
              />
            </div>
            <div className="container_input">
              <label htmlFor="saldo">Saldo</label>
              <input
                type="number"
                name="saldo"
                placeholder="Saldo"
                value={saldo}
                onChange={(e) => setSaldo(e.target.value)}
                required
              />
            </div>

            {erro && <p>{erro}</p>}
            <button onClick={handleSubmit}>Criar Conta</button>
          </Formulario>
        </Container_form>

        <Perfil />
        <div className="forma"></div>
        <div className="bg_forma"></div>
      </Main>
      <Rodape />
    </>
  );
};

export default DadosConta;
