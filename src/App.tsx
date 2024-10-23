import { useSelector } from 'react-redux';
import { RootState } from './store';

import Container from './containers/Container';
import ContactList from './containers/ContactList';
import Form from './containers/Form';
import Snackbar from './components/Snackbar';

import GlobalStyle from './global-style';

function App() {
  const contacts = useSelector((state: RootState) => state.contactList.items);

  return (
    <>
      <GlobalStyle />
      <Snackbar duration={3000}>Contato excluído com sucesso.</Snackbar>
      <Container>
        <h1>Minha lista de contatos</h1>
        <Form />
        <ContactList contacts={contacts} />
      </Container>
      <footer>
        <Container>
          <p>&copy; 2024 - André Coêlho</p>
        </Container>
      </footer>
    </>
  );
}

export default App;
