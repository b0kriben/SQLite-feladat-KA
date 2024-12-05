import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./database.sqlite");

const initializeDB = async () => {
    await dbRun("DROP TABLE users")
    await dbRun("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT, lastName TEXT, email TEXT, class TEXT)");

    const users = [
         { firstName: "John", lastName: "Doe", email: "john.doe@example.com", class: "9.b" },
         { firstName: "Jane", lastName: "Smith", email: "jane.smith@example.com", class: "10.b" },
         { firstName: "Sam", lastName: "Johnson", email: "sam.johnson@example.com", class: "11.b" },
         { firstName: "Nagy", lastName: "Lajos", email: "nagy.lajos@example.com", class: "12.b" },
         { firstName: "Krisztin", lastName: "Sándor", email: "krisztin.sandor@example.com", class: "13.b" },
    ];

    for (const user of users) {
         await dbRun("INSERT INTO users (firstName, lastName, email, class) VALUES (?, ?, ?, ?)", [user.firstName, user.lastName, user.email, user.class]);
    }
};

function dbQuery(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

function dbRun(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) reject(err);
            else resolve(this);
        });
    });
}

export { db, dbQuery, dbRun, initializeDB };
