import './App.css';
import background from './images/background.jpg';
import egg_basket from './images/egg_basket.png';

import { useState, useEffect, useCallback } from 'react'

function App() {
  const [isConnectedWeb3, setIsConnectedWeb3] = useState(false)
  const [isRenderedEgg, setIsRenderedEgg] = useState(false)
  const [tokenId, setTokenId] = useState(0);
  const [eggImgUri , setEggImgUri] = useState("")
  const [eggMetaDataUri , setEggMetaDataUri] = useState("")

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
    console.log("new render");   
  }, []);

  const displayEgg = async (_tokenId) => {
    setTokenId(_tokenId);
    setIsRenderedEgg(true);
    const ipfsHttpGateway = "https://gateway.pinata.cloud/ipfs/";
    const tokenURI = "QmWLGTzF12LaKDqRaTGAhBCtGZbgTHEihKt2VKTvkrhgBV";
    setEggImgUri(ipfsHttpGateway + tokenURI);
  }

  
  return (
    <div className="App">
      <header className="App-header">
        <h1>The NFT Easter Egg Hunt 2022</h1>
        <h2>Earn your NFTs!</h2>

        <p>
            Click on the image and find the hidden NFTs.
            <br/>
            Create a MetaMask account and log in.
        </p>

        {
          isConnectedWeb3
            ? <p><img src="https://cdn.worldvectorlogo.com/logos/metamask.svg" alt="logo_metamask" class="logo"></img></p>
            : <button onClick={connectToWeb3}>Connect here</button>
        }

        <br/>
        
        {
          isRenderedEgg && <div><h6>{tokenId}</h6><img src={eggImgUri} width="60" alt="egg"/></div>
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

        <img src={egg_basket} width="60" alt="basket"/>
      </header>
      <footer>
          <p>Copyright &copy; The Easter Egg Hunt NFT Project, 2021 - All rights reserved | Directed by Fr&eacute;d&eacute;ric, S&eacute;bastien, Micka&euml;l &amp; Marjorie</p>
          <p><a href="https://github.com/FredLC29/Visual_NFT_front/" target="_blank" rel="noreferrer"><img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub" title="GitHub" className="logo_footer"/></a></p>
      </footer>
    </div>
  );
}

export default App;
