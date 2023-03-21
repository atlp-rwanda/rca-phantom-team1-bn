/* eslint-disable prettier/prettier */

import locales from '../../config/languages'
const {Bus} = require('../../db/models');

var BusService = {
    findAll: findAll,
    create: create,
    findById: findById,
    deleteById: deleteById,
    updateBus: updateBus
}

async function findAll() {
    return await Bus.findAll();
}

async function findById(id) {
    return await Bus.findByPk(id);
}

async function deleteById(id) {
    const bus = await Bus.findByPk(id);
    if (!bus) {
      throw new Error(locales('bus_not_found'));
    }
    return await Bus.destroy({ where: { id: id } });
}

async function create(bus) {
    return await Bus.create(bus);
}

async function updateBus(bus, id) {
    const foundBus = await Bus.findByPk(id)
    if (!foundBus) {
        throw new Error(locales('bus_not_found'))
    }
    var updateBus = {
        plate_number: bus.plate_number,
        agency_id: bus.agency_id,
        route_id: bus.route_id
    };

    return await Bus.update(updateBus, { where: { id: id } });
}
module.exports = BusService;