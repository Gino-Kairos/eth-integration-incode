const files = require("../../models/file");
///
const shortid = require("shortid");
const IPFS = require("ipfs-api");
const ipfs = new IPFS({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

async function uploadController(req, res) {
  let buffer = req.body.buffer;
  let name = req.body.name;
  let title = req.body.title;
  let id = shortid.generate() + shortid.generate();
  if (buffer && title) {
    let ipfsHash = await ipfs.add(buffer || Buffer.alloc(8));
    let hash = ipfsHash[0].hash;

    req.lms
      .sendIPFS(id, hash, { from: req.accounts[0] })
      .then((_hash, _address) => {
        files.insertOne({ id, hash, title, name });
        res.json({ success: true, id });
      })
      .catch((err) => {
        res
          .status(500)
          .json({ success: false, message: "Upload error occured" });
      });
  } else {
    res.status(400).json({ success: false, message: "wrong input" });
  }
}

module.exports = { uploadController };
