const { API_KEY } = process.env;
const axios = require("axios");
const { Dogs, Temperaments } = require("../db");

const getApiInfo = async () => {
  // me traigo de la Api externa solo lo que necesito
  const apiUrl = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
  );
  const apiInfo = await apiUrl.data.map((element) => ({
    id: element.id,
    name: element.name,
    weightMin: Number.isNaN(parseInt(element.weight.metric.split(" - ")[0]))
      ? 20
      : parseInt(element.weight.metric.split(" - ")[0]),
    weightMax: Number.isNaN(parseInt(element.weight.metric.split(" - ")[1]))
      ? 50
      : parseInt(element.weight.metric.split(" - ")[1]),
    heightMin: Number.isNaN(parseInt(element.height.metric.split(" - ")[0]))
      ? 1
      : parseInt(element.height.metric.split(" - ")[0]),
    heightMax: Number.isNaN(parseInt(element.height.metric.split(" - ")[1]))
      ? 10
      : parseInt(element.height.metric.split(" - ")[1]),
    life_span: element.life_span,
    origin: element.origin,
    image: element.image.url,
    temperaments:
      typeof element.temperament === "string"
        ? element.temperament.split(",")
        : Temperaments,
  }));
  return apiInfo;
};

const getDbInfo = async () => {
  // me traigo de la base de datos lo que necesito (si existe)
  const dbData = await Dogs.findAll({
    include: {
      model: Temperaments,
      attributes: ["name"],
      through: {
        attribute: [],
      },
    },
  });

  const dbInfo = await dbData.map((element) => ({
    id: element.id,
    name: element.name,
    weightMin: element.weightMin,
    weightMax: element.weightMax,
    heightMin: element.heightMin,
    heightMax: element.heightMax,
    life_span: element.life_span,
    origin: element.origin,
    image: element.image.url,
    temperaments: element.Temperaments?.map((t) => t.name),
    createdInDb: element.createdInDb,
  }));

  return dbInfo;
};
const getAllDogs = async () => {
  const apiInfo = await getApiInfo(); // concateno la info que me viene de la api y de la DB en una sola variable
  const DbInfo = await getDbInfo();
  const infoTotal = apiInfo.concat(DbInfo);
  return infoTotal;
};

module.exports = { getAllDogs, getDbInfo, getApiInfo };
