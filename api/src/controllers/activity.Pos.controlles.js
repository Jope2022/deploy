const { Activity, Country } = require('../db');


async function createActivity (req, res) {
const { name, difficulty, duration, season, countryId } = req.body;
    try {
      if(!name || !difficulty || !duration || !season || !countryId ) throw new Error("Datos perdidos") 
        countryId.forEach(async (id) => {  
          const newActivity = await Activity.create({ 
            name,
            difficulty,
            duration,
            season, 
            countryId: id
         })
          const country =  await Country.findByPk(id)
             await country.addActivity(await newActivity)  
         });      

        res.status(200).json("Actividades creadas");

      } catch (error) {
            res.status(400).json({ message: error.message });
        }
      }

module.exports = {
    createActivity,
  };