import { useHistory } from "react-router-dom"
import { useModal } from "../../../context/Modal"

export default function BookOwnSpotError() {
    const { closeModal } = useModal()
    const history = useHistory()

    let homeClick = () => {
        history.push("/")
        closeModal()
    }
    return (
        <div className="book-own-spot-error-wrapper">
            <p>Oh no ... you can't book your own spot</p>
            <p>Check out some of our other spots today</p>
            <button onClick={homeClick}>Home</button>
        </div>
    )
}