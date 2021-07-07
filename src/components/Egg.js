import React from 'react'
import { Button, Modal} from 'react-bootstrap';

import { useState } from 'react'


const Egg = ({ tokenId, eggUri, isRenderedEgg }) => {
    const [show, setShow] = useState(isRenderedEgg)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>What a beautiful EGG ;) {tokenId} </Modal.Title>
        </Modal.Header>
        <Modal.Body> Do you want to buy this EGG_NFT ?</Modal.Body>
        <img src={eggUri} width="60" alt="egg"/>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
          👎 Put it back
          </Button>
          <Button variant="primary" onClick={handleClose}>
          👍 Mint 🤏📌
          </Button>
        </Modal.Footer>
      </Modal>
    </>

  )
}

export default Egg