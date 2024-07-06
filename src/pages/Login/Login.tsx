import AboutMe from "../../components/AboutMe/AboutMe";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import fotoPerfil from "../../images/foto_de_perfil.jpg";
// import fotoLivro from "../../images/foto_com_livro.jpg";
import styles from "./Login.module.css"
import whatsappLogo from "../../images/whatsapp_logo.png";
import nayphone from "../../images/nayphone-removebg.png";

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
            <h4>Agende a sua primeira consulta</h4>
          </button>
        </div>

        <div className={ styles.container_2 }>
          <div className={ styles.container_2_left}>
            <img src={ nayphone } alt="nayanne no telefone" />
          </div>
          <div className={ styles.container_2_div }>
            <h2 className={ styles.lora_xablau}>Entenda as vantagens da terapia online</h2>
            <div className={ styles.container_2_div_number }>
              <h2>1</h2>
              <h3>No conforto da sua casa</h3>
            </div>

            <div className={ styles.container_2_div_number }>
              <h2>2</h2>
              <h3>Oferece maior flexibilidade</h3>
            </div>

            <div className={ styles.container_2_div_number }>
              <h2>3</h2>
              <h3>Garante o apoio emocional</h3>
            </div>

            <div className={ styles.container_2_div_number }>
              <h2>4</h2>
              <h3>Minimizar a distância</h3>
            </div>
          </div>
        </div>
      
        <AboutMe />
        <Footer />
      </div>
    </>
  )
}

export default Login;
