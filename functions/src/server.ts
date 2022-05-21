import app from './app'

const port = 8080
const host = '0.0.0.0'

app.listen(port, host, () => {
    console.log(`App is running on http://loalhost/${port}/`)
})