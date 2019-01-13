import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '.././node_modules/bulma-start/css/main.css'
import './App.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

var waitForGlobal = async () =>{
    // 1. check variable, 检查tronweb是否已经加载
    if (window.tronWeb) {
        let tronWeb = window.tronWeb;
        // 2. check node connection，检查所需要的API是否都可以连通
        const nodes = await tronWeb.isConnected();
        const connected = !Object.entries(nodes).map(([name, connected]) => {
            if (!connected) {
                console.error(`Error: ${name} is not connected`);
            }
            return connected;
        }).includes(false);
        if (connected){
            // 3. 如果一切正常，启动react应用。
            ReactDOM.render(<App />, document.getElementById('root'));
        } else {
            console.error(`Error: TRON node is not connected`);
            console.error('wait for tronLink');
            setTimeout(async () => {
                await waitForGlobal();
            }, 100);
        }

    } else {
        // 如果检测到没有注入tronWeb对象，则等待100ms后重新检测
        console.error('wait for tronLink');
        setTimeout(async () => {
            await waitForGlobal();
        }, 100);
    }
};

waitForGlobal().then();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
