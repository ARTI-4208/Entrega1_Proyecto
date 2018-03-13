'use strict';

const doc = require('dynamodb-doc');
const dynamodb = new doc.DynamoDB();

exports.handler = (input, context, callback) => {
  console.log('Received input:', JSON.stringify(input, null, 2));
  if (input.fail_publish_product) {
    callback("Internal Server Error");
  } else {
    var d = new Date();
    var n = d.getMilliseconds();  
  
    console.log("ID " + n);
    console.log("input " + input);
    console.log("idproduct " + input.CreateBasicProductResult.idproduct);
    console.log("idcustomer " + input.idcustomer);

    let req = {
        TableName: "Product",
        Key:{
            "ID": input.CreateBasicProductResult.idproduct
        },
        UpdateExpression: "set statep = :s",
        ExpressionAttributeValues:{
            ":s":'PUBLISHED'
        },
        ReturnValues:"UPDATED_NEW"
    }

    dynamodb.updateItem(req, function(err, data) {
      if (err) console.log(err);
      else console.log(data);
    });
            
    var parameters = { 
        "idproduct": input.CreateBasicProductResult.idproduct
    }
    
    console.log("callback parameters = ["+JSON.stringify(parameters,null,2)+"]");

    callback(null, parameters);
    
  }
};