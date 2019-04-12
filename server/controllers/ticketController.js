const mongoose = require('mongoose');
const Ticket = mongoose.model('Ticket');
const User = mongoose.model('User');
const Period = mongoose.model('Period');

exports.createdTicket = async (req, res, next) => {
    const user = req.params;
    const ticketData = req.body;
    let creator;
    const findPeriod = await Period.findOne({ prAccount: ticketData.address })

    const ticket = await new Ticket({
        tkNumber: ticketData.numberLottery,
        tkAccount: ticketData.players,
        tkPeriod: findPeriod._id,
        tkPlayerBuy: user.userId,
    }).save()

    await Ticket
        .findOne({ _id: ticket._id })
        .populate({ 
            path: 'tkPlayerBuy', 
            select: '_id name email'
        })
        .populate({ 
            path: 'tkPeriod', 
            select: '_id prID prAccount prAddressCreator prOpening prCreatedAt prClosingTime'
        })
        .exec()
        .then(result => {
            return User.findById(user.userId);
        })
        .then(user => {
            creator = user;
            user.tickets.push(ticket)
            User.populate(user, {
                path: 'tickets',
                select: '_id tkNumber tkReward tkPrize tkAccount tkCreatedAt tkPeriod'
            })
            return user.save();
        })
        .then(result => {
            res.status(201).json({
                message: 'Ticket created successfully!',
                ticket: ticket,
                creator: { _id: creator._id, name: creator.name, tickets: creator.tickets }
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
    
    // await Ticket
    //     .populate(ticket, { 
    //         path: 'tkPeriod', 
    //         select: '_id prID prAccount prAddressCreator prOpening prCreatedAt prClosingTime'
    //     })
};

exports.getTicketsByUser = async (req, res) => {
    const tickets = await Ticket.find({ tkPlayerBuy: req.profile._id }).sort({
        createAt: "desc"
    });
    res.json(tickets);
};

exports.getPeriodById = async (req, res, next, id) => {
    const pr = await Period.findOne({ prAccount: id });
    req.period = pr;
    next();
};

exports.getTicketsByPeriod = async (req, res) => {
    const tickets = await Ticket.find({ tkPeriod: req.period._id }).sort({
        createAt: "desc"
    });
    res.json({ message: req.period.id, tickets });
    // res.json(tickets);
};