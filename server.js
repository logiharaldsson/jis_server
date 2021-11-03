import express from 'express';
import * as fs from 'fs';
import cors from 'cors';
import knex from 'knex';



const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'logiharaldsson',
    password : '',
    database : 'jis'
  }
});


const app = express();

app.use(express.json());
app.use(cors());

const database = {
    users: [
        {
            id: 1,
            name: 'B3-6#1',
            sex: 'Strákar',
            age: '3-6',
            boxnumber: 1,
            count: 5

        },
        {
            id: 2,
            name: 'G7-10#2',
            sex: 'Stelpur',
            age: '7-10',
            boxnumber: 2,
            count: 10

        }
    ]
}

app.get('/:id', (req, res) => {
    // const {id} = req.params['id'];
    const id = parseInt(req.params['id'].replace(':', ''));
    console.log('id: ',id)
    let myVar = '';
    if (id === 0) {
        myVar = 'G0-2#1';
    } else if (id === 1) {
        myVar = 'B0-2#1';
    } else if (id === 2) {
        myVar = 'G3-6#1';
    } else if (id === 3) {
        myVar = 'B3-6#1';
    } else if (id === 4) {
        myVar = 'G7-10#1';
    } else if (id === 5) {
        myVar = 'B7-10#1';
    } else if (id === 6) {
        myVar = 'G11-14#1';
    } else if (id === 7) {
        myVar = 'B11-14#1';
    } else if (id === 8) {
        myVar = 'G15+#1';
    } else if (id === 9) {
        myVar = 'B15+#1';
    } else {
        console.log(id)
    }

    db.select('*').from('boxes').where('id', '=', myVar)
    .then(user => {res.json(user[0])});
});

app.get('/mybox', (req, res) => {

    db.select('*').from('boxes').where({id: 'G0-2#2'})
    .then(user => {res.json(user[0])});
});

app.get('/allBoxes', (req, res) => {

    db.select('*').from('boxes')
    .then(user => {res.json(user[0])});
});



app.get('/category/1', (req, res) => {
    // const {id} = req.params['id'];
    // const id = parseInt(req.params['id'].replace(':', ''));
    // console.log('id: ',id)
    console.log('category 1');
    const id = 1;
    let myVar = '';
    if (id === 0) {
        myVar = 'G0-2#1';
    } else if (id === 1) {
        myVar = 'B0-2#1';
    } else if (id === 2) {
        myVar = 'G3-6#1';
    } else if (id === 3) {
        myVar = 'B3-6#1';
    } else if (id === 4) {
        myVar = 'G7-10#1';
    } else if (id === 5) {
        myVar = 'B7-10#1';
    } else if (id === 6) {
        myVar = 'G11-14#1';
    } else if (id === 7) {
        myVar = 'B11-14#1';
    } else if (id === 8) {
        myVar = 'G15+#1';
    } else if (id === 9) {
        myVar = 'B15+#1';
    } else {
        console.log(id)
    }

    // db.count('id').from('boxes').where({age: '0-2', sex: 'Strákar'})
    // .then(user => {res.json(user[0])});
    // db.select('*').from('boxes').where({age: '0-2', sex: 'Strákar', boxnumber: 1})
    // .then(user => {res.json(user[0])});
    db.select().table('boxes').orderBy(['stateid', 'id'])
    .then(user => {res.json(user)});
});

// app.get('/1', (req, res) => {
//     res.send(database.users[1]);
// });


// app.post('/signin', (req, res) => {
//     if (req.body.email === database.users[0].email &&
//         req.body.password === database.users[0].password) {
//         res.json(database.users[0]);
//     } else {
//         res.status(400).json('error logging in');
//     }
// });

// app.get('/profile/:id', (req, res) => {
//     const { id } = req.params;
//     let found = false;
//     database.users.forEach(user => {
//         if (user.id === id){
//             found = true
//             return res.json(user);
//         }
//     })
//     if (!found) {
//         res.status(404).json('no such user');
//     }
// })

app.put('/plus', (req, res) => {
    const { id, tally } = req.body;
    console.log('tally',id, tally)
    db('boxes').where('id', '=', id)
        .increment('count', tally)
        .returning('count')
        .then(count => {res.json(count[0])})
        .catch(err => {res.status(400).json('cannot access db')})
})

app.put('/plustest', (req, res) => {
    const { id, tally } = req.body;
    console.log('plusTest: ',id, tally)
    db('boxes').where('id', '=', id)
        .increment('count', tally)
        .returning('count')
        .then(count => {res.json(count[0])})
        .catch(err => {res.status(400).json('cannot access db')})
})

app.post('/addNewBox', (req, res) => {
    const { sex, age, id, boxnumber, stateid } = req.body;
    db('boxes')
        .returning('*')
        .insert({
            id: id,
            sex: sex,
            age: age,
            boxnumber: boxnumber,
            count: 0,
            stateid: stateid
        })
        .then(response => {res.json(response[0])})
        .catch(err => res.status(400).json(err))
})

app.post('/register', (req, res) => {
    const { sex, age, id, boxnumber, count } = req.body;
    db('boxes')
        .returning('*')
        .insert({
            id: id,
            sex: sex,
            age: age,
            boxnumber: boxnumber,
            count: count
        })
        .then(response => {res.json(response[0])})
        .catch(err => res.status(400).json('err'))
})

app.listen(3001, () => {
    console.log('app is running')
});

/*
/signin

/box -> GET -> show box
/box -> PUT -> tally increase

*/
