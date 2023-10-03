const { Champ } = require ('../db');

//TRAE TODO LOS CAMPEONES:
async function getChamps (req, res) {
    try {
        const allChamps = await Champ.findAll();
        res.status(200).json(allChamps);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

};


async function getDetail(req, res) {
    const { id } = req.params;
  
    try {
      const champDetail = await Champ.findByPk(id);
  
      if (champDetail) {
        res.status(200).json(champDetail);
      } else {
        res.status(404).json({ msg: 'Champion not found' });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  }


module.exports = {
    getChamps,
    getDetail,
};