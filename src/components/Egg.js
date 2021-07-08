import React from 'react'
import { Button, Modal} from 'react-bootstrap';


const Egg = ({isShown, isOwner, tokenData, mint, burn, handleClose}) => {
  
  return (
    <>
      <Modal show={isShown} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>What a beautiful EGG 🥚! 😊</Modal.Title>
        </Modal.Header>
        {
          isOwner ? 
          <Modal.Body>
            You've already minted this NFT easter egg! Do you want to put it back?<br/>
            <br/>
            <center>
              <img src={tokenData.url} width="80" alt="egg" title={tokenData.name}/>
              <br/>
              {tokenData.description}
              <br/>
              <b>{tokenData.name}</b>
              <p><i>Difficulty: {tokenData.difficulty}</i></p>
            </center>
          </Modal.Body>
          : 
          <Modal.Body>
            Do you want to mint this NFT easter egg?<br/>
            <br/>
            <center>
              <img src={tokenData.url} width="80" alt="egg" title={tokenData.name}/>
              <br/>
              {tokenData.description}
              <br/>
              <b>{tokenData.name}</b>
              <p><i>Difficulty: {tokenData.difficulty}</i></p>
            </center>
          </Modal.Body>
        }
        <Modal.Footer>
          {
            isOwner ?
            <Button variant="primary" onClick={burn}>
            👎 Put it back
            </Button>
            :
            <Button variant="primary" onClick={mint}>
            👍 Mint 👜🥚🤏
            </Button>
          }
          <Button variant="secondary" onClick={handleClose}>
          ❌ Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>

  )
}

export default Egg