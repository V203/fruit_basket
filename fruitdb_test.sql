DROP TABLE IF EXISTS fruit_basket;
CREATE TABLE fruit_basket(
    id SERIAL PRIMARY KEY NOT NULL ,
    fruit_name TEXT NOT NULL,
    fruit_qty INT NOT NULL,
    fruit_price NUMERIC (4,2),    
    UNIQUE(fruit_name)
);


