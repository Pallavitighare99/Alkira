import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button, Modal, Container, Row, Col } from 'react-bootstrap';

const Info = ({ show, handleClose, id }) => {
  const [info, setInfo] = useState([]);
  // if (id !== undefined) {
  function getData() {
    if(id === undefined) return;
   axios.get(`https://www.balldontlie.io/api/v1/teams/${id}`).then((resp) => {
      setInfo(resp.data);
    })
  }

  useEffect(() => {
    getData();
  }, [id])
// }

  return (
    <>
      <Modal className='info' show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton style={{ backgroundColor: '#F2F2F2' }}>
          <Modal.Title style={{ textAlign: 'center', fontSize: '30px', fontWeight: 'bold' }}>{info.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontSize: '15px', height: '82vh' }}>
          <Container>
            <Row>
              <Col style={{ textAlign: 'start' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p >Full Name: </p> <p>{info.full_name}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p >Abbreviation: </p> <p>{info.abbreviation}</p>
                </div>
                <h5>Random Info About {info.name}</h5>
                <div style={{ marginTop: '10px'}}>
                <div style={{ display: 'flex', justifyContent: 'space-between' , fontWeight: 'bold'}}>
                <p >Division: </p> <p>{info.division}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' , fontWeight: 'bold'}}>
                <p >Conference: </p> <p>{info.conference}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' , fontWeight: 'bold'}}>
                <p >City: </p> <p>{info.city}</p>
                </div>
                </div>
              </Col>
            </Row>
            
          </Container>

        </Modal.Body>
      </Modal>
    </>
  );
}

export default Info