
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
        return (await pool.query(`SELECT fruit_qty FROM fruit_basket WHERE fruit_name = '${param}'`)).rows[0]['fruit_qty'];        
        
    }

    let getSpecificFruitAmount = async (param) => {
        return (await pool.query(`SELECT SUM(fruit_price * fruit_qty) FROM fruit_basket WHERE fruit_name = '${param}'`)).rows[0]['sum'];     
    }

    let getAllfruits = async () => {
        return (await pool.query(`SELECT * FROM fruit_basket`)).rows[0]["fruit_qty"]
                    
    }

    let getTotalSumOfAllFruits = async () => {
        return (await pool.query(`SELECT sum(fruit_price * fruit_qty) FROM fruit_basket`)).rows[0]['sum']        
    }

    let getAllFruitNames = async()=>{
        return (await pool.query(`SELECT fruit_name from fruit_basket`)).rows.map((elem)=>{ return elem.fruit_name})
    }
    
    return {
        addFruit,
        getAllfruits,
        getSpecificFruit,
        getTotalSumOfAllFruits,
        getSpecificFruitAmount,
        getAllFruitNames
    }
}