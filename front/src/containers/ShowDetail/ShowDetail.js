import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux'
import Seat from "../../components/Seat/Seat";


class ShowDetail extends Component {
    componentDidMount() {
        const {loadShow, loadSeats, loadBooking} = this.props;
        const showId = this.props.match.params.id;
        loadShow(showId).then(result => {
            // TODO - change, when action available
            if (result.type === "some_success_status") {
                const hall_id = result.show.hall_id;
                loadSeats(hall_id);
                loadBooking(showId);
            }
        });
    }

    render() {
        const {show, seats, auth, booking, bookedSeats, bookSeat, unBookSeat, performBooking} = this.props;
        const {movie_name, hall_name, starts_at, ends_at} = show;
        const seatProps = {user_id: auth.user_id, booking, bookedSeats, bookSeat, unBookSeat};
        return <div>
            <h2>{movie_name}</h2>
            <p>{hall_name}</p>
            <p>{starts_at} - {ends_at}</p>
            <div>
                {seats.map(seat => <Seat
                    seat={seat}
                    key={seat.id}
                    {...seatProps}
                />)}
            </div>
            <button onClick={performBooking}>Забронировать места</button>
        </div>
    }
}


const mapStateToProps = (state) => {};
const mapDispatchToProps = (dispatch) => {};

export default connect(mapStateToProps, mapDispatchToProps)(ShowDetail);
