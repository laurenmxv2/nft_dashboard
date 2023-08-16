import { useState, useEffect } from 'react'
import { Box, Button, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { SDK, Auth, TEMPLATES, Metadata } from '@infura/sdk'
import { useMetaMask } from '@contexts/MetaMaskContext'
import { displayAddress } from '@utils/displayAddress'
import Image from 'next/image'

// Create Auth object
const auth = new Auth({
  projectId: process.env.NEXT_PUBLIC_INFURA_API_KEY,
  secretId: process.env.NEXT_PUBLIC_INFURA_API_KEY_SECRET,
  privateKey: process.env.NEXT_PUBLIC_WALLET_PRIVATE_KEY,
  chainId: 5,
})
// Instantiate SDK

const sdk = new SDK(auth)
const getCollectionsByWallet = async (contractAddress) => {
  const nfts = await sdk.api.getNFTsForCollection({
    contractAddress,
  })
  return nfts
}
const Home = () => {
  const { address, connectMetaMask } = useMetaMask()
  const [nfts, setNfts] = useState()

  const handleConnectMetaMask = async () => {
    await connectMetaMask()
  }

  useEffect(() => {
    if (address) {
      getCollectionsByWallet('0x7bb1681bc435B2aFD5ebfA761E0220CA987B5134').then((res) => {
        setNfts(res)
        console.log('nfts: ', res)
      })
    }
  }, [address])

  return (
    <>
      <Typography variant="h2" sx={{ textAlign: 'center' }}>
        NFT Dashboard
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Button
          onClick={handleConnectMetaMask}
          variant="outlined"
          sx={{ textTransform: 'none', mb: 2 }}
        >
          {address ? displayAddress(address) : 'Connect MetaMask'}
        </Button>
      </Box>
      <Grid container direction="row" alignItems="center" justifyContent="center">
        {nfts &&
          nfts.assets.map((nft) => {
            return (
              nft.tokenId !== '0' && (
                <Grid
                  md={3}
                  key={nft.tokenId}
                  container
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                  mb={2}
                >
                  <Image alt="" src={nft.metadata.image} width={300} height={300} />
                </Grid>
              )
            )
          })}
      </Grid>
    </>
  )
}

export default Home
