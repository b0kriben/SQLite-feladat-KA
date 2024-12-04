import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./database.sqlite");

const initializeDB = async () => {
    //await dbRun("DROP TABLE users")
    await dbRun("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT)");

    const users = [
        { azon: 1, firstName: "John", lastName: "Doe", email: "john.doe@example.com", class: "9.b" },
        { azon: 2, firstName: "Jane", lastName: "Smith", email: "jane.smith@example.com", class: "10.b" },
        { azon: 3, firstName: "Sam", lastName: "Johnson", email: "sam.johnson@example.com", class: "11.b" },
        { azon: 4, firstName: "Nagy", lastName: "Lajos", email: "nagy.lajos@example.com", class: "12.b" },
        { azon: 5, firstName: "Krisztin", lastName: "Sándor", email: "krisztin.sandor@example.com", class: "13.b" },
    ];

    for (const user of users) {
        await dbRun("INSERT INTO users (azon, firstName, lastName, email, class) VALUES (?, ?, ?, ?, ?)", [user.azon,, user.firstName, user.lastName, user.email, user.class]);
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
