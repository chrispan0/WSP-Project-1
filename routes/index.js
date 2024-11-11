// Import required modules
var express = require("express");
var router = express.Router();
var crypto = require("crypto");
var Ticket = require("../model/ticket");
// Route to render the home page
router.get("/", function (req, res, next) {
 // Check if the 'submitted' query parameter is set
  if (req.query.submitted == "true") {
// Render the 'index' view with the 'submitted' parameter set to true
    res.render("index", { title: "CJB Support", submitted: true });
  } else if (req.query.submitted == "false") {
// Render the 'index' view with the 'submitted' parameter set to false
    res.render("index", { title: "CJB Support", submitted: false });
  } else {
 // Render the index page without submission status
    res.render("index", { title: "CJB Support" });
  }
});
// Route to render the ticket editor page
router.get("/editor", async (req, res, next) => {
  try {
// Fetch the ticket by ID from the query parameter
    let ticket = await Ticket.findById(req.query.id);
// If the ticket exists, render the editor page with ticket data
    if (ticket) {
      res.render("editor", { title: "Ticket Editor", ticket: ticket });
    } else {
// Render the editor page without ticket data if not found
      res.render("editor", { title: "Ticket Editor" });
    }
  } catch {
// Redirect to the editor page if an error occurs
    res.redirect("/editor");
  }
});
// Route to render the manage tickets page
router.get("/manage", async (req, res, next) => {
// Fetch all tickets from the database
  const ticket_list = await Ticket.find();
   // Check the 'edited' and 'deleted' query parameters to determine the render state
  if (req.query.edited == "true") {
   // Render the manage page with an edited success indicator
    res.render("manage", {
      title: "Manage Tickets",
      ticket_list: ticket_list,
      edited: true,
    });
  } else if (req.query.edited == "false") {
  // Render the manage page with an edited failure indicator
    res.render("manage", {
      title: "Manage Tickets",
      ticket_list: ticket_list,
      edited: false,
    });
  } else if (req.query.deleted == "true") {
     // Render the manage page with a deleted success indicator
    res.render("manage", {
      title: "Manage Tickets",
      ticket_list: ticket_list,
      deleted: true,
    });
  } else if (req.query.deleted == "false") {
    // Render the manage page with a deleted failure indicator
    res.render("manage", {
      title: "Manage Tickets",
      ticket_list: ticket_list,
      deleted: false,
    });
  } else {
   // Render the manage page without any edit or delete status
    res.render("manage", {
      title: "Manage Tickets",
      ticket_list: ticket_list,
    });
  }
});

module.exports = router;
