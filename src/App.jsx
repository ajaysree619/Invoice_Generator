import { Container } from "react-bootstrap"
import InvoiceForm from './components/InvoiceForm'
import 'bootstrap/dist/css/bootstrap.min.css'
import './global.css';

const App=()=>{
  return(
    <>
    <div className="d-flex flex-column align-items-center justify-content-center w-100">
      <Container>
        <InvoiceForm/>
      </Container>
    </div>
    </>
  )
}

export default App