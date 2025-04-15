import {Client} from 'pg'


const dbRes = new Client({
    host:'localhost',
    user:'postgres',
    port:5432,
    password:'parth098',
    database:'metalearn'
})

export default dbRes;

