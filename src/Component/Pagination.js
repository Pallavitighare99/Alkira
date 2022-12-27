import React from 'react'
import { ButtonGroup, Button, Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleLeft, faAngleLeft, faAngleRight, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'

const Pages = ({ gotoPage, previousPage, nextPage, canPreviousPage, canNextPage, pageOptions, pageCount, pageIndex, pageSize, setPageSize }) => {
  return (
    <div className="row mt-2">
    <div className="col-sm-5 left-col">
      <ButtonGroup aria-label="Basic example">
        <Button variant="outline-primary" onClick={() => gotoPage(0)} disabled={!canPreviousPage}><FontAwesomeIcon icon={faAngleDoubleLeft} /></Button>
        <Button variant="outline-primary" onClick={() => previousPage()} disabled={!canPreviousPage}><FontAwesomeIcon icon={faAngleLeft} /></Button>
        <Button variant="outline-primary" onClick={() => nextPage()} disabled={!canNextPage}><FontAwesomeIcon icon={faAngleRight} /></Button>
        <Button variant="outline-primary" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}><FontAwesomeIcon icon={faAngleDoubleRight} /></Button>
      </ButtonGroup>
      &nbsp;
      <span>
        Page{' '}
        <strong>
          {pageIndex + 1} of {pageOptions.length}
        </strong>{' '}
      </span>
    </div>
    <div className="col-sm-4"></div>
    <div className="col-sm-3 right-col">
      <Form.Group className="mb-3" >
        <Form.Control as="select" className="textbox-back" value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}>
          {[5, 10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize} Rows
            </option>
          ))}
        </Form.Control>
      </Form.Group>
    </div>
  </div>
  )
}

export default Pages