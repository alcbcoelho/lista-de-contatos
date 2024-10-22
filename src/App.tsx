import styled, { createGlobalStyle } from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from './store';

import ContactList from './containers/ContactList';
import Form from './containers/Form';

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    list-style: none;
  }

  body {
    font-family: sans-serif;
    background-color: #efefef;
  }

  h1 {
    text-align: center;
    margin: 24px 0;
  }

  .card {
    margin-bottom: 16px;
    padding: 16px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.125);
  }

  footer {
    padding: 16px 0;
    // background-color: #9f9f9f;
    border-top: 1px #9f9f9f solid; 

    p {
      // color: #efefef;
      color: #9f9f9f;
      font-size: 0.75rem;
      text-align: center;
    }
  }
`;

const Container = styled.div`
  max-width: 960px;
  width: 100%;
  margin: 0 auto;
`;

function App() {
  const contacts = useSelector((state: RootState) => state.contactList.items);

  return (
    <>
      <GlobalStyle />
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
