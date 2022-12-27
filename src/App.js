import { Container } from 'react-bootstrap';
import './App.css';
import Header from './Component/Navbar';
import NBATable from './Component/Table';
function App() {
  return (
   <>
    <Header />
   <Container>
    <NBATable />
   </Container> 
   </>
  );
}

export default App;
