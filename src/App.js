import './App.css';
import egg from './images/background.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
//import logo from '../images/background.jpg'

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
        <img src={egg} alt="Easter egg hunt" width="612" height="408" border="0" usemap="#easter_eggs"></img>
            <map name="easter_eggs" id="easter_eggs">
              <area shape="circle" coords="134,328,10" href="" alt="" onClick="alert('Egg n°1 find!');" />
              <area shape="circle" coords="193,341,10" href="" alt="" onClick="alert('Egg n°2 find!');" />
              <area shape="circle" coords="195,359,10" href="" alt="" onClick="alert('Egg n°3 find!');" />
              <area shape="circle" coords="250,348,5" href="" alt="" onClick="alert('Egg n°4 find!');" />
              <area shape="circle" coords="288,339,5" href="" alt="" onClick="alert('Egg n°5 find!');" />
              <area shape="circle" coords="478,315,5" href="" alt="" onClick="alert('Egg n°6 find!');" />
              <area shape="circle" coords="376,248,5" href="" alt="" onClick="alert('Egg n°7 find!');" />
              <area shape="circle" coords="481,252,10" href="" alt="" onClick="alert('Egg n°8 find!');" />
              <area shape="circle" coords="26,262,3" href="" alt="" onClick="alert('Egg n°9 find!');" />
              <area shape="circle" coords="100,242,10" href="" alt="" onClick="alert('Egg n°10 find!');" />
              <area shape="circle" coords="536,316,3" href="" alt="" onClick="alert('Egg n°11 find!');" />
              <area shape="circle" coords="551,308,3" href="" alt="" onClick="alert('Egg n°12 find!');" />
              <area shape="circle" coords="573,252,10" href="" alt="" onClick="alert('Egg n°13 find!');" />
            </map>
      </header>
      
      <footer className="App-footer">
            <p>Copyright &copy; The Easter Egg Hunt NFT Project, 2021 - All rights reserved | Directed by Fr&eacute;d&eacute;ric, S&eacute;bastien, Micka&euml;l &amp; Marjorie</p>
            <p><a><img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub" title="GitHub" class="logo_footer"/></a></p>
            <p><a href="https://github.com/FredLC29/Visual_NFT_front/" target="_blank" rel="noreferrer" /></p>
              
        </footer>
    </div>
  );
}

export default App;
