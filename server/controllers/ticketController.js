const mongoose = require('mongoose');
const Ticket = mongoose.model('Ticket');
const User = mongoose.model('User');

exports.createdTicket = async (req, res, next) => {
    const user = req.params;
    const ticketData = req.body;
    let creator;
    const ticket = await new Ticket({
        tkNumber: ticketData.numberLottery,
        tkAccount: ticketData.players,
        // tkPeriod: 5555,
        tkPlayerBuy: user.userId
    }).save()

    // await Ticket
    //     .populate(ticket, {
    //         path: 'tkPlayerBuy',
    //         select: '_id name account'
    // });
    // res.json(ticket, user.userId);


    await Ticket.populate(ticket, { 
            path: 'tkPlayerBuy', 
            select: '_id name email'
        })
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
};

exports.getTicketsByUser = async (req, res) => {
    const tickets = await Ticket.find({ tkPlayerBuy: req.profile._id }).sort({
        createAt: "desc"
    });
    res.json(tickets);
};