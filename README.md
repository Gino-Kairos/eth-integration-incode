<div align="center">
  <a href="#">
    <img src="https://www.kairosds.com/assets/images/logo-k.svg" alt="Logo" width="180" height="80">
  </a>

  <h3 align="center">KairosDS - API WEB 3.0 Etherum Example</h3>
  <br/>
  <br/>
</div>

![api-web]
![truffle]
![ganache]

----

## 🥺 Getting Started

1. Please install all dependencies:

**NPM**

```sh
    npm install
```

**Yarn**

```sh
    yarn install
```

2. Please install ganache-cli (Blockchain sandbox):

**NPM**

```sh
    npm install ganache -g
```

**Yarn**

```sh
    yarn add ganache --global
```

3. Please install truffle suite (Smart contract compiler):
   **NPM**

```sh
    npm install truffle -g
```

**Yarn**

```sh
    yarn add truffle --global
```

## 🥶 Development

Before run blockchain sandbox in **htttp://localhost:8545** with _ganache_:
```sh
    ganache
```

More info: [Here](https://github.com/trufflesuite/ganache#documentation)
____
Or you can add custom Etherum domain in Local enviroment with name ***CHAIN_PROVIDER***.

----
### 🕺 Start dev

1. Launch please build smart contract:

```sh
    truffle compile
```

2. After migrate smart contract:

```sh
    truffle migrate
```
----
**Optional**

Run test after:
```sh
    truffle test
```
----
4. Launch server:

***Dev***

```sh
    npm run start:dev
```

***Production***
```sh
    npm run start:prod
```
----


## ⚙️ Configuration
____
### 💾 Enviroments
|Name|Description|Default value|Type|
|---|---|---|---|
|SENTRY_PROJECT|Url project from _sentry.io_ integration. <br/><br/> More info: [here](https://docs.sentry.io/platforms/node/)| Null | String |
|CHAIN_PROVIDER|Domain etherum blockchain| http://localhost:8545 | String < URL > |
|URI_DB| Domain for mongoDB | mongodb://localhost:27017/poc-eth | String < URI-Mongo > |

### ⌨️ Commands

|Command|Description|
|---|---|
|format:check| Check format with prettier |
|format:write| Autofix format all documents |
|lint:check| Check errors with eslint |
|lint:fix| Fix all errors with eslint |
|start:dev| Start developer server |
|start:prod| Start production server (Require all custom enviroments)|
----
Created by [Gino 🤓](https://soygino.com)

[api-web]:https://img.shields.io/badge/API-Web%203.0-green
[truffle]:https://img.shields.io/badge/build-Truffle-blue
[ganache]:https://img.shields.io/badge/Sandbox-ganache-yellow