import './App.css';
import background from './images/background.jpg';
import egg_basket from './images/egg_basket.png';

import { useState, useEffect, useCallback } from 'react'

function App() {
  const [isConnectedWeb3, setIsConnectedWeb3] = useState(false)
  const [foundEgg, setFoundEgg] = useState(false)
  const [imgEgg, setImgEgg] = useState("")

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

  const displayEgg = async (tokenURI) => {
      setFoundEgg(true);
      //const tokenURI = "https://gateway.pinata.cloud/ipfs/QmWLGTzF12LaKDqRaTGAhBCtGZbgTHEihKt2VKTvkrhgBV";
      //import egg from "https://gateway.pinata.cloud/ipfs/QmWLGTzF12LaKDqRaTGAhBCtGZbgTHEihKt2VKTvkrhgBV";
      //fetch("https://gateway.pinata.cloud/ipfs/QmWLGTzF12LaKDqRaTGAhBCtGZbgTHEihKt2VKTvkrhgBV")
      //.then(res=>res.json());
      setImgEgg(tokenURI);
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
          foundEgg && <div><img src={imgEgg} width="60" alt="egg"></img></div>
        }

        <img src={background} alt="Easter egg hunt" width="612" height="408" border="0" useMap="#easter_eggs"></img>
        <map name="easter_eggs" id="easter_eggs">
          <area shape="circle" coords="134,328,10" alt="" onClick={()=>displayEgg("https://gateway.pinata.cloud/ipfs/QmWLGTzF12LaKDqRaTGAhBCtGZbgTHEihKt2VKTvkrhgBV")} />
          
        </map>

        <div><img src={egg_basket} width="60" alt="basket"></img></div>
      </header>
      <footer>
          <p>Copyright &copy; The Easter Egg Hunt NFT Project, 2021 - All rights reserved | Directed by Fr&eacute;d&eacute;ric, S&eacute;bastien, Micka&euml;l &amp; Marjorie</p>
          <p><a href="https://github.com/FredLC29/Visual_NFT_front/" target="_blank" rel="noreferrer"><img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub" title="GitHub" className="logo_footer"/></a></p>
      </footer>
    </div>
  );
}

export default App;
