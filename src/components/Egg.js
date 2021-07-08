import React from 'react'
import { Button, Modal} from 'react-bootstrap';


const Egg = ({isShown, ownerStatus, Enum_NFT_Status, tokenData, mint, burn, handleClose}) => {
  
  return (
    <>
      <Modal show={isShown} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>What a beautiful EGG 🥚! 😊</Modal.Title>
        </Modal.Header>
        {
          ownerStatus === Enum_NFT_Status.IS_OWNER ? 
          <Modal.Body>
            You've already minted this NFT Easter egg! <br/>
            Do you want to put it back?<br/>
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
          : ownerStatus === Enum_NFT_Status.NOT_OWNED ? 
          <Modal.Body>
            Do you want to mint this NFT Easter egg?<br/>
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
            This Easter egg has already been minted! 🤷‍♀️🤷‍♂️<br/>
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
            ownerStatus === Enum_NFT_Status.IS_OWNER ? 
            <Button variant="primary" onClick={burn}>
            👎 Put it back
            </Button>
            : ownerStatus === Enum_NFT_Status.NOT_OWNED ? 
            <Button variant="primary" onClick={mint}>
            👍 Mint 👜🥚🤏
            </Button>
            : <></>
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