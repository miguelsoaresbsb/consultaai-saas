"use client";

import {useState} from "react";
import {createClient} from "../../../lib/supabase-browser";
import Link from "next/link";

async function sha256(value:string){
  const data = new TextEncoder().encode(value.trim().toLowerCase());
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash)).map(b=>b.toString(16).padStart(2,"0")).join("");
}

export default function Consultar(){
  const [type,setType]=useState("cpf");
  const [query,setQuery]=useState("");
  const [msg,setMsg]=useState("");

  async function submit(e:React.FormEvent){
    e.preventDefault();
    setMsg("");

    const supabase=createClient();
    const {data:{user}}=await supabase.auth.getUser();
    if(!user){location.href="/login";return}

    const value=query.trim();
    const masked=value.length>4?"*".repeat(Math.max(0,value.length-4))+value.slice(-4):"****";
    const queryHash=await sha256(value);

    const {error}=await supabase.from("consultations").insert({
      user_id:user.id,
      type,
      query_hash:queryHash,
      query_masked:masked,
      status:"pending",
      provider:null,
      result:null,
      credits_spent:0
    });

    setMsg(error?error.message:"Consulta registrada. O processamento por provedor autorizado será conectado no backend.");
  }

  return <main className="dash">
    <Link href="/dashboard" className="brand">Consulta<span>AI</span></Link>
    <div className="panel" style={{maxWidth:700,margin:"50px auto"}}>
      <h1>Nova consulta</h1>
      <p className="muted">Modo demonstração seguro. Nenhum dado real é consultado.</p>
      <form className="form" onSubmit={submit}>
        <select className="input" value={type} onChange={e=>setType(e.target.value)}>
          <option value="cpf">CPF</option>
          <option value="phone">Telefone</option>
          <option value="name">Nome</option>
          <option value="email">E-mail</option>
          <option value="plate">Placa</option>
        </select>
        <input className="input" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Digite o valor para pesquisar" required/>
        <button className="btn">Consultar</button>
      </form>
      {msg&&<p className="muted" style={{marginTop:20}}>{msg}</p>}
    </div>
  </main>
}