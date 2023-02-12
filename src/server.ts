import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import userRoutes from './handlers/userhandler'
import productRoutes from './handlers/producthandler'
import orderRoutes from './handlers/orderhandler'


const app: express.Application = express()
const address = "0.0.0.0:3000"

app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

userRoutes(app)
productRoutes(app)  
orderRoutes(app)


app.listen(3000, function () {
    console.log(`start server on: ${address}`)
})

export default app;
