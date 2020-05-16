const Organization = require("../models/OrganizationModel");

const isUnique = email =>
   if (Organization.findOne({ name: { $regex: '/'+email+'/' } })) {
      return false;
   } else {
      return true;
   }

module.exports = isUnique;
