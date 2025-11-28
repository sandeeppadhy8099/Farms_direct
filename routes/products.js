<<<<<<< HEAD
const router = require("express").Router();
const db = require("../db");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

// ADD PRODUCT
router.post("/", auth, role("farmer"), (req, res) => {
  const { name, category, farmer_price, market_price, quantity, image_url } = req.body;

  if (!name || !farmer_price) {
    return res.status(400).json({ msg: "name & farmer_price required" });
  }

  const sql = `
    INSERT INTO products 
    (farmer_id, name, category, farmer_price, market_price, quantity, image_url)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      req.user.id,
      name,
      category || null,
      farmer_price,
      market_price || null,
      quantity || 0,
      image_url || null,
    ],
    (err) => {
      if (err) return res.status(500).json({ msg: "DB error", err });
      res.json({ msg: "Product added" });
    }
  );
});

// GET PRODUCTS (supports farmer filter)
router.get("/", (req, res) => {
  const farmer_id = req.query.farmer_id;

  let query = `
    SELECT id, farmer_id, name, category, farmer_price, market_price, quantity, image_url
    FROM products
  `;

  if (farmer_id) {
    query += ` WHERE farmer_id=${farmer_id}`;
  }

  db.query(query, (err, rows) => {
    if (err) return res.status(500).json({ msg: "DB error", err });
    res.json(rows);
  });
});

// UPDATE PRODUCT
router.put("/:id", auth, role("farmer"), (req, res) => {
  const { name, category, farmer_price, quantity, image_url } = req.body;

  db.query(
    `UPDATE products SET name=?, category=?, farmer_price=?, quantity=?, image_url=? WHERE id=?`,
    [name, category, farmer_price, quantity, image_url, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ msg: "DB error", err });
      res.json({ msg: "Updated!" });
    }
  );
});

// DELETE PRODUCT
router.delete("/:id", auth, role("farmer"), (req, res) => {
  db.query(
    "DELETE FROM products WHERE id=?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json({ msg: "DB error", err });
      res.json({ msg: "Deleted!" });
    }
  );
});

module.exports = router;
=======
const router = require("express").Router();
const db = require("../db");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

// ADD PRODUCT
router.post("/", auth, role("farmer"), (req, res) => {
  const { name, category, farmer_price, market_price, quantity, image_url } = req.body;

  if (!name || !farmer_price) {
    return res.status(400).json({ msg: "name & farmer_price required" });
  }

  const sql = `
    INSERT INTO products 
    (farmer_id, name, category, farmer_price, market_price, quantity, image_url)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      req.user.id,
      name,
      category || null,
      farmer_price,
      market_price || null,
      quantity || 0,
      image_url || null,
    ],
    (err) => {
      if (err) return res.status(500).json({ msg: "DB error", err });
      res.json({ msg: "Product added" });
    }
  );
});

// GET PRODUCTS (supports farmer filter)
router.get("/", (req, res) => {
  const farmer_id = req.query.farmer_id;

  let query = `
    SELECT id, farmer_id, name, category, farmer_price, market_price, quantity, image_url
    FROM products
  `;

  if (farmer_id) {
    query += ` WHERE farmer_id=${farmer_id}`;
  }

  db.query(query, (err, rows) => {
    if (err) return res.status(500).json({ msg: "DB error", err });
    res.json(rows);
  });
});

// UPDATE PRODUCT
router.put("/:id", auth, role("farmer"), (req, res) => {
  const { name, category, farmer_price, quantity, image_url } = req.body;

  db.query(
    `UPDATE products SET name=?, category=?, farmer_price=?, quantity=?, image_url=? WHERE id=?`,
    [name, category, farmer_price, quantity, image_url, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ msg: "DB error", err });
      res.json({ msg: "Updated!" });
    }
  );
});

// DELETE PRODUCT
router.delete("/:id", auth, role("farmer"), (req, res) => {
  db.query(
    "DELETE FROM products WHERE id=?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json({ msg: "DB error", err });
      res.json({ msg: "Deleted!" });
    }
  );
});

module.exports = router;
>>>>>>> 657421e798694f48d230a82f254c87e45b6588ce
