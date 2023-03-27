/* eslint-disable prettier/prettier */
import locales from '../../config/languages'
import { saveBus,findBusByPlateNumber, findAllBuses, findBusById, editBus } from '../services/bus.service';
import { StatusCodes } from "http-status-codes";

export const createBus = async (req, res, next)=> {
    try {
        const bus = await saveBus(req.body)
            
        res.status(StatusCodes.CREATED).json({
            success: true,
            data: bus,
            message: locales('bus_created')
        })
    } catch (err) {
        next(err)
    }
}

export const getBuses = async (req, res, next) => {
    const { plate_number } = req.query;
    try {
        let buses;
    
        if (plate_number) {
        buses = await findBusByPlateNumber(plate_number);
        } else {
        buses = await findAllBuses()
        }
        
        res.status(StatusCodes.OK).json({
            success: true,
            data: buses
        })
        
    } catch (err) {
       next(err)
    }
}

export const getBusById =  async (req, res, next) => {
    try {
        const bus = await findBusById(req.params.id)
        
        if (!bus) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: locales('bus_not_found'),
            });
        }

        res.status(StatusCodes.OK).json({
            success: true,
            data: bus,
        })
    } catch (err) {
       next(err)
    }
}

export const deleteBusById = async (req, res, next) => {
    try {
        const bus = await findBusById(req.params.id)
        if (!bus) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: locales('bus_not_found'),
            });
        }
        /* the function bellow is not defined I just commented it */
        // await removeBusById(req.params.id)
        
        res.send(StatusCodes.OK).json({
            success: true,
            message: locales('bus_deleted')
        })
        
    } catch (err) {
        next(err)
    }
}

export const updateBus = async (req, res, next)=> {
    try {
        const bus =  await editBus(req.body, req.params.id)
        
        res.status(StatusCodes.OK).json({
            success: true,
            message: locales('bus_created'),
            data: bus
        })  
    } catch (err) {
        next(err)
    }
}
