//Database config
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const credentials = require('../city-api-key.json');
initializeApp({
    credential: cert(credentials)
});
const db = getFirestore();


//CityData controllers
const cityData = require('../citiesList');
const collectionName = "cities-known";



//Add a Single city entry to database
const addCity = async (req, res, next) => {
    
    try {
        const data = req.body;
        const city = await db.collection(collectionName).doc().set(data);
        res.status(200).send(city);
    } catch(err){
        res.status(400).send(err.message);
    }
    
}



//Add multiple city entries to database
const uploadCitites = async(req, res, next) =>{
    try {
        const data = cityData.cityList;

        data.forEach( async (i) =>  {
            const city = await db.collection(collectionName).doc().set(i);
        })
        
        res.status(200).json({
            success: true,
            data
        });
    } catch(err){
        res.status(400).send(err.message);
    }
}


//Get City details by id
const getCity = async (req, res, next) => {
    try{
        const cityRef = db.collection(collectionName).doc(req.params.id);
        const doc = await cityRef.get();
        if (!doc.exists) {
            res.status(401).send("City not found");
        } 
        else {
            res.status(200).json({
                success : true,
                data: doc.data()
            });
        }
    } catch(err){
        res.status(401).send(err.message);
    }
}



//Get all cities list
const getAllCities = async (req, res, next) => {

    function titleCase(str) {
        return str.toLowerCase().split(' ').map(function (word) {
          return (word.charAt(0).toUpperCase() + word.slice(1));
        }).join(' ');
    }

    try{
        const citiesRef = db.collection(collectionName);
        const snapshot = (req.query.keyword === undefined) ? await citiesRef.get() : await citiesRef.where('name', '==', titleCase(req.query.keyword)).get();

        const cityList = [];
        snapshot.forEach(doc => {
            cityList.push({_id: doc.id, ...doc.data()});
        });

        res.status(200).json({
            success : true,
            cityList
        });
    } catch(err){
        res.status(401).send(err.message);
    }
}



module.exports = {
    addCity,
    getCity,
    getAllCities,
    uploadCitites
}