const assert = require("assert");
const ServicesFactory = require("../servicesFactory");
const pg = require("pg");
const Pool = pg.Pool;
const connectionString = process.env.DATABASE_URL || 'postgresql://codex-coder:pg123@localhost:5432/fruitdb_test';
const pool = new Pool({
    connectionString,
});


describe("The fruits basket test's", async () => {
    var counter = 1;
    beforeEach(async () => {
        console.log(`=========>Test # ${counter++} <=========`)
        await pool.query(`delete from fruit_basket`)

    })


    it("This function should be able to insert a pear into  6 times and return the of 6 pears in the basket", async () => {
        let serve = ServicesFactory(pool)

        await serve.addFruit('pear',  3.00 );
        await serve.addFruit('pear',  3.00 );
        await serve.addFruit('pear',  3.00);
        await serve.addFruit('pear',  3.00);
        await serve.addFruit('pear',  3.00);
        await serve.addFruit('pear',  3.00);

        let actual = await serve.getAllfruits();
        
        actual = actual['0'].fruit_qty
        let expected = "6";

        assert.equal(expected, actual)
    });

    it("The getSpecificFruit should return all the fruits in the basket for a given fruit type.",async () => {
        let serve = ServicesFactory(pool);

        await serve.addFruit('apple',2.00);
        await serve.addFruit('orange',2.00);
        await serve.addFruit('orange',2.00);
        await serve.addFruit('orange',2.00);
        await serve.addFruit('grape',3.00);

        let actual = await serve.getSpecificFruit('orange');
        let expected = [{fruit_name: 'orange',fruit_price: 2,fruit_qty: 3}]        
        assert.deepEqual(expected, actual);

    });

    it("We should be able total cost  of a specific fruit type in the basket", async() => {
        let serve = ServicesFactory(pool);


        await serve.addFruit('orange','2.00');
        await serve.addFruit('grape','3.00');
        await serve.addFruit('grape','3.00');

        

        let actual = await serve.getSpecificFruitAmount('grape');
        let expected=6

        assert.equal(expected, actual);

    });

    it("We should be able to get the price of all the the fruits in the basket which is equal 10",async () => {
        let serve = ServicesFactory(pool)

        await serve.addFruit('orange','2.00');
        await serve.addFruit('orange','2.00');
        await serve.addFruit('grape','3.00');
        await serve.addFruit('grape','3.00');

        let actual = await serve.getTotalSumOfAllFruits()
        let expected = 10
        assert.equal(expected, actual)

    });

    after(function () {
        pool.end();
    });



})