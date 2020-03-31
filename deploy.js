const AWS = require("aws-sdk");
const fs = require("fs");
const path = require("path");

const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

const argv = require("yargs").argv;

const BUCKET_NAME =
  argv.env === "prod" ? "fakenews.sharechat.com" : "fakenews.sckops.com";

const PROJECT_FOLDER = "dist/";

let params = {
  Bucket: BUCKET_NAME
};
s3.listObjects(params, function(err, data) {
  if (err) console.log(err, err.stack);
  else {
    let keys = data.Contents.map(el => ({
      Key: el.Key
    }));
    params = {
      Bucket: BUCKET_NAME,
      Delete: {
        Objects: keys,
        Quiet: false
      }
    };
    s3.deleteObjects(params, function(err, data) {
      if (err) console.log(err, err.stack);
      // an error occurred
      else {
        console.log(data); // successful response
      }

      uploadNewFiles();
    });
  }
});

function uploadNewFiles() {
  walkSync(PROJECT_FOLDER, function(file) {
    let fileStream = fs.createReadStream(file);
    fileStream.on("error", function(err) {
      console.log("File Error", err);
    });

    let uploadParams = {
      Bucket: BUCKET_NAME,
      Key: "",
      Body: "",
      ACL: "public-read"
    };
    uploadParams.Body = fileStream;
    uploadParams.Key = file.split(PROJECT_FOLDER)[1];
    if (file.indexOf(".html") !== -1) {
      uploadParams.ContentType = "text/html";
    } else if (file.indexOf(".js") !== -1) {
      uploadParams.ContentType = "text/javascript";
    } else if (file.indexOf(".css") !== -1) {
      uploadParams.ContentType = "text/css";
    } else if (file.indexOf(".png") !== -1) {
      uploadParams.ContentType = "image/png";
    } else if (file.indexOf(".jpg") !== -1) {
      uploadParams.ContentType = "image/jpeg";
    }

    s3.upload(uploadParams, function(err, data) {
      if (err) {
        console.log("Error", err);
      }
      if (data) {
        console.log("Upload Success", data.Location);
      }
    });
  });
}

function walkSync(currentDirPath, callback) {
  fs.readdirSync(currentDirPath).forEach(function(name) {
    let filePath = path.join(currentDirPath, name);
    let stat = fs.statSync(filePath);
    if (stat.isFile()) {
      callback(filePath);
    } else if (stat.isDirectory()) {
      walkSync(filePath, callback);
    }
  });
}
