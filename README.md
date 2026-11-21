# 👔 ADStore — E-commerce de Moda Masculina

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Status](https://img.shields.io/badge/Status-Concluído-brightgreen?style=for-the-badge)

Projeto front-end de uma loja virtual de vestuário masculino desenvolvida com **HTML5**, **CSS3** e **JavaScript**, com foco em organização de código, semântica, interatividade no navegador e estilização modular.

---

## 🎯 Sobre o Projeto

A **ADStore** simula a experiência de navegação de um e-commerce moderno, oferecendo uma vitrine principal com banners promocionais, seções dedicadas para cada linha de produto e interatividade via JavaScript para o fluxo de usuário.

### Principais Características
- **Arquitetura Modular:** Separação clara entre páginas e folhas de estilo por domínio, reutilizando componentes globais como o cabeçalho (`compartilhado/cabecalho.css`) para evitar repetição de código.
- **Navegação por Categorias:** Catálogos específicos para **Camisetas**, **Calças** (modelos chino, reto, wide leg, pantalona e social) e **Moletons**.
- **Interatividade e Fluxo de Usuário:** Telas de **Login** e **Cadastro** com lógica front-end implementada em **JavaScript**.
- **Vanilla Stack:** Desenvolvido inteiramente com tecnologias nativas da web (**HTML5**, **CSS3** e **JavaScript puro**), sem dependência de frameworks externos.

---

## 📂 Estrutura do Repositório

```text
projetoWEB-organizado/
├── index.html                  # Página inicial (Vitrine e destaques)
├── style.css                   # Estilização da página inicial
├── compartilhado/
│   └── cabecalho.css           # Estilos globais do cabeçalho e menu de navegação
├── camisetas/
│   ├── camisetas.html          # Catálogo de camisetas
│   └── camisetas.css           # Estilos da seção de camisetas
├── calças/
│   ├── calças.html             # Catálogo de calças
│   └── calças.css              # Estilos da seção de calças
├── moletons/
│   ├── moletons.html           # Catálogo de moletons
│   └── moletons.css            # Estilos da seção de moletons
├── login/
│   ├── login.html              # Tela de autenticação
│   └── login.css               # Estilos do formulário de login
├── cadastro/
│   ├── cadastro.html           # Tela de criação de conta
│   └── cadastro.css            # Estilos do formulário de cadastro
└── imagens/                    # Ativos visuais (banners, logotipos e catálogo de produtos)