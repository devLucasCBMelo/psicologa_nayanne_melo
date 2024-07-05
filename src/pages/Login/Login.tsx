import AboutMe from "../../components/AboutMe/AboutMe";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import fotoPerfil from "../../images/foto_de_perfil.jpg";
// import fotoLivro from "../../images/foto_com_livro.jpg";
import styles from "./Login.module.css"
import whatsappLogo from "../../images/whatsapp_logo.png";

function Login() {
  return (
    <>
      <Header />
      <div className={ styles.main_login }>
        <div className={ styles.container }>
          <img className={ styles.container_img } src={ fotoPerfil } alt="foto de perfil da psicóloga Nayanne Melo" />
          <div className={ styles.legenda }>
            <h1>Precisa de ajuda para enfrentar as dificuldades da vida?</h1>
          </div>

          <div className={ styles.legenda2 }>
            <h3>Olá, sou a Nayanne, psicóloga.</h3>
            <h2>Vamos conversar?</h2>
          </div>

          <button className={ styles.consulta }>
            <img className={ styles.consulta_img } src={ whatsappLogo } alt="logo do whatsapp" />
            Agende a sua primeira consulta</button>
        </div>

        <div>
          <h2> Entenda as vantagens da terapia online</h2>
        </div>
      
        <AboutMe />
        <Footer />
      </div>
    </>
  )
}

export default Login;
