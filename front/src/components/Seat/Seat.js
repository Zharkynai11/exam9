import React from "react";


const Seat = ({seat, booking, user_id, bookedSeats, bookSeat, unBookSeat}) => {
    let className = 'free';
    let onClick = bookSeat;
    booking.forEach(bookingItem => {
        bookingItem.seats.forEach(seatId => {
            if (seat.id === seatId) {
                className = 'booked';
                onClick = null;
                if (bookingItem.user === user_id) {
                    className = 'ownBooked';
                }
            }
        });
    });
    if (seat.id in bookedSeats) {
        className = 'newBooked';
        onClick = unBookSeat;
    }
    return <button className={'seat ' + className} onClick={onClick}/>
};


export default Seat;
