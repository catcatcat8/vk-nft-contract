import { HardhatUserConfig, task } from 'hardhat/config'
import '@nomiclabs/hardhat-etherscan'
import '@nomiclabs/hardhat-waffle'
import '@typechain/hardhat'
import 'hardhat-gas-reporter'
import 'solidity-coverage'
import 'hardhat-contract-sizer'
import 'hardhat-deploy'

import './tools/hardhat/init'
import { genNetworks, genCompilers, node } from './tools/hardhat'
import { HARDHAT_ACCS_PR_KEYS } from './secrets.config'

const ACC_PUBKEY: string = '0x666e416d73609f61C60d8A844066A0d956805118'

export const HARDHAT_ACCS_PUB_KEYS: string[] = [
  '0xF22a4BF45BBfde23c9EBf64357DFDe96A5aEFad4',
  '0x9988546291D3319DCB18E8469BDAaE81e7183140',
  '0x862C8BfDC733f01bF4D81B410709F590840B5190',
  '0x8a74d952b97B366821f68860b3C033c7F4b85F31',
  '0x23E4C6b9669D49C082662db7863FdB68cbC379BB',
]
const DEFAULT_BALANCE = '10000000000000000000000000000'

task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners()
  for (const account of accounts) {
    console.log(account.address)
  }
})

export const config: HardhatUserConfig = {
  solidity: {
    compilers: genCompilers(['0.8.12']), // separated by comma
  },
  typechain: {
    outDir: 'typechain',
  },
  namedAccounts: {
    owner: {
      default: HARDHAT_ACCS_PUB_KEYS[0],
      polygon_mainnet: ACC_PUBKEY,
      tenderly: HARDHAT_ACCS_PUB_KEYS[0]
    },
  },
  networks: {
    hardhat: {
      tags: ['fork'],
      chainId: 56,
      forking: {
        url: '',
        // blockNumber:
        enabled: false
      },
      accounts: [
        // HARDHAT_1
        {
          privateKey: HARDHAT_ACCS_PR_KEYS[0],
          balance: DEFAULT_BALANCE,
        },
        // HARDHAT_2
        {
          privateKey: HARDHAT_ACCS_PR_KEYS[1],
          balance: DEFAULT_BALANCE,
        },
        // HARDHAT_3
        {
          privateKey: HARDHAT_ACCS_PR_KEYS[2],
          balance: DEFAULT_BALANCE,
        },
        // HARDHAT_4
        {
          privateKey: HARDHAT_ACCS_PR_KEYS[3],
          balance: DEFAULT_BALANCE,
        },
        // HARDHAT_5
        {
          privateKey: HARDHAT_ACCS_PR_KEYS[4],
          balance: DEFAULT_BALANCE,
        },
      ],
    },
    ...genNetworks(),
  },
  gasReporter: {
    enabled: true,
    currency: 'USD',
  },
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: true,
  },
}

export default config
