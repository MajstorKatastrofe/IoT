// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set, remove } from "firebase/database";
import express from "express"
import path from "path";
import { fileURLToPath } from 'url';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeKJ7QRRdKH1cuq6XuPKN9B5lKr7ZDay8",
  authDomain: "internetstvari-46645.firebaseapp.com",
  databaseURL: "https://internetstvari-46645-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "internetstvari-46645",
  storageBucket: "internetstvari-46645.appspot.com",
  messagingSenderId: "200822379008",
  appId: "1:200822379008:web:4d751c5e9aa05baa2ffee5",
  measurementId: "G-11HXJ0108E"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

const app = express();
app.use(express.json())

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'static')));

app.post('/loginuser', async (req, res) => {
  try {
    const { email, password } = req.body;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const uid = user["uid"]
        res.json(uid);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error: "Greska", data: error });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
})

app.post('/signupuser', async (req, res) => {
  try {
    const { email, password } = req.body;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const uid = user["uid"]
        res.json(uid);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error: "Greska", data: error });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
})

app.get('/currentuser', async (req, res) => {
  try {
    const user = auth.currentUser;
    const uid = user.uid
    if (user) {
      res.json(uid)
    } else {
      res.status(500).json({ error: "Greska", data: "User nije ulogovan" })
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
})

app.get('/data', async (req, res) => {

  try {
    // Get a reference to the database service
    const db = getDatabase(firebaseApp);

    // Reference to your Firebase Realtime Database
    const dbRef = ref(db);

    // Read the data at the reference
    const snapshot = await get(dbRef);

    // Extract the data from the snapshot
    const data = snapshot.val();

    // Send the data as JSON response
    res.send(data);
  } catch (error) {
    console.error("Error reading data:", error);
    res.status(500).send("Error reading data from Firebase");
  }
});

app.post('/novi-uredjaj', async (req, res) => {
  try {
    const db = getDatabase(firebaseApp);
    const { uid, name, lat, lng, pocLat, pocLng, radius } = req.body;
    set(ref(db, uid + '/' + name), {
      lat: lat,
      lng: lng,
      pocLat: pocLat,
      pocLng: pocLng,
      radius: radius
    });
    return res.json({ message: 'Form data received successfully', data: req.body });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
})

app.delete('/obrisi-uredjaj/:id', async(req,res)=>{
  try {
    const db = getDatabase(firebaseApp);
    const name = req.params.id;
    const user = auth.currentUser;
    const uid = user.uid
    remove(ref(db, uid + '/' + name)) 
    return res.json({ message: 'Deleted device successfully', data: req.body });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska", data: err });
  }
})



app.listen(80, () => {
  console.log("Listening on port 80")
});
