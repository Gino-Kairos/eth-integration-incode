const files = require("../../models/file");
//Dependencies
const shortid = require("shortid");
const IPFS = require("ipfs-api");
const Joi = require("joi");

//Config provider infura
const ipfs = new IPFS({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

//Schemas
const schemaUploadFile = Joi.object({
  buffer: Joi.string().required(),
  name: Joi.string().required(),
  title: Joi.string().required(),
});

//Get - Method
async function uploadController(req, res, next) {
  try {
    //Validate schema
    const checkBody = await schemaUploadFile.validateAsync({ ...req.body });

    if (checkBody) {
      //body parser
      let { buffer, name, title } = checkBody;
      let id = shortid.generate() + shortid.generate();
      let ipfsHash = await ipfs.add(buffer || Buffer.alloc(8));
      let hash = ipfsHash[0].hash;

      //Add smart chain file
      req.lms
        .sendIPFS(id, hash, { from: req.accounts[0] })
        // eslint-disable-next-line no-unused-vars
        .then((_hash, _address) => {
          //create local save
          let createFile = new files({ id, hash, title, name });
          createFile.save();
          //success response
          res.json({ success: true, id });
        })
        .catch((_err) => next(_err));
    } else {
      next({ message: "wrong input", stack: "invalid data" });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { uploadController };
