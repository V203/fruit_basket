create table fruit_basket_test(
    id serial primary key not null ,
    fruit_name text not null,
    fruit_qty int not null,
    fruit_price decimal (10, 2),
    UNIQUE(fruit_name)
);


