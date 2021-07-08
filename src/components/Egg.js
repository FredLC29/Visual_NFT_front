import React from 'react'
import { Button, Modal} from 'react-bootstrap';


const Egg = ({isShown, ownerStatus, Enum_NFT_Status, tokenData, tokenAddress, mint, burn, handleClose}) => {
  
  return (
    <>
      <Modal show={isShown} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>What a beautiful EGG 🥚! 😊</Modal.Title>
        </Modal.Header>
        {
          ownerStatus === Enum_NFT_Status.IS_OWNER ? 
          <Modal.Body>
            You already got this NFT Easter Egg! <br/>
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
            Do you want to get this NFT Easter Egg?<br/>
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
            This Easter Egg has already been taken! 🤷‍♀️🤷‍♂️<br/>
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
            👍 Get it now 👜🥚🤏
            </Button>
            : 
            <>
            <Button variant="primary" href={`https://kovan.etherscan.io/dapp/${tokenAddress}#inventory`} target="_blank" rel="noreferrer">
            🔍 Find owner 🧐
            </Button>
            </>
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