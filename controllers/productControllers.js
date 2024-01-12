import client from "../db.js";


export const getProducts = async (req, res) => {
    console.log(`inside the getAllProducts`)
    try {

        let query;
        query = 'SELECT * FROM products';

        const result = await client.query(query);

        if (result.rows.length < 0) {
            console.log(result);
            return res.status(400).json({
                success: false,
                message: 'No Products has been found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'All products datas',
            data: result.rows
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

//Inserting the data to the database
export const addProduct = async (req, res) => {

    try {

        const { name, price, quantity } = req.body;
        console.log( name, price, quantity)

        if ( !name || !price || !quantity) {
            return res.status(400).json({
                success: false,
                message: 'One or more fields are required'
            });
        }

        function generateId(){
            let arr = [];
            for(let i= 1;i<=15;i++){
                let randNum = Math.floor(Math.random() * 9 + 1);
                arr.push(randNum);
            }
            let firstdigit = Math.floor(Math.random() * 9);
            arr.unshift(firstdigit);
            let genId = arr.join('');
            return genId;
        }


        let strId = generateId();
        let id = "PRO"+strId;

        let query;
        query = `INSERT INTO products VALUES('${id}','${name}',${price},${quantity})`;
        console.log(query)

        const result = await client.query(query);


        if (!result.rowCount === 1) {
            return res.status(400).json({
                success: false,
                message: 'Data has not been inserted'
            })
        }

        return res.status(201).json({
            success: true,
            message: 'Product is created successfully',
            data: result.rowCount
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


//Deleting the product
export const deleteProduct = async (req, res) => {

    try {


        const { id } = req.params;
        console.log(id);

        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Id of Product is required'
            });
        }

        let query;
        query = `SELECT * FROM products WHERE id = '${id}'`;
        let checkData = await client.query(query);

        if (checkData.rowCount !== 1) {
            return res.status(404).json({
                success: false,
                message: 'Data not found with this id'
            });
        }


        let query1;
        query1 = `DELETE FROM products WHERE id = '${id}'`;
        console.log(query);

        const result = await client.query(query1);

        if (!result.rowCount === 1) {
            return res.status(400).json({
                success: false,
                message: 'Record has not been deleted'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Record has been deleted successfully',
            data: result
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


//Update product
export const updateProduct = async( req, res) => {

    try {

        const { id } = req.params;
        const { quantity } =req.body;

        if(!id || !quantity){
            return res.status(400).json({
                success:false,
                message:'Id and quantity are requireds'
            });
        }

        let query;
        query = `SELECT * FROM products WHERE  id = '${id}'`;

        const result = await client.query(query);

        if(result.rowCount !== 1){
            return res.status(404).json({
                success:false,
                message:'Product does not exist with this Id'
            });
        }

        let query1;
        query1 = `UPDATE products SET quantity = '${quantity}' WHERE id = '${id}'`;
        
        const result1 = await client.query(query1);

        if(result1.rowCount !== 1){
            return res.status(400).json({
                success:false,
                message:'Product has not been updated'
            });
        }
        
        return res.status(201).json({
            success:true,
            message:'Record updated successfylly',
            data:result1.rowCount
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}


























































































































































