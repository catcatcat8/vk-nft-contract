import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre
  const { deploy } = deployments
  const { owner } = await getNamedAccounts()

  await deploy('NFT', {
    from: owner,
    args: [10],
    log: true,
  })
}
export default func

func.tags = ['NFT']