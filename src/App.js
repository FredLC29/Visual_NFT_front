import './App.css';
import egg from './images/background.jpg';
import egg_basket from './images/egg_basket.png';
import 'bootstrap/dist/css/bootstrap.min.css';

import Web3 from 'web3'

import { useState, useEffect, useCallback } from 'react'
import Egg from './components/Egg';
import EasterEggNFT_ABI from './contracts/EasterEggNFT_ABI.json';

function App() {
  const [isConnectedWeb3, setIsConnectedWeb3] = useState(false)
  const [isRenderedEgg, setIsRenderedEgg] = useState(false)
  const [accounts, setAccounts] = useState([])
  const [web3] = useState(new Web3(Web3.givenProvider || "ws://localhost:8545"))
  
  //IPFS
  const [eggImgUri , setEggImgUri] = useState("")
  const [eggMetaDataUri , setEggMetaDataUri] = useState("")
  const [metadataIpfsHashFolder , setmetadataIpfsHashFolder] = useState("QmckuTg7Tozw3bUD8xTWjDC3X2iWnSKsZVi1GZn8Lsj2wj")
  const [metadataJson , setMetadataJson] = useState("")
  const ipfsHttpGateway = "https://gateway.pinata.cloud/ipfs/"
  
  //contract ERC721
  const tokenAddress = "0x9E701F71D40b7CcB8d75F88C8d3Ee29E8b5E580b"
  const [tokenName, setTokenName] = useState("")
  const [tokenSymbol, setTokenSymbol] = useState("")
  const [tokenSupply, setTokenSupply] = useState(0)
  const [tokenBalance, setTokenBalance] = useState(0)
  const [tokenId, setTokenId] = useState(0)

  const connectToWeb3 = useCallback(
    async () => {
      if(window.ethereum) {
        try {
          await window.ethereum.request({method: 'eth_requestAccounts'})

          setIsConnectedWeb3(true)
        } catch (err) {
          console.error(err)
        }
      } else {
        alert("Install Metamask")
      }
    },[]
  )

  useEffect(() => {
    // Accounts
    const getAccounts = async () => setAccounts(await web3.eth.getAccounts())

    if (accounts.length === 0) getAccounts()

  }, [isConnectedWeb3])
  
  useEffect(() => {
      const easterEggNFTContract = new web3.eth.Contract(EasterEggNFT_ABI, tokenAddress)
      console.log("toto")
      const getEasterEggNFTInfo = async () => {
        try { 
          const name = await easterEggNFTContract.methods.name().call({from: accounts[0]})       
          const symbol = await easterEggNFTContract.methods.symbol().call({from: accounts[0]})
          const supply = await easterEggNFTContract.methods.totalSupply().call({from: accounts[0]})

          setTokenName(name)
          setTokenSymbol(symbol)
          setTokenSupply(supply)
        } catch (error) {
          console.log(error);
          alert("Error getting contract info!")
        }
      }
      getEasterEggNFTInfo()
    }, [isConnectedWeb3, accounts])

  useEffect(() => {
    console.log("new render");   
  }, []);

  const displayEgg = async (_tokenId) => {
    setTokenId(_tokenId);
    setIsRenderedEgg(true);
    const ipfsHttpGateway = "https://gateway.pinata.cloud/ipfs/";
    const tokenURI = "QmWLGTzF12LaKDqRaTGAhBCtGZbgTHEihKt2VKTvkrhgBV";
    setEggImgUri(ipfsHttpGateway + tokenURI);
  }
  
  const cancel = async () => {
    setTokenId(0);
    setIsRenderedEgg(false);
  }
  
  const mint = async () => {
    // if(isConnectedWeb3) {Contract call mint tokenId}
    setIsRenderedEgg(false);
  }
  
  return (
    <div className="App">

      <header className="App-header">
      {
          isConnectedWeb3
            ? <p><img src="https://cdn.worldvectorlogo.com/logos/metamask.svg" alt="logo_metamask" class="logo"></img></p>
            : <button className="btn btn-primary btn-lg" onClick={connectToWeb3}>Connect here</button>
        }
        <h1 className="App-title1">The NFT Easter Egg Hunt 2022</h1>
        <h2 className="App-title2">Earn your NFTs!</h2>

        <p className="App-paragraph">
            Click on the image and find the hidden NFTs.
            <br/>
            Create a MetaMask account and log in.
        </p>

        <br/>
        
        {
          isRenderedEgg && <Egg tokenId={tokenId} eggUri={eggImgUri} isRenderedEgg={isRenderedEgg}/>     
        }

        <img src={egg} alt="Easter egg hunt" width="612" height="408" border="0" useMap="#easter_eggs"/>

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
        
        <h6 style={{color: "black"}}>{tokenName} : {tokenBalance} / {tokenSupply} {tokenSymbol}</h6>
        <img src={egg_basket} width="60" alt="basket"/>
      </header>
      
      <footer className="App-footer">
          <p>Copyright &copy; The Easter Egg Hunt NFT Project, 2021 - All rights reserved | Directed by Fr&eacute;d&eacute;ric, S&eacute;bastien, Micka&euml;l &amp; Marjorie</p>
          <p><a href="https://github.com/FredLC29/Visual_NFT_front/" target="_blank" rel="noreferrer"><img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub" title="GitHub" className="logo_footer"/></a></p>
      </footer>
    </div>
  );
}

export default App;
