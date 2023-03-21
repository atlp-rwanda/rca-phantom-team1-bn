/* eslint-disable prettier/prettier */
import locales from '../../config/languages'
const busService = require('../services/bus.service');

var BusController = {
    addBus: addBus,
    findBuses: findBuses,
    findBusById: findBusById,
    updateBus: updateBus,
    deleteBusById: deleteBusById
}

async function addBus(req, res) {
    try {
        const bus = await busService.create(req.body).
            
        res.status(201).json({
            status: 'success',
            data: bus,
            message: locales('bus_created')
        })
    } catch (err) {
        if (err.code === '23505') {
            return res.status(409).json({
                status: err.status,
                message: locales('bus_already_exist'),
            });
        }
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    }
}

async function findBusById(req, res) {
    try {
        const bus = await busService.findById(req.params.id)
        
        res.send(200).json({
            status: 'success',
            data: bus
        })
        
    } catch (err) {
        return res.status(404).json({
            status: err.status,
            message: locales('bus_not_found'),
        });
    }
}

async function deleteBusById(req, res) {
    try {
        await busService.deleteById(req.params.id)
        
        res.send(200).json({
            status: 'success',
            data: null,
            message: locales('bus_deleted')
        })
        
    } catch (err) {
        if (err.statusCode==404) {
            return res.status(404).json({
                status: err.status,
                message: locales('bus_not_found'),
            });
        }
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    }
}

async function updateBus(req, res) {
    try {
        const bus =  await busService.updateBus(req.body, req.params.id)
        
        res.status(200).json({
        status: 'success',
        message: locales('bus_created'),
        data: bus
    })  
    } catch (err) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    }
}

async function findBuses(req, res) {
    try {
        const buses = await busService.findAll()
        
        res.send(200).json({
            status: 'success',
            data: buses
        })
        
    } catch (err) {
        return res.status(500).json({
            status: err.status,
            message: err.message
        });
    }
}

module.exports = BusController;