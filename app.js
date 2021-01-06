var fs = require('fs');
var csv = require('fast-csv');
const pool = require('./database');

var query='CREATE TABLE orders(region VARCHAR(255),country VARCHAR(255),item VARCHAR(255),sales_channel VARCHAR(255),order_priority VARCHAR(1),order_date DATE,order_id INT,ship_date DATE,units_sold INT,unit_price DOUBLE PRECISION,unit_cost DOUBLE PRECISION,total_revenue DOUBLE PRECISION,total_cost DOUBLE PRECISION,total_profit DOUBLE PRECISION';

pool.connect(function(err){
    if(err)
    {
        console.log(err);
    }
    pool.query(query,(err,res)=>{
        if(err) throw err;
        console.log("Table Created Successfully");
    });
});

let csvStream = csv.fromPath("csv_file_path", { headers: true })
    .on("data", function(record){
        csvStream.pause();

        if(counter < 1000000)
        {
            let region = record.Region;
            let country = record.Country;
            let sales = record["Item Type"];
            let sales_channel = record["Sales Channel"];
            let order_priority = record["Order Priority"];
            let order_date = record["Order Date"];
            let order_id = record["Order ID"];
            let ship_date = record["Ship Date"];
            let units_sold = record["Units Sold"];
            let unit_price = record["Unit Price"];
            let unit_cost = record["Unit Cost"];
            let total_revenue = record["Total Revenue"];
            let total_cost = record["Total Cost"];
            let total_profit = record["Total Profit"];

            pool.query("INSERT INTO orders(region,country,sales,sales_channel,order_priority,order_date,order_id,ship_date,units_sold,unit_price,unit_cost,total_revenue,total_cost,total_profit) \
             VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)", [region,country,sales,sales_channel,order_priority,order_date,order_id,ship_date,units_sold,unit_price,unit_cost,total_revenue,total_cost,total_profit], function(err){
                if(err)
                {
                    console.log(err);
                }
            });
            ++counter;
        }

        csvStream.resume();

    }).on("end", function(){
        console.log("Finished!");
    }).on("error", function(err){
        console.log(err);
    });
