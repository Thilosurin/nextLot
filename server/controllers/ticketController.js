const mongoose = require('mongoose');
const Ticket = mongoose.model('Ticket');

exports.validateTicket = (req, res, next) => {
    req.sanitizeBody('ticket');

    req.checkBody('ticket', 'Ticket a name').notEmpty();
    req.checkBody('ticket', 'Ticket must be 6 digis').isLength(6);

    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).send(firstError);
    }
    next();
};

exports.createTicket = async (req, res, next) => {
    const ticketData = req.body;
    let creator;
    const ticket = await new Ticket({
        tkNumber: ticketData,
        tkPrize: ticketData,
        tkPeriod: 5555,
        tkPlayerBuy: req.userId
    });
    await ticket
        .save()
        .then(result => {
            return User.findById(req.userId);
        })
        .then(user => {
            creator = user;
            user.tickets.push(ticket);
            return user.save();
        })
        .then(result => {
            res.status(201).json({
                message: 'Ticket created successfully!',
                ticket: ticket,
                creator: { _id: creator._id, name: creator.name }
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};