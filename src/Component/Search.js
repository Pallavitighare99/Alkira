import React from 'react'
import { InputGroup, Button, Form, Container } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
const Search = ({setValue, value, onChange}) => {
  return (
    <Form.Group>
        <FontAwesomeIcon icon={faSearch} className="search" />&nbsp;&nbsp;&nbsp;&nbsp;
        <Form.Control type="text"
          value={value || ""}
          onChange={e => {
            setValue(e.target.value);
            onChange(e.target.value);
          }} className="textbox-back"

          style={{ width: '100%' }}
        />
      </Form.Group>
  )
}

export default Search