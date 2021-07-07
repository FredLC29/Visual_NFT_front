import React from 'react'
import { Button, Modal} from 'react-bootstrap';

import { useState } from 'react'


const Egg = ({ tokenId, eggUri, isRenderedEgg, setIsRenderedEgg, mint, burn, name }) => {
    const [show, setShow] = useState(isRenderedEgg)

    const handleClose = () => {
        setIsRenderedEgg(false)
        setShow(false)
    }
    const handleShow = () => setShow(true)

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>What a beautiful EGG </Modal.Title>
        </Modal.Header>
        <Modal.Body> Do you want to mint this NFT egg ?</Modal.Body>
        <img src={eggUri} width="60" alt="egg" title={name}/>
        <Modal.Footer>
          <Button variant="secondary" onClick={burn}>
          👎 Put it back
          </Button>
          <Button variant="primary" onClick={mint}>
          👍 Mint 👜🥚🤏
          </Button>
          <Button variant="primary" onClick={handleClose}>
          ❌ Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>

  )
}

export default Egg