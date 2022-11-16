import Spinner from 'react-bootstrap/Spinner';
import { CDBSpinner, CDBContainer } from 'cdbreact';

export default function LoadingBox() {
  return (
    <CDBContainer>
      <CDBSpinner />
    </CDBContainer>
  );
}