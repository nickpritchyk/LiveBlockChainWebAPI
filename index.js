import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import { WebSocket } from 'ws'

const COIN_API_KEY = '00EAFF8E-292A-4EA1-A828-405B82D34BF1'
const app = express()
app.use(cors())

const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: '*',
    }
})

let coinApiSocket = null

app.get('/', (req, res) => {
    res.send('Hello World')
})

io.on('connection', (socket) => {
    socket.emit('Welcome to the Express Socket!')

    socket.on('startCryptoData', () => {
        if (!coinApiSocket) {
            coinApiSocket = new WebSocket(`wss://ws.coinapi.io/v1/${COIN_API_KEY}`)
            
            coinApiSocket.on('open', () => {
                console.log('Connected to CoinAPI WebSocket')

                coinApiSocket.send(JSON.stringify({
                    type: 'hello',
                    apikey: COIN_API_KEY,
                    subscribe_data_type: ['trade'],
                    subscribe_filter_symbol_id: ["BITSTAMP_SPOT_BTC_USD$", "BITFINEX_SPOT_BTC_LTC$"],
                }))  
            })

            coinApiSocket.on('message', (data) => {
                const jsonData = JSON.parse(data.toString())
                console.log('Received data from CoinAPI:', jsonData)
                io.emit('cryptoData', jsonData)
            })
        }
    })

    // Listen for the stopCryptoData event
    socket.on('stopCryptoData', () => {
        if (coinApiSocket) {
            // Close the CoinAPI WebSocket connection
            coinApiSocket.close()
            coinApiSocket = null
            console.log(' --- Coin API Socket Closed --- ')
        }
    })
})

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000')
})