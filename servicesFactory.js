


module.exports = function ServicesFactory(pool) {

    let addFruit = async (f_name, f_price) => {
        try {

            await pool.query(
                `INSERT INTO fruit_basket(fruit_name,fruit_qty,fruit_price)
                VALUES('${f_name}',1,${f_price})
                ON CONFLICT (fruit_name) 
                DO UPDATE  SET fruit_qty=fruit_basket.fruit_qty+1`)
        } catch (error) {
            console.log(`**** addFruit ****${error}`);
        }
    }



    let getSpecificFruit = async (param) => {
        let results = await pool.query(`SELECT fruit_name,fruit_price,fruit_qty FROM fruit_basket WHERE fruit_name = '${param}'`);        
        return results.rows;
    }

    let getSpecificFruitAmount = async (param) => {
        let results = await pool.query(`SELECT fruit_price ,fruit_qty FROM fruit_basket WHERE fruit_name = '${param}'`);
        results = results.rows.reduce((acc, curr) => {
            return acc + curr.fruit_price * curr.fruit_qty
        }, 0);
        return results
    }


    let getAllfruits = async () => {
        let results = await pool.query(`SELECT * FROM fruit_basket`);
        return results.rows
    }

    let getTotalSumOfAllFruits = async () => {
        let results = await pool.query(`SELECT fruit_price ,fruit_qty FROM fruit_basket`);        
        results = results.rows.reduce((acc,curr)=>{return acc + curr.fruit_price * curr.fruit_qty },0);
        return results
    }
    

    return {
        addFruit,
        getAllfruits,
        getSpecificFruit,
        getTotalSumOfAllFruits,
        getSpecificFruitAmount


    }
}