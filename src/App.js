import './App.css';
import background from './images/background.jpg';
import egg_basket from './images/egg_basket.png';

import images from './utils/getImages'

import 'bootstrap/dist/css/bootstrap.min.css';

import Web3 from 'web3';

import EasterEggNFT_ABI from './contracts/EasterEggNFT_ABI.json';

import Egg from './components/Egg';

import { useState, useEffect } from 'react'


function App() {
  const [web3, setWeb3] = useState(new Web3(Web3.givenProvider || "ws://localhost:8545"))
  const [isConnectedWeb3, setIsConnectedWeb3] = useState(false)
  const [accounts, setAccounts] = useState([])
  const [tokenAddress, setTokenAddress] = useState("0x9E701F71D40b7CcB8d75F88C8d3Ee29E8b5E580b")
  const [easterEggNFTContract, setEasterEggNFTContract] = useState(new web3.eth.Contract(EasterEggNFT_ABI, tokenAddress))
  const [tokenName, setTokenName] = useState("")
  const [tokenSymbol, setTokenSymbol] = useState("")
  const [tokenSupply, setTokenSupply] = useState(0)
  const [tokenBalance, setTokenBalance] = useState(0)
  const [tokenId, setTokenId] = useState(0);
  const [isRenderedEgg, setIsRenderedEgg] = useState(false)
  const [isOwnerOfTId, setIsOwnerOfTId] = useState(false)
  const [metadataIpfsHashFolder , setmetadataIpfsHashFolder] = useState("QmckuTg7Tozw3bUD8xTWjDC3X2iWnSKsZVi1GZn8Lsj2wj")
  const [metadatas, setMetadatas] = useState([])
  const [metadataJson, setMetadataJson] = useState({})

  const ipfsHttpGateway = "https://gateway.pinata.cloud/ipfs/";
  
  const connectToWeb3 = async () => {
    if(window.ethereum) {
      try {
        await window.ethereum.request({method: 'eth_requestAccounts'})

        setIsConnectedWeb3(true)
      } catch (err) {
        console.error(err)
      }
    } else {
      alert("Please install Metamask")
    }
  }

  useEffect(() => {
    const displayConnect =  () => {
      //alert("Connected"); 
      const getAccounts = async () => setAccounts(await web3.eth.getAccounts())

      const acc = getAccounts()

      if(acc.length === 0) {
        setIsConnectedWeb3(false)
      } else {
        setIsConnectedWeb3(true)
      }
    }

    const displayDisconnect =  () => {
      // alert("Disconnected"); 
      setIsConnectedWeb3(false)
    }

    const displayChainChanged =  () => {
      alert("Chain changed! Please use Kovan Network.")
    }

    const displayAccChanged =  () => {
      // alert("Accounts changed")
      const getAccounts = async () => setAccounts(await web3.eth.getAccounts())

      const acc = getAccounts()

      if(acc.length === 0) {
        setIsConnectedWeb3(false)
      } else {
        setIsConnectedWeb3(true)
      }
    }

    window.ethereum.on('connect', displayConnect)
    window.ethereum.on('disconnect', displayDisconnect)
    window.ethereum.on('chainChanged', displayChainChanged)
    window.ethereum.on('accountsChanged', displayAccChanged)

    return () => {
      if (window.ethereum.removeListener) {
        window.ethereum.removeListener('connect', displayConnect)
        window.ethereum.removeListener('disconnect', displayDisconnect)
        window.ethereum.removeListener('chainChanged', displayChainChanged)
        window.ethereum.removeListener('accountsChanged', displayAccChanged)
      }
    }
  }, [])
  
  useEffect(() => {
    // Accounts
    const getAccounts = async () => setAccounts(await web3.eth.getAccounts())
    
    if (accounts.length === 0) getAccounts()
    
    // console.log(accounts)

    if(accounts.length === 0) {
      setIsConnectedWeb3(false)
    } else {
      setIsConnectedWeb3(true)
    }
  }, [accounts, web3.eth])

  useEffect(() => {
    const getEasterEggNFTInfo = () => {
      try {
        // const name = 
        easterEggNFTContract.methods.name().call({from: accounts[0]})
        .then(function(receipt){
          console.log("name", receipt);
          setTokenName(receipt)
        });
        
        // const symbol = 
        easterEggNFTContract.methods.symbol().call({from: accounts[0]})
        .then(function(receipt){
          console.log("symbol", receipt);
          setTokenSymbol(receipt)
        });
        
        // const supply = 
        easterEggNFTContract.methods.supply().call({from: accounts[0]})
        .then(function(receipt) {
          console.log("supply", receipt);
          setTokenSupply(receipt)
        });
      } catch (error) {
        console.log(error);
        //alert("Error getting contract info!")
      }
    }
    
    const getTokenBalance = async () => {
      try {
        const balance = await easterEggNFTContract.methods.balanceOf(accounts[0]).call({from: accounts[0]})
        
        setTokenBalance(balance)
      } catch (error) {
        console.log(error);
        // alert("Error getting contract info!")
      }
    }

    if(isConnectedWeb3 && accounts && accounts.length) {
      getEasterEggNFTInfo()
      getTokenBalance()
    }
  }, [isConnectedWeb3, accounts, easterEggNFTContract.methods])


  useEffect(() => {
    let _metadatas = []
    _metadatas.push({})
    for(let id = 1; id <= 15; id++) {
      const eggMetaDataUri = ipfsHttpGateway + metadataIpfsHashFolder + "/" + id;
      // console.log(eggMetaDataUri)
      fetch(eggMetaDataUri)
      .then((res) => {
        if (res.status < 400) {
          return res.json();
        }
        else {
          throw new Error("Someting bad happened")
        }
      })
      .then((json) => {
        // console.log(json);
        json.url = ipfsHttpGateway + json.image;
        _metadatas.push(json)
        // console.log(_metadatas)
        setMetadatas(_metadatas)
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [])

  useEffect(() => {
    if (tokenId && isConnectedWeb3) {
      const ownerOf = () => {
        try {
          easterEggNFTContract.methods.ownerOf(tokenId).call({from: accounts[0]}, function(error, result) {
            if(error) {
              console.log("ERROR in ownerOf call", error);
              setIsOwnerOfTId(false);
              setMetadataJson(metadatas[tokenId]);
              setIsRenderedEgg(true);
            }
            else {
              console.log("ownerOf(" + tokenId + ")", result);
              console.log("Address connected", accounts[0]);
              setIsOwnerOfTId(result === accounts[0]);
              setMetadataJson(metadatas[tokenId]);
              setIsRenderedEgg(true);
            }
          });
        } catch(err) {
          console.log(err);
          // alert("Error ownerOf NFT!")
        }
      }

      ownerOf(tokenId);
    }
  }, [tokenId, metadatas, accounts, isConnectedWeb3, easterEggNFTContract.methods])

  const displayEgg = async (_tokenId) => {
    if (_tokenId) {
      setTokenId(_tokenId);
    }
  }
  
  const handleClose = async () => {
    setTokenId(0);
    setIsRenderedEgg(false);
  }
  
  const mint = async () => {
    try {
      await easterEggNFTContract.methods.mint(accounts[0], tokenId).send({from: accounts[0]})
      .on('error', function(error, receipt) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
        console.log(error);
        //alert("Egg already minted!")
      })
      .then(function(receipt) {
        setIsRenderedEgg(false);
      });
    } catch(err) {
      console.log(err);
      // alert("Error minting NFT!")
    }
  }

  const burn = async () => {
    try {
      await easterEggNFTContract.methods.burn(tokenId).send({from: accounts[0]})
      .on('error', function(error, receipt) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
        console.log(error);
      })
      .then(function(receipt){
        setIsRenderedEgg(false);
      });
    } catch(err) {
      console.log(err);
      // alert("Error burning NFT!")
    }
  }

  return (
    <div className="App">
      <header className="App-header">
      {
          isConnectedWeb3
            ? <p><img src="https://cdn.worldvectorlogo.com/logos/metamask.svg" alt="logo_metamask" className="logo" title={`Connected address: ${accounts[0]}`}></img></p>
            : <button className="btn btn-primary btn-lg" onClick={connectToWeb3}>Connect here</button>
        }
        <h1 className="App-title1">The NFT Easter Egg Hunt 2022</h1>
        <h2 className="App-title2">Earn your NFTs!</h2>

        <p className="App-paragraph">
            Click on the image and find the hidden NFTs.
            <br/>
            Create a MetaMask account and log in.
        </p>
        
        {/* {
          isRenderedEgg && 
          <div>
            <h6 style={{color: "black"}}>{tokenId}</h6>
            <div><img src={metadatas[tokenId].url} width="60" alt="egg" title={metadatas[tokenId].name}/></div>
            <button onClick={mint}>👍 Mint 👜🥚🤏</button>
            <button onClick={burn}>👎 Put it back</button>
            <button onClick={handleClose}>❌ Close</button>
          </div>
        } */}

        <br/>
        
        {/* {console.log(metadatas)} */}
        {
          metadataJson && 
          <Egg
            isShown={isRenderedEgg}
            isOwner={isOwnerOfTId}
            tokenData={metadataJson}
            mint={mint}
            burn={burn}
            handleClose={handleClose}
          />
        }
        
        <img src={background} alt="Easter egg hunt" width="612" height="408" border="0" useMap="#easter_eggs"/>

        <map name="easter_eggs" id="easter_eggs">
          <area shape="circle" coords="134,328,10" alt="egg" onClick={() => displayEgg(1)} />
          <area shape="circle" coords="193,341,10" alt="egg" onClick={() => displayEgg(2)} />
          <area shape="circle" coords="195,359,10" alt="egg" onClick={() => displayEgg(3)} />
          <area shape="circle" coords="250,348,5" alt="egg" onClick={() => displayEgg(4)} />
          <area shape="circle" coords="288,339,5" alt="egg" onClick={() => displayEgg(5)} />
          <area shape="circle" coords="478,315,5" alt="egg" onClick={() => displayEgg(6)} />
          <area shape="circle" coords="376,248,5" alt="egg" onClick={() => displayEgg(7)} />
          <area shape="circle" coords="481,252,10" alt="egg" onClick={() => displayEgg(8)} />
          <area shape="circle" coords="26,262,3" alt="egg" onClick={() => displayEgg(9)} />
          <area shape="circle" coords="100,242,10" alt="egg" onClick={() => displayEgg(10)} />
          <area shape="circle" coords="536,316,3" alt="egg" onClick={() => displayEgg(11)} />
          <area shape="circle" coords="551,308,3" alt="egg" onClick={() => displayEgg(12)} />
          <area shape="circle" coords="573,252,10" alt="egg" onClick={() => displayEgg(13)} />
        </map>

        <br/>
        
        <h6 style={{color: "black"}}>{tokenBalance} / {tokenSupply}</h6>
        <a href={`https://kovan.etherscan.io/dapp/${tokenAddress}#inventory`} target="_blank">
          <img src={egg_basket} width="60" alt="basket"/>
        </a>

        <br/>
      </header>
      
      <footer className="App-footer">
          <p>Copyright &copy; The Easter Egg Hunt NFT Project, 2021 - All rights reserved | Directed by Fr&eacute;d&eacute;ric, S&eacute;bastien, Micka&euml;l &amp; Marjorie</p>
          <p><a href="https://github.com/FredLC29/Visual_NFT_front/" target="_blank" rel="noreferrer"><img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub" title="GitHub" className="logo_footer"/></a></p>
      </footer>
    </div>
  );
}

export default App;
