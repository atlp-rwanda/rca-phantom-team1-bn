/* eslint-disable prettier/prettier */
const { Bus, Driver } = require("../../db/models");

import { sendEmail } from "../utils/sendEmail";

exports.assignDriverToBus = async (req, res, next) => {
  try {
    const { busId, driverId } = req.body;
    const bus = await Bus.findByPk(busId);
    const driver = await Driver.findByPk(driverId);
    if (!bus || !driver) {
      return res.status(404).json({ message: "Bus or driver not found" });
    }

    await bus.setDriver(driver);

    // Send email to notify the driver that they have been assigned to the bus
    const recipientEmail = driver.email;
    const subject = "You have been assigned to a bus";
    const text = `You have been assigned to drive bus ${bus.id}. Please report to the bus station at 8:00am tomorrow. Thank you!`;
    await sendEmail(recipientEmail, subject, text);

    return res.status(200).json({ message: "Driver assigned successfully" });
  } catch (err) {
    next(err);
  }
};


exports.getDriverToBusAssignments = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const assignments = await Driver.findAndCountAll({
      include: [
        {
          model: Bus,
          as: "Bus",
        },
      ],
      limit,
      offset: (page - 1) * limit,
    });
    return res.status(200).json(assignments);
  } catch (err) {
    next(err);
  }
};
