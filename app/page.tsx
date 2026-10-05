import Link from "next/link";
import { Search, ShieldCheck, History, Users } from "lucide-react";

export default function Home() {
  return <div className="shell">
    <nav className="nav">
      <div className="brand">Consulta<span>AI</span></div>
      <div className="navlinks"><a href="#recursos">Recursos</a><a href="#seguranca">Segurança</a><a href="#acesso">Acesso</a></div>
      <Link className="btn" href="/login">Entrar</Link>
    </nav>
    <main className="container">
      <section className="hero">
        <div>
          <div className="eyebrow">Ferramenta privada • Uso gratuito</div>
          <h1>Consultas em um só lugar.</h1>
          <p>O ConsultaAI agora é uma ferramenta privada, sem planos, créditos ou pagamentos, destinada ao uso pessoal entre você e seus amigos autorizados.</p>
          <div className="actions"><Link className="btn" href="/login">Acessar ferramenta</Link><a className="btn secondary" href="#recursos">Conhecer</a></div>
        </div>
        <div className="panel">
          <div className="eyebrow">Acesso privado</div>
          <h2>Uso gratuito</h2>
          <p className="muted">Não há cobrança, PIX ou sistema de créditos. O acesso continua protegido por login.</p>
          <div className="tag">Somente usuários autorizados</div>
        </div>
      </section>
      <section id="recursos" className="cards">
        <Feature icon={<Search/>} title="Múltiplos tipos" text="Estrutura preparada para CPF, telefone, nome, e-mail e placa."/>
        <Feature icon={<ShieldCheck/>} title="Privacidade" text="Controle de acesso, RLS, auditoria e minimização de dados."/>
        <Feature icon={<History/>} title="Histórico" text="Cada usuário visualiza apenas o próprio histórico."/>
        <Feature icon={<Users/>} title="Grupo privado" text="Sem venda de acesso. Uso restrito ao seu grupo autorizado."/>
        <Feature icon={<ShieldCheck/>} title="Provedores" text="Integrações reais somente com APIs e fontes autorizadas."/>
      </section>
      <section id="acesso" className="panel" style={{marginTop:24}}>
        <h2>Acesso controlado</h2>
        <p className="muted">Compartilhe o acesso apenas com pessoas de confiança. Consultas reais dependem de uma fonte de dados legalmente autorizada.</p>
      </section>
    </main>
    <footer className="footer">© 2026 ConsultaAI • Ferramenta privada e gratuita.</footer>
  </div>;
}
function Feature({icon,title,text}:{icon:React.ReactNode,title:string,text:string}) {
  return <div className="card"><div style={{color:"#42e8a4"}}>{icon}</div><h3>{title}</h3><p className="muted">{text}</p></div>
}