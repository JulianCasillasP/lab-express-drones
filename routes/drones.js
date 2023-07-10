const express = require("express");
const router = express.Router();
const Drone = require('../models/Drone.model');

// require the Drone model here

router.get('/drones', (req, res, next) => {
  Drone.find()
    .then(drones => {
      res.render('drones/list', { drones });
    })
    .catch(error => {
      console.error('Error fetching drones:', error);
      next(error);
    });
});

router.get("/drones/create", (req, res, next) => {
  res.render('drones/create-form');
});

router.post('/drones/create', (req, res, next) => {
  const { name, propellers, maxSpeed } = req.body;

  Drone.create({ name, propellers, maxSpeed })
    .then(createdDrone => {
      res.redirect('/drones');
    })
    .catch(error => {
      console.log(error);
      res.render('drones/create-form');
    });
});

router.get('/drones/:id/edit', (req, res, next) => {
  const { id } = req.params;

  Drone.findById(id)
    .then(drone => {
      res.render('drones/update-form', { drone });
    })
    .catch(error => {
      console.log(error);
      res.render('error');
    });
});

router.post('/drones/:id/edit', (req, res, next) => {
  const { id } = req.params;
  const { name, propellers, maxSpeed } = req.body;

  Drone.findByIdAndUpdate(id, { name, propellers, maxSpeed })
    .then(updatedDrone => {
      res.redirect('/drones');
    })
    .catch(error => {
      console.log(error);
      res.render('drones/update-form', { drone: { _id: id, name, propellers, maxSpeed } });
    });
});

router.post("/drones/:id/delete", (req, res, next) => {
  const { id } = req.params;

  Drone.findByIdAndDelete(id)
    .then(() => {
      res.redirect('/drones');
    })
    .catch(error => {
      console.log(error);
      res.render('error');
    });
});

module.exports = router;
