import app from './app.js';
import { sequelize } from './database/db.js';
import './models/User.js'

const PORT = process.env.PORT || 3000;

const main = async () => {
    try {
        await sequelize.sync()
        console.log('Connection has been established.')
        app.listen(PORT);
        console.log(`App listening on port ${PORT}`)
    } catch (error) {
        console.log('Unable to connect to the database')
    }
}

main();