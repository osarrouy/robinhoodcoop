# @robinhoodcoop/subgraph

The subgraph that indexes the `RobinHoodCoop` DAO and its `ERC20`.

## Development

##### » install and start a [TheGraph](https://thegraph.com/docs/quick-start#local-development) dev environment

##### » install and start [ganache](https://www.trufflesuite.com/docs/ganache/overview)

##### » install and link dependencies

```sh
lerna bootstrap
```

##### » compile contracts

```sh
npm run contracts:compile
```

##### » extract ABIs

```sh
npm run abis:extract
```

##### » deploy contracts and mock data

```sh
npm run mock:deploy
```

##### » build the subgraph

```sh
npm run graph:build
```

##### » create a local subgraph

```sh
npm run graph:create:local
```

##### » deploy a local subgraph

```sh
npm run graph:deploy:local
```

##### » head to [http://localhost:8000/subgraphs/name/osarrouy/robinhoodcoop/](http://localhost:8000/subgraphs/name/osarrouy/robinhoodcoop/)
