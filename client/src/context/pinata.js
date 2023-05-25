import axios from "axios"
const FormData = require('form-data');
const key = "58061b8549895c3b658c";
const secret = "15af6b357029b73040754c37ef0c8d1792ac7ca0f699054c666f9bfc9f60d3f3";

export const uploadFileToIPFS = async(file, fileName) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    //making axios POST request to Pinata ⬇️
    let data = new FormData();
    data.append('file', file);

    const metadata = JSON.stringify({
        name: fileName,
        keyvalues: {
            exampleKey: fileName
        }
    });
    data.append('pinataMetadata', metadata);

    return axios.post(url, data, {
            maxBodyLength: 'Infinity',
            headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                pinata_api_key: key,
                pinata_secret_api_key: secret,
            }
        })
        .then(function (response) {
            console.log("Hello Agilan")
            return {
               success: true,
               pinataURL: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
           };
        })
        .catch(function (error) {
            console.log(error)
            return {
                success: false,
                message: error.message,
            }

    });
};