const { io } = require("socket.io-client");
const mongoose = require("mongoose");
const Blockchain = require("./utils/Blockchain");
// DB
const url = require("./configs/db.config").localUrl;
mongoose.Promise = global.Promise;
const db = mongoose.createConnection(url + process.argv[2]);
// Instance
const client = io("http://localhost:8502");
const blockchain = new Blockchain();

const BlockChainModel = db.model(
    "BlockChain",
    new mongoose.Schema({
        index: { type: String, required: true, unique: true },
        timestamp: { type: String, required: true },
        data: {},
        prevHash: { type: String, required: true },
        hash: { type: String, required: true },
    }),
    "BlockChain"
);

(() => {
    BlockChainModel.find({}).then(
        async (result) => {
            await result.forEach((value, index) => {
                blockchain.newBlock(value.timestamp, value.data);
            });
            console.log("Blockchain Created: ", blockchain.chain.length);
        },
        (err) => {
            console.log("Error Creating the block chain");
        }
    );
})();

client.on("connect", () => {
    console.log("Connected:", client.connected);
});
client.on("checkHash", (data) => {
    if (blockchain.lastBlock.hash === data.hash)
        console.log("[+] Hash Verified");
    else {
        console.log("[!] Blockchain compromised");
        client.close();
    }
});
client.on("vote", (data) => {
    var resp = blockchain.newBlock(data.date, {
        voterId: data.voterId,
        aadharId: data.aadharId,
        panId: data.panId,
        vote: data.vote,
    });
    if (resp == true) {
        let lb = blockchain.lastBlock;
        const query = new BlockChainModel({
            index: lb.index,
            timestamp: lb.timestamp,
            data: lb.data,
            prevHash: lb.prevHash,
            hash: lb.hash,
        });
        query.save().then(
            (result) => {
                console.log(
                    "[+] Vote Registered. BlockId: ",
                    result._id.toString()
                );
            },
            (err) => {
                console.log("Unable to cast Vote:", err);
            }
        );
    }
});
