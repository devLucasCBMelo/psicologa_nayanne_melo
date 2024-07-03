import AboutMe from "../../components/AboutMe/AboutMe";
import Footer from "../../components/Footer/Footer";
import fotoPerfil from "../../images/foto_de_perfil.jpg";
import fotoLivro from "../../images/foto_com_livro.jpg";
import styles from "./Login.module.css"

function Login() {
  return (
    <>
      <h1>Psicóloga Nayanne Melo</h1>
      <div className={ styles.container_img }>
        <img src={ fotoPerfil } alt="foto de perfil da psicóloga Nayanne Melo" />
        <img src={ fotoLivro } alt="foto de perfil segurando livro" />
      </div>
      <AboutMe />
      <Footer />
    </>
  )
}

export default Login;
