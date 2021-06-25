import './App.css';
import egg from './images/background.jpg';

import { useState, useCallback } from 'react'

function App() {
  const [isConnectedWeb3, setIsConnectedWeb3] = useState(false)

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

        <img src={egg} alt="Easter egg hunt" width="612" height="408" border="0" usemap="#easter_eggs"></img>
            <map name="easter_eggs" id="easter_eggs">
              <area shape="circle" coords="134,328,10" href="" alt="" onclick="alert('Oeuf n°1 trouvé !');" />
              <area shape="circle" coords="193,341,10" href="" alt="" onclick="alert('Oeuf n°2 trouvé !');" />
              <area shape="circle" coords="195,359,10" href="" alt="" onclick="alert('Oeuf n°3 trouvé !');" />
              <area shape="circle" coords="250,348,5" href="" alt="" onclick="alert('Oeuf n°4 trouvé !');" />
              <area shape="circle" coords="288,339,5" href="" alt="" onclick="alert('Oeuf n°5 trouvé !');" />
              <area shape="circle" coords="478,315,5" href="" alt="" onclick="alert('Oeuf n°6 trouvé !');" />
              <area shape="circle" coords="376,248,5" href="" alt="" onclick="alert('Oeuf n°7 trouvé !');" />
              <area shape="circle" coords="481,252,10" href="" alt="" onclick="alert('Oeuf n°8 trouvé !');" />
              <area shape="circle" coords="26,262,3" href="" alt="" onclick="alert('Oeuf n°9 trouvé !');" />
              <area shape="circle" coords="100,242,10" href="" alt="" onclick="alert('Oeuf n°10 trouvé !');" />
              <area shape="circle" coords="536,316,3" href="" alt="" onclick="alert('Oeuf n°11 trouvé !');" />
              <area shape="circle" coords="551,308,3" href="" alt="" onclick="alert('Oeuf n°12 trouvé !');" />
              <area shape="circle" coords="573,252,10" href="" alt="" onclick="alert('Oeuf n°13 trouvé !');" />
            </map>
      </header>
      <footer>
            <p>Copyright &copy; The Easter Egg Hunt NFT Project, 2021 - All rights reserved | Directed by Fr&eacute;d&eacute;ric, S&eacute;bastien, Micka&euml;l &amp; Marjorie</p>
            <p><a href="https://github.com/FredLC29/Visual_NFT_front/" target="_blank" rel="noreferrer"><img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub" title="GitHub" class="logo_footer"/></a></p>
        </footer>
    </div>
  );
}

export default App;
