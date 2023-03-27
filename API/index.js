const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 3000


const app = express();
app.use(cors({ origin: true }));

 
var serviceAccount = require("./permissions.json");
const { async } = require('@firebase/util');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()


// read particular item in a collection
// params -> collection name & item id
app.get('/read/:collection_name/:item_id', (req,res) => {
    (async () => {
        try {
            const document = db.collection(req.params.collection_name).doc(req.params.item_id);
            let item = await document.get();
            let response = item.data();
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

// read all items in a collection
// params -> collection_name
app.get('/read/:collection_name/', (req,res) => {
    (async () => {
        try {
            let query = db.collection(req.params.collection_name);
            let response = [];
            await query.get().then(querySnapshot => {
                let docs = querySnapshot.docs;
                for (let doc of docs) {
                    const selectedItem = {
                        id: doc.id,
                        item: doc.data()
                    };
                    response.push(selectedItem);
                }
            });
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});


app.listen(port, () => {console.log("listening on port" + port) })