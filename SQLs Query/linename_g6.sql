CREATE TABLE linename_g6 (
    id SERIAL PRIMARY KEY,
    line_name VARCHAR(50) NOT NULL
);

INSERT INTO
    linename_g6 (line_name)
VALUES
    ('G6-Main'),
    ('G6-Head'),
    ('G6-Sub,T/B'),
    ('G6-Block'),
    ('G6-Crank'),
    ('G6-Camshaft'),
    ('G6-Tool Set');